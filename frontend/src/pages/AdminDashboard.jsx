import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBox, FaEnvelope, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaEye, FaCog } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ products: 0, services: 0, contacts: 0, newContacts: 0 });
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Fire Extinguishers',
    description: '',
    specifications: '',
    price: 0,
    inStock: true,
    featured: false,
    // Fire Extinguisher specific fields
    type: 'ABC Dry Powder',
    capacity: '2kg',
    fireClass: [],
    rating: 4,
    suitableFor: [],
    dischargeTime: '',
    refillable: true,
    certifications: [],
    detailedFeatures: [],
    maintenanceInfo: '',
    operatingPressure: '',
    testPressure: '',
    throwingDistance: '',
    warranty: '',
    image: '/images/default-product.jpg'
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    slug: '',
    icon: 'shield',
    shortDescription: '',
    fullDescription: '',
    features: [''],
    processSteps: [{ step: 1, title: '', description: '' }],
    benefits: [''],
    industries: [''],
    featured: false,
    active: true,
  });

  useEffect(() => {
    if (!admin) {
      navigate('/admin');
    } else {
      fetchData();
    }
  }, [admin, navigate]);

  const fetchData = async () => {
    try {
      const [productsRes, servicesRes, contactsRes] = await Promise.all([
        api.get('/products'),
        api.get('/services'),
        api.get('/contact'),
      ]);
      setProducts(productsRes.data);
      setServices(servicesRes.data);
      setContacts(contactsRes.data);
      setStats({
        products: productsRes.data.length,
        services: servicesRes.data.length,
        contacts: contactsRes.data.length,
        newContacts: contactsRes.data.filter((c) => c.status === 'new').length,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, productForm);
      } else {
        await api.post('/products', productForm);
      }
      fetchData();
      setShowProductModal(false);
      resetProductForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      description: product.description,
      specifications: product.specifications || '',
      price: product.price,
      inStock: product.inStock,
      featured: product.featured,
      type: product.type || 'ABC Dry Powder',
      capacity: product.capacity || '2kg',
      fireClass: product.fireClass || [],
      rating: product.rating || 4,
      suitableFor: product.suitableFor || [],
      dischargeTime: product.dischargeTime || '',
      refillable: product.refillable || true,
      certifications: product.certifications || [],
      detailedFeatures: product.detailedFeatures || [],
      maintenanceInfo: product.maintenanceInfo || '',
      operatingPressure: product.operatingPressure || '',
      testPressure: product.testPressure || '',
      throwingDistance: product.throwingDistance || '',
      warranty: product.warranty || '',
      image: product.image || '/images/default-product.jpg'
    });
    setShowProductModal(true);
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Fire Extinguishers',
      description: '',
      specifications: '',
      price: 0,
      inStock: true,
      featured: false,
      type: 'ABC Dry Powder',
      capacity: '2kg',
      fireClass: [],
      rating: 4,
      suitableFor: [],
      dischargeTime: '',
      refillable: true,
      certifications: [],
      detailedFeatures: [],
      maintenanceInfo: '',
      operatingPressure: '',
      testPressure: '',
      throwingDistance: '',
      warranty: '',
      image: '/images/default-product.jpg'
    });
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await api.delete(`/contact/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      fetchData();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  // Service Management Functions
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter out empty items from arrays
      const cleanedForm = {
        ...serviceForm,
        features: serviceForm.features.filter(f => f.trim() !== ''),
        benefits: serviceForm.benefits.filter(b => b.trim() !== ''),
        industries: serviceForm.industries.filter(i => i.trim() !== ''),
        processSteps: serviceForm.processSteps.filter(s => s.title.trim() !== '' && s.description.trim() !== ''),
      };

      if (editingService) {
        await api.put(`/services/${editingService._id}`, cleanedForm);
      } else {
        await api.post('/services', cleanedForm);
      }
      fetchData();
      setShowServiceModal(false);
      resetServiceForm();
    } catch (error) {
      console.error('Error saving service:', error);
      alert(error.response?.data?.message || 'Failed to save service');
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/services/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      slug: service.slug,
      icon: service.icon,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      features: service.features.length > 0 ? service.features : [''],
      processSteps: service.processSteps.length > 0 ? service.processSteps : [{ step: 1, title: '', description: '' }],
      benefits: service.benefits.length > 0 ? service.benefits : [''],
      industries: service.industries.length > 0 ? service.industries : [''],
      featured: service.featured,
      active: service.active,
    });
    setShowServiceModal(true);
  };

  const resetServiceForm = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      slug: '',
      icon: 'shield',
      shortDescription: '',
      fullDescription: '',
      features: [''],
      processSteps: [{ step: 1, title: '', description: '' }],
      benefits: [''],
      industries: [''],
      featured: false,
      active: true,
    });
  };

  const addArrayField = (field) => {
    if (field === 'processSteps') {
      setServiceForm({
        ...serviceForm,
        processSteps: [...serviceForm.processSteps, { step: serviceForm.processSteps.length + 1, title: '', description: '' }],
      });
    } else {
      setServiceForm({ ...serviceForm, [field]: [...serviceForm[field], ''] });
    }
  };

  const removeArrayField = (field, index) => {
    if (field === 'processSteps') {
      const newSteps = serviceForm.processSteps.filter((_, i) => i !== index);
      // Renumber steps
      newSteps.forEach((step, i) => step.step = i + 1);
      setServiceForm({ ...serviceForm, processSteps: newSteps });
    } else {
      setServiceForm({
        ...serviceForm,
        [field]: serviceForm[field].filter((_, i) => i !== index),
      });
    }
  };

  const updateArrayField = (field, index, value) => {
    const newArray = [...serviceForm[field]];
    newArray[index] = value;
    setServiceForm({ ...serviceForm, [field]: newArray });
  };

  const updateProcessStep = (index, key, value) => {
    const newSteps = [...serviceForm.processSteps];
    newSteps[index] = { ...newSteps[index], [key]: value };
    setServiceForm({ ...serviceForm, processSteps: newSteps });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-secondary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">BALAJI FIRE SAFETY - Admin Panel</h1>
            <p className="text-sm text-gray-300">Welcome, {admin?.username}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-primary">{stats.products}</p>
              </div>
              <FaBox className="text-5xl text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Services</p>
                <p className="text-3xl font-bold text-purple-600">{stats.services}</p>
              </div>
              <FaCog className="text-5xl text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Contacts</p>
                <p className="text-3xl font-bold text-green-600">{stats.contacts}</p>
              </div>
              <FaEnvelope className="text-5xl text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">New Messages</p>
                <p className="text-3xl font-bold text-orange-600">{stats.newContacts}</p>
              </div>
              <FaEnvelope className="text-5xl text-orange-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab === 'products' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            >
              Products Management
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab === 'services' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            >
              Services Management
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab === 'contacts' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            >
              Contact Submissions
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Products</h2>
                <button
                  onClick={() => {
                    resetProductForm();
                    setShowProductModal(true);
                  }}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaPlus /> Add New Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{product.name}</td>
                        <td className="px-4 py-3">{product.category}</td>
                        <td className="px-4 py-3">{product.price}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                          {product.featured && (
                            <span className="ml-2 px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Featured</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:text-blue-800">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 hover:text-red-800">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Services</h2>
                <button
                  onClick={() => {
                    resetServiceForm();
                    setShowServiceModal(true);
                  }}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaPlus /> Add New Service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service._id} className="border rounded-lg p-6 hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-secondary">{service.title}</h3>
                        <p className="text-sm text-gray-500">Slug: {service.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditService(service)} className="text-blue-600 hover:text-blue-800 text-xl">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteService(service._id)} className="text-red-600 hover:text-red-800 text-xl">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{service.shortDescription}</p>
                    <div className="flex gap-2 flex-wrap">
                      {service.featured && (
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Featured</span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {service.active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {service.features?.length || 0} Features
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact._id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.email} | {contact.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={contact.status}
                          onChange={(e) => handleUpdateContactStatus(contact._id, e.target.value)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="responded">Responded</option>
                        </select>
                        <button onClick={() => handleDeleteContact(contact._id)} className="text-red-600 hover:text-red-800">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{contact.message}</p>
                    <p className="text-xs text-gray-500">
                      Received: {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleProductSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option>Fire Extinguishers</option>
                    <option>Fire Alarm Systems</option>
                    <option>Fire Hydrant Systems</option>
                    <option>Fire Sprinkler Systems</option>
                    <option>Fire Suppression Systems</option>
                    <option>Fire Safety Accessories</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Description *</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Specifications</label>
                  <textarea
                    value={productForm.specifications}
                    onChange={(e) => setProductForm({ ...productForm, specifications: e.target.value })}
                    rows="2"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Price</label>
                  <input
                    type="text"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="mb-4 flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="mr-2"
                    />
                    In Stock
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={productForm.featured}
                      onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    Featured
                  </label>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductModal(false);
                      resetProductForm();
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8">
            <div className="p-6 max-h-[85vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              <form onSubmit={handleServiceSubmit}>
                {/* Basic Info */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Service Title *</label>
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setServiceForm({ ...serviceForm, title, slug });
                    }}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Slug *</label>
                  <input
                    type="text"
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Icon *</label>
                  <select
                    value={serviceForm.icon}
                    onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="wrench">Wrench</option>
                    <option value="settings">Settings</option>
                    <option value="search">Search</option>
                    <option value="users">Users</option>
                    <option value="shield">Shield</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Short Description * (Max 200 chars)</label>
                  <textarea
                    value={serviceForm.shortDescription}
                    onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                    required
                    maxLength={200}
                    rows="2"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  />
                  <p className="text-sm text-gray-500 mt-1">{serviceForm.shortDescription.length}/200</p>
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">Full Description *</label>
                  <textarea
                    value={serviceForm.fullDescription}
                    onChange={(e) => setServiceForm({ ...serviceForm, fullDescription: e.target.value })}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Features */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Features</label>
                  {serviceForm.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateArrayField('features', index, e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Feature description"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField('features', index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('features')}
                    className="btn-secondary text-sm"
                  >
                    <FaPlus className="inline mr-1" /> Add Feature
                  </button>
                </div>

                {/* Process Steps */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Process Steps</label>
                  {serviceForm.processSteps.map((step, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Step {step.step}</h4>
                        <button
                          type="button"
                          onClick={() => removeArrayField('processSteps', index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => updateProcessStep(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:border-primary"
                        placeholder="Step title"
                      />
                      <textarea
                        value={step.description}
                        onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Step description"
                        rows="2"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('processSteps')}
                    className="btn-secondary text-sm"
                  >
                    <FaPlus className="inline mr-1" /> Add Process Step
                  </button>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Benefits</label>
                  {serviceForm.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => updateArrayField('benefits', index, e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Benefit description"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField('benefits', index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('benefits')}
                    className="btn-secondary text-sm"
                  >
                    <FaPlus className="inline mr-1" /> Add Benefit
                  </button>
                </div>

                {/* Industries */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Industries Served</label>
                  {serviceForm.industries.map((industry, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => updateArrayField('industries', index, e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Industry name"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField('industries', index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('industries')}
                    className="btn-secondary text-sm"
                  >
                    <FaPlus className="inline mr-1" /> Add Industry
                  </button>
                </div>

                {/* Checkboxes */}
                <div className="mb-4 flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={serviceForm.featured}
                      onChange={(e) => setServiceForm({ ...serviceForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    Featured
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={serviceForm.active}
                      onChange={(e) => setServiceForm({ ...serviceForm, active: e.target.checked })}
                      className="mr-2"
                    />
                    Active
                  </label>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingService ? 'Update Service' : 'Add Service'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowServiceModal(false);
                      resetServiceForm();
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
