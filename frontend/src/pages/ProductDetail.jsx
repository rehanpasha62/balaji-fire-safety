import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaStar, FaPhone, FaEnvelope, FaShieldAlt, FaCertificate, FaFire } from 'react-icons/fa';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      setError('');
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
          />
        ))}
        <span className="ml-2 text-gray-600">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isFireExtinguisher = product.category === 'Fire Extinguishers';

  return (
    <div>
      {/* Breadcrumb */}
      <section className="bg-gray-100 py-4">
        <div className="container-custom">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <FaArrowLeft /> Back to Products
          </button>
        </div>
      </section>

      {/* Product Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full h-auto max-h-96 object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Fire+Extinguisher';
                }}
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                {product.name}
              </h1>

              {isFireExtinguisher && (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    {renderStars(product.rating)}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-primary text-white rounded-full text-sm">
                      {product.type}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {product.capacity}
                    </span>
                    {product.fireClass && product.fireClass.map((fc, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-1">
                        <FaFire className="text-xs" /> Class {fc}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.inStock ? (
                  <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    In Stock
                  </span>
                ) : (
                  <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              {isFireExtinguisher && product.suitableFor && product.suitableFor.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Suitable For:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.suitableFor.map((place, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg">
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {isFireExtinguisher && product.certifications && product.certifications.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <FaCertificate className="text-primary" /> Certifications:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-semibold border border-blue-200">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <Link to="/contact" className="btn-primary flex-1 text-center">
                  <FaEnvelope className="inline mr-2" /> Request Quote
                </Link>
                <a href="tel:+919876543210" className="btn-secondary flex-1 text-center">
                  <FaPhone className="inline mr-2" /> Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          {isFireExtinguisher && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold bg-gray-50 w-1/3">Type</td>
                      <td className="px-6 py-4">{product.type}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold bg-gray-50">Capacity</td>
                      <td className="px-6 py-4">{product.capacity}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold bg-gray-50">Fire Class</td>
                      <td className="px-6 py-4">
                        {product.fireClass && product.fireClass.map(fc => `Class ${fc}`).join(', ')}
                      </td>
                    </tr>
                    {product.dischargeTime && (
                      <tr className="border-b">
                        <td className="px-6 py-4 font-semibold bg-gray-50">Discharge Time</td>
                        <td className="px-6 py-4">{product.dischargeTime}</td>
                      </tr>
                    )}
                    {product.operatingPressure && (
                      <tr className="border-b">
                        <td className="px-6 py-4 font-semibold bg-gray-50">Operating Pressure</td>
                        <td className="px-6 py-4">{product.operatingPressure}</td>
                      </tr>
                    )}
                    {product.testPressure && (
                      <tr className="border-b">
                        <td className="px-6 py-4 font-semibold bg-gray-50">Test Pressure</td>
                        <td className="px-6 py-4">{product.testPressure}</td>
                      </tr>
                    )}
                    {product.throwingDistance && (
                      <tr className="border-b">
                        <td className="px-6 py-4 font-semibold bg-gray-50">Throwing Distance</td>
                        <td className="px-6 py-4">{product.throwingDistance}</td>
                      </tr>
                    )}
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold bg-gray-50">Refillable</td>
                      <td className="px-6 py-4">{product.refillable ? 'Yes' : 'No'}</td>
                    </tr>
                    {product.warranty && (
                      <tr className="border-b">
                        <td className="px-6 py-4 font-semibold bg-gray-50">Warranty</td>
                        <td className="px-6 py-4">{product.warranty}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Features */}
          {isFireExtinguisher && product.detailedFeatures && product.detailedFeatures.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.detailedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                    <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Maintenance Info */}
          {isFireExtinguisher && product.maintenanceInfo && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaShieldAlt className="text-primary" /> Maintenance Information
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{product.maintenanceInfo}</p>
              </div>
            </div>
          )}

          {/* Usage Guide */}
          {isFireExtinguisher && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">How to Use</h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {['Pull', 'Aim', 'Squeeze', 'Sweep'].map((step, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {idx + 1}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{step}</h3>
                      <p className="text-gray-600 text-sm">
                        {idx === 0 && 'Pull the safety pin'}
                        {idx === 1 && 'Aim at the base of fire'}
                        {idx === 2 && 'Squeeze the handle'}
                        {idx === 3 && 'Sweep side to side'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-red-600 to-orange-500 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experts are here to help you select the perfect fire safety equipment for your needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Contact Our Experts
            </Link>
            <a href="tel:+919876543210" className="btn-secondary border-2 border-white hover:bg-white hover:text-primary">
              Call: +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
