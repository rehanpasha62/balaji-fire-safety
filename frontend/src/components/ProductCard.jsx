import { Link } from 'react-router-dom';
import { FaStar, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaPhone, FaFire } from 'react-icons/fa';

/**
 * ProductCard Component
 * Reusable card component for displaying product information
 * 
 * @param {Object} product - Product object containing all product details
 * @param {Function} onViewDetails - Callback function when "View Details" is clicked
 * @param {JSX.Element} icon - Category icon to display
 * @param {string} colorClass - Background color class for the card header
 */
const ProductCard = ({ product, onViewDetails, icon, colorClass }) => {
  const isFireExtinguisher = product.category === 'Fire Extinguishers';

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
            size={14}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-red-500 group transform hover:-translate-y-2">
      {/* Product Icon/Image Area */}
      <div className={`h-56 ${colorClass} bg-gradient-to-br flex items-center justify-center relative overflow-hidden`}>
        {/* Background Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-9xl opacity-10">
          {icon}
        </div>
        
        {/* Main Icon */}
        <div className="relative z-10 text-white text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
          {icon}
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
              <FaStar className="text-sm" /> Featured
            </span>
          )}
          {product.inStock ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <FaCheckCircle className="text-sm" /> In Stock
            </span>
          ) : (
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <FaTimesCircle className="text-sm" /> Out of Stock
            </span>
          )}
        </div>
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
          {product.category}
        </span>
      </div>
      
      {/* Product Details */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors duration-200 min-h-[56px] line-clamp-2">
          {product.name}
        </h3>

        {/* Fire Extinguisher Specific Info */}
        {isFireExtinguisher && (
          <>
            {product.rating && (
              <div className="mb-2">
                {renderStars(product.rating)}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-3">
              {product.type && (
                <span className="px-2 py-1 bg-primary text-white rounded text-xs font-semibold">
                  {product.type}
                </span>
              )}
              {product.capacity && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                  {product.capacity}
                </span>
              )}
              {product.fireClass && product.fireClass.slice(0, 3).map((fc, idx) => (
                <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold flex items-center gap-1">
                  <FaFire className="text-xs" /> Class {fc}
                </span>
              ))}
            </div>
          </>
        )}
        
        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed min-h-[60px]">
          {product.description}
        </p>
        
        {/* Key Specifications - For Non-Fire Extinguishers */}
        {!isFireExtinguisher && product.specifications && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <p className="text-xs text-gray-700 font-bold mb-2 flex items-center gap-1">
              <FaInfoCircle className="text-red-500" /> Key Specifications:
            </p>
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {product.specifications}
            </p>
          </div>
        )}

        {/* Certifications for Fire Extinguishers */}
        {isFireExtinguisher && product.certifications && product.certifications.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-600 mb-1">Certifications:</p>
            <div className="flex flex-wrap gap-1">
              {product.certifications.slice(0, 3).map((cert, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-200">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price and Action Buttons */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Price</p>
              <span className="font-bold text-red-600 text-lg">
                {typeof product.price === 'number' ? `₹${product.price.toLocaleString('en-IN')}` : product.price}
              </span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              product.inStock 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {product.inStock ? 'Available' : 'Contact Us'}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold hover:shadow-md"
              aria-label={`View details for ${product.name}`}
            >
              <FaInfoCircle /> Details
            </button>
            <a
              href="tel:+9779802940260"
              className="btn-primary inline-flex items-center gap-2 hover:bg-primary-dark"
            >
              <FaPhone /> Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
