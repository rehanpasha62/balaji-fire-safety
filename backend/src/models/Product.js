import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Fire Extinguishers',
      'Fire Alarm Systems',
      'Fire Hydrant Systems',
      'Fire Sprinkler Systems',
      'Fire Suppression Systems',
      'Fire Safety Accessories'
    ]
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  specifications: {
    type: String,
    required: false
  },
  image: {
    type: String,
    default: '/images/default-product.jpg'
  },
  price: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  // Fire Extinguisher Specific Fields
  type: {
    type: String,
    enum: ['ABC Dry Powder', 'CO2', 'Water', 'Foam (AFFF)', 'Clean Agent', 'Wet Chemical', 'Class K', 'Class D (Metal Fire)', 'Other'],
    required: function() {
      return this.category === 'Fire Extinguishers';
    }
  },
  capacity: {
    type: String, // e.g., "2kg", "4kg", "6kg", "9L"
    required: function() {
      return this.category === 'Fire Extinguishers';
    }
  },
  fireClass: {
    type: [String],
    enum: ['A', 'B', 'C', 'D', 'K'],
    default: []
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4
  },
  suitableFor: {
    type: [String],
    enum: ['Home', 'Office', 'Industry', 'Kitchen', 'Vehicle', 'Laboratory', 'Warehouse'],
    default: []
  },
  dischargeTime: {
    type: String, // e.g., "10-15 seconds"
  },
  refillable: {
    type: Boolean,
    default: true
  },
  certifications: {
    type: [String],
    enum: ['ISI', 'CE', 'EN3', 'UL', 'ISO', 'BIS'],
    default: []
  },
  detailedFeatures: [{
    type: String
  }],
  maintenanceInfo: {
    type: String
  },
  operatingPressure: {
    type: String
  },
  testPressure: {
    type: String
  },
  throwingDistance: {
    type: String
  },
  manufacturingYear: {
    type: Number
  },
  warranty: {
    type: String
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
