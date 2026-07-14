import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaWrench, FaCog, FaSearch, FaUsers, FaShieldAlt, FaArrowLeft, FaCheckCircle, FaPhone, FaEnvelope } from 'react-icons/fa';
import api from '../services/api';

const iconMap = {
  wrench: FaWrench,
  settings: FaCog,
  search: FaSearch,
  users: FaUsers,
  shield: FaShieldAlt
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchService();
  }, [slug]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/services/${slug}`);
      setService(data);
      setError('');
    } catch (err) {
      console.error('Error fetching service:', err);
      setError('Service not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <Link to="/services" className="btn-primary">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || FaShieldAlt;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary via-secondary-dark to-black text-white section-padding">
        <div className="container-custom">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-white hover:text-primary transition-colors mb-6"
          >
            <FaArrowLeft /> Back to Services
          </button>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-red-600 text-white">
              <Icon className="text-4xl" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
              <p className="text-xl mt-2 opacity-90">{service.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-secondary">About This Service</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{service.fullDescription}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                  <FaCheckCircle className="text-primary text-xl mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
            <div className="space-y-8">
              {service.processSteps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-red-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-2 text-secondary">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 text-2xl mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industries Served */}
      {service.industries && service.industries.length > 0 && (
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Industries We Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {service.industries.map((industry, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary">
                  <p className="font-semibold text-gray-700">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-red-600 to-orange-500 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your fire safety needs and get a free consultation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary bg-white text-primary hover:bg-gray-100 flex items-center gap-2">
              <FaEnvelope /> Request a Quote
            </Link>
            <a href="tel:" className="btn-secondary border-2 border-white hover:bg-white hover:text-primary flex items-center gap-2">
              <FaPhone /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
