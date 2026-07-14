import Service from '../models/Service.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ active: true }).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error('❌ Get Services Error:', error);
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
// @access  Public
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, active: true });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    console.error('❌ Get Service Error:', error);
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin)
export const createService = async (req, res) => {
  try {
    const {
      title,
      slug,
      icon,
      shortDescription,
      fullDescription,
      features,
      processSteps,
      benefits,
      industries,
      featured
    } = req.body;

    // Validate required fields
    if (!title || !shortDescription || !fullDescription) {
      return res.status(400).json({ 
        message: 'Please provide title, short description, and full description' 
      });
    }

    // Check if service already exists
    const serviceExists = await Service.findOne({ 
      $or: [{ title }, { slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-') }] 
    });

    if (serviceExists) {
      return res.status(400).json({ message: 'Service with this title already exists' });
    }

    const service = await Service.create({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      icon: icon || 'shield',
      shortDescription,
      fullDescription,
      features: features || [],
      processSteps: processSteps || [],
      benefits: benefits || [],
      industries: industries || [],
      featured: featured || false
    });

    res.status(201).json(service);
    console.log('✅ Service created:', service.title);
  } catch (error) {
    console.error('❌ Create Service Error:', error);
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin)
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const {
      title,
      slug,
      icon,
      shortDescription,
      fullDescription,
      features,
      processSteps,
      benefits,
      industries,
      featured,
      active
    } = req.body;

    service.title = title || service.title;
    service.slug = slug || service.slug;
    service.icon = icon || service.icon;
    service.shortDescription = shortDescription || service.shortDescription;
    service.fullDescription = fullDescription || service.fullDescription;
    service.features = features !== undefined ? features : service.features;
    service.processSteps = processSteps !== undefined ? processSteps : service.processSteps;
    service.benefits = benefits !== undefined ? benefits : service.benefits;
    service.industries = industries !== undefined ? industries : service.industries;
    service.featured = featured !== undefined ? featured : service.featured;
    service.active = active !== undefined ? active : service.active;

    const updatedService = await service.save();
    res.json(updatedService);
    console.log('✅ Service updated:', updatedService.title);
  } catch (error) {
    console.error('❌ Update Service Error:', error);
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await Service.deleteOne({ _id: req.params.id });
    res.json({ message: 'Service deleted successfully' });
    console.log('✅ Service deleted:', service.title);
  } catch (error) {
    console.error('❌ Delete Service Error:', error);
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};
