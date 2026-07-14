import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: [true, 'Service slug is required'],
    unique: true,
    lowercase: true
  },
  icon: {
    type: String,
    required: [true, 'Icon name is required'],
    default: 'shield'
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  fullDescription: {
    type: String,
    required: [true, 'Full description is required']
  },
  features: [{
    type: String,
    required: true
  }],
  processSteps: [{
    step: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  benefits: [{
    type: String,
    required: true
  }],
  industries: [{
    type: String,
    required: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create slug from title before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
