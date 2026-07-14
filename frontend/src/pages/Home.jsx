import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaCertificate,
  FaFire,
  FaPhone,
  FaShieldAlt,
  FaTools,
} from 'react-icons/fa';
import api from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await api.get('/products/featured');
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const categories = [
    { name: 'Fire Extinguishers', icon: <FaFire />, color: 'bg-red-500' },
    { name: 'Fire Alarm Systems', icon: <FaShieldAlt />, color: 'bg-orange-500' },
    { name: 'Fire Hydrant Systems', icon: <FaTools />, color: 'bg-blue-500' },
    { name: 'Fire Sprinkler Systems', icon: <FaCertificate />, color: 'bg-green-500' },
  ];

  return (
    <div>
      <div className="bg-red-600 overflow-hidden py-2 text-white">
        <a
          href="tel:+91 7483017477"
          className="contact-number-ticker inline-flex items-center gap-2 whitespace-nowrap font-bold"
        >
          <FaPhone />
          Call BALAJI FIRE SAFETY: +91 7483017477
        </a>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Protecting Lives & Property Through Fire Safety
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Your trusted partner in comprehensive fire safety solutions. Quality
              equipment, expert installation, and reliable service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="btn-primary bg-white text-primary hover:bg-gray-100"
              >
                View Products
              </Link>
              <Link
                to="/contact"
                className="btn-secondary border-2 border-white hover:bg-white hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete fire safety solutions from installation to maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Installation',
                desc: 'Expert installation of fire safety systems',
                icon: <FaTools />,
              },
              {
                title: 'Maintenance',
                desc: 'Regular maintenance and AMC services',
                icon: <FaShieldAlt />,
              },
              {
                title: 'Inspection',
                desc: 'Thorough inspection and testing',
                icon: <FaCertificate />,
              },
              {
                title: 'Training',
                desc: 'Fire safety training programs',
                icon: <FaFire />,
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <div className="text-4xl text-primary mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Product Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wide range of fire safety equipment for all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-2 border-transparent hover:border-primary">
                  <div
                    className={`${category.color} text-white text-4xl p-4 rounded-lg inline-block mb-4`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                    {category.name}
                  </h3>
                  <span className="text-primary flex items-center">
                    View Products <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our most popular fire safety equipment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 6).map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <FaFire className="text-6xl text-gray-400" />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-primary font-semibold">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-bold my-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">{product.price}</span>
                      <Link
                        to="/products"
                        className="text-primary hover:underline flex items-center"
                      >
                        View Details <FaArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/products" className="btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose BALAJI FIRE SAFETY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '5+ Years Experience',
                desc: 'Trusted by thousands of customers across industries',
              },
              {
                title: 'Certified Products',
                desc: 'All products meet international safety standards',
              },
              {
                title: 'Expert Team',
                desc: 'Highly trained professionals for installation and service',
              },
              {
                title: '24/7 Support',
                desc: 'Round-the-clock emergency support available',
              },
              {
                title: 'Competitive Pricing',
                desc: 'Best quality products at affordable prices',
              },
              {
                title: 'AMC Services',
                desc: 'Comprehensive annual maintenance contracts',
              },
            ].map((item, index) => (
              <div key={item.title} className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Secure Your Property?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with us today for a free consultation and quote
          </p>
          <Link
            to="/contact"
            className="btn-primary bg-white text-primary hover:bg-gray-100"
          >
            Contact Us Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;