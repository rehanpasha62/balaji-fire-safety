import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  FaFire, 
  FaSearch, 
  FaFilter, 
  FaBell, 
  FaWater, 
  FaSnowflake, 
  FaShieldAlt, 
  FaTools,
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaInfoCircle,
  FaTimes,
  FaSlidersH
} from 'react-icons/fa';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

/**
 * Products Page Component
 * Displays all fire safety products with search and filter functionality
 * Features:
 * - Real-time search across product names and descriptions
 * - Category-based filtering
 * - Advanced filters for fire extinguishers
 * - Product detail modal
 * - Responsive grid layout
 * - Professional fire-safety themed design
 */
const Products = () => {
  // State Management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fire Extinguisher Specific Filters
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFireClass, setSelectedFireClass] = useState('All');
  const [selectedCapacity, setSelectedCapacity] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);

  // Category Configuration with icons and colors
  const categories = [
    { name: 'All', icon: <FaFire />, color: 'from-red-500 to-red-600' },
    { name: 'Fire Extinguishers', icon: <FaFire />, color: 'from-red-500 to-red-700' },
    { name: 'Fire Alarm Systems', icon: <FaBell />, color: 'from-orange-500 to-orange-600' },
    { name: 'Fire Hydrant Systems', icon: <FaWater />, color: 'from-blue-500 to-blue-600' },
    { name: 'Fire Sprinkler Systems', icon: <FaWater />, color: 'from-cyan-500 to-cyan-600' },
    { name: 'Fire Suppression Systems', icon: <FaSnowflake />, color: 'from-purple-500 to-purple-600' },
    { name: 'Fire Safety Accessories', icon: <FaShieldAlt />, color: 'from-green-500 to-green-600' },
  ];

  // Fire Extinguisher Filter Options
  const fireExtinguisherTypes = ['All', 'ABC Dry Powder', 'CO2', 'Water', 'Foam (AFFF)', 'Clean Agent', 'Wet Chemical', 'Class K', 'Class D (Metal Fire)'];
  const fireClasses = ['All', 'A', 'B', 'C', 'D', 'K'];
  const capacities = ['All', '1kg', '2kg', '4kg', '4.5kg', '6kg', '6.5kg', '9kg', '6L', '9L'];

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    // Check for category filter in URL
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Apply filters whenever products, search, or category changes
  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, selectedType, selectedFireClass, selectedCapacity, priceRange]);

  /**
   * Fetch products from API
   */
  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  /**
   * Filter products based on search term, selected category, and advanced filters
   */
  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Fire Extinguisher specific filters
    if (selectedCategory === 'Fire Extinguishers' || selectedCategory === 'All') {
      // Filter by type
      if (selectedType !== 'All') {
        filtered = filtered.filter((p) => p.type === selectedType);
      }

      // Filter by fire class
      if (selectedFireClass !== 'All') {
        filtered = filtered.filter((p) => p.fireClass && p.fireClass.includes(selectedFireClass));
      }

      // Filter by capacity
      if (selectedCapacity !== 'All') {
        filtered = filtered.filter((p) => p.capacity === selectedCapacity);
      }

      // Filter by price range
      filtered = filtered.filter((p) => {
        if (typeof p.price === 'number') {
          return p.price >= priceRange.min && p.price <= priceRange.max;
        }
        return true;
      });
    }

    // Filter by search term (searches in name, description, and specifications)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.specifications?.toLowerCase().includes(searchLower) ||
          p.type?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProducts(filtered);
  };

  /**
   * Get category icon by name
   */
  const getCategoryIcon = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : <FaFire />;
  };

  /**
   * Get category color class by name
   */
  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : 'from-red-500 to-red-600';
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedFireClass('All');
    setSelectedCapacity('All');
    setPriceRange({ min: 0, max: 10000 });
  };

  const isFireExtinguisherCategory = selectedCategory === 'Fire Extinguishers' || selectedCategory === 'All';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl"><FaFire /></div>
          <div className="absolute bottom-10 right-10 text-9xl"><FaShieldAlt /></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[200px]"><FaFire /></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Our Products
            </h1>
            <p className="text-xl md:text-2xl mb-3 text-gray-100">
              Comprehensive range of fire safety equipment
            </p>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
              Certified products meeting international safety standards for homes, industries, and institutions
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 pr-14 rounded-full border-2 border-gray-300 focus:border-red-500 focus:outline-none text-lg shadow-lg transition-all"
                aria-label="Search products"
              />
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Clear search"
                >
                  <FaTimes className="text-xl" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 text-gray-700 font-semibold text-lg mb-4">
              <FaFilter className="text-red-600" />
              <span>Filter by Category</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto mb-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-5 py-3 rounded-full transition-all duration-200 flex items-center gap-2 font-semibold text-sm md:text-base ${
                  selectedCategory === category.name
                    ? 'bg-red-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-red-500 hover:text-red-600'
                }`}
                aria-label={`Filter by ${category.name}`}
                aria-pressed={selectedCategory === category.name}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name === 'All' ? 'All' : category.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Fire Extinguisher Advanced Filters */}
          {isFireExtinguisherCategory && (
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="mx-auto flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold text-gray-700 transition-all mb-4"
              >
                <FaSlidersH /> Advanced Filters {showFilters ? '▲' : '▼'}
              </button>

              {showFilters && (
                <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Type Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                      >
                        {fireExtinguisherTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Fire Class Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Fire Class</label>
                      <select
                        value={selectedFireClass}
                        onChange={(e) => setSelectedFireClass(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                      >
                        {fireClasses.map(fc => (
                          <option key={fc} value={fc}>{fc === 'All' ? 'All Classes' : `Class ${fc}`}</option>
                        ))}
                      </select>
                    </div>

                    {/* Capacity Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
                      <select
                        value={selectedCapacity}
                        onChange={(e) => setSelectedCapacity(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                      >
                        {capacities.map(cap => (
                          <option key={cap} value={cap}>{cap}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price Range: ₹{priceRange.min} - ₹{priceRange.max}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="500"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            // Loading State
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-red-600 border-t-transparent mb-4"></div>
              <p className="text-gray-600 text-xl font-semibold">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              {/* Results Count */}
              <div className="text-center mb-10">
                <p className="text-gray-700 text-lg font-semibold">
                  Showing <span className="text-red-600 font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
                  {selectedCategory !== 'All' && <span> in <span className="text-red-600 font-bold">{selectedCategory}</span></span>}
                  {searchTerm && <span> matching "<span className="text-red-600 font-bold">{searchTerm}</span>"</span>}
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onViewDetails={setSelectedProduct}
                    icon={getCategoryIcon(product.category)}
                    colorClass={getCategoryColor(product.category)}
                  />
                ))}
              </div>
            </>
          ) : (
            // No Results State
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
              <FaSearch className="text-8xl text-gray-300 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-3 text-gray-800">No products found</h3>
              <p className="text-gray-600 text-lg mb-6">
                {searchTerm ? (
                  <>No products match your search "<span className="font-semibold text-red-600">{searchTerm}</span>"</>
                ) : (
                  <>No products available with the selected filters</>
                )}
              </p>
              <button
                onClick={clearFilters}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fadeIn" 
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${getCategoryColor(selectedProduct.category)} text-white p-8 relative`}>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
              <div className="flex items-center gap-6">
                <div className="text-7xl drop-shadow-lg">
                  {getCategoryIcon(selectedProduct.category)}
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-2 uppercase tracking-wide">{selectedProduct.category}</p>
                  <h2 id="modal-title" className="text-3xl md:text-4xl font-bold">{selectedProduct.name}</h2>
                </div>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8">
              {/* Status Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedProduct.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <FaCheckCircle /> Featured Product
                  </span>
                )}
                <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                  selectedProduct.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedProduct.inStock ? <FaCheckCircle /> : <FaTimesCircle />}
                  {selectedProduct.inStock ? 'In Stock - Available Now' : 'Currently Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <FaInfoCircle className="text-red-600" /> Product Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedProduct.description}</p>
              </div>
              
              {/* Specifications */}
              {selectedProduct.specifications && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <FaTools className="text-red-600" /> Technical Specifications
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{selectedProduct.specifications}</p>
                  </div>
                </div>
              )}
              
              {/* Price and Availability */}
              <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Pricing Information</p>
                    <p className="text-3xl font-bold text-red-600">{selectedProduct.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Availability Status</p>
                    <p className={`text-xl font-bold flex items-center gap-2 ${selectedProduct.inStock ? 'text-green-600' : 'text-gray-600'}`}>
                      {selectedProduct.inStock ? <FaCheckCircle /> : <FaTimesCircle />}
                      {selectedProduct.inStock ? 'Ready to Ship' : 'Contact for Availability'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+91 7483017477"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl transition-all text-center font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <FaPhone /> Call +91 7483017477
                </a>
                <a
                  href="/contact"
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-xl transition-all text-center font-bold text-lg shadow-lg hover:shadow-xl"
                >
                  Send Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <FaTools className="text-6xl mx-auto mb-6 drop-shadow-lg" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Choosing the Right Product?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Our fire safety experts are here to guide you in selecting the perfect equipment for your needs
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:" 
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                <FaPhone /> Call 
              </a>
              <a 
                href="/contact" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <FaInfoCircle /> Request Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
