import { useState, useEffect } from 'react';
import { FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import api from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/services');
      setServices(data);
      setError('');
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary via-secondary-dark to-black text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Comprehensive fire safety solutions tailored to protect lives and property
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional fire safety services delivered by certified experts
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button onClick={fetchServices} className="btn-primary">
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Process */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Service Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple and efficient process to ensure your fire safety needs are met
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Consultation', desc: 'Free site visit and requirement analysis' },
              { step: '2', title: 'Quotation', desc: 'Detailed quotation with transparent pricing' },
              { step: '3', title: 'Implementation', desc: 'Professional service by certified team' },
              { step: '4', title: 'Support', desc: 'Ongoing maintenance and 24/7 support' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-primary to-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Providing fire safety solutions across diverse sectors
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Commercial Buildings',
              'Residential Complexes',
              'Industrial Facilities',
              'Hospitals & Healthcare',
              'Educational Institutions',
              'Hotels & Restaurants',
              'IT & Data Centers',
              'Shopping Malls',
              'Warehouses',
              'Manufacturing Units',
              'Government Buildings',
              'Airports & Transport',
            ].map((industry, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 hover:border-primary border-2 border-transparent">
                <p className="font-semibold text-gray-700">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Certified Professionals',
                desc: 'All our technicians are trained and certified in fire safety installation and maintenance',
              },
              {
                title: 'Quality Assurance',
                desc: 'We use only high-quality, certified equipment and follow industry best practices',
              },
              {
                title: 'Timely Service',
                desc: 'We understand the urgency of fire safety and ensure prompt service delivery',
              },
              {
                title: 'Comprehensive Support',
                desc: '24/7 emergency support and regular maintenance to keep your systems operational',
              },
              {
                title: 'Competitive Pricing',
                desc: 'Best quality services at competitive rates with transparent pricing',
              },
              {
                title: 'Compliance Guarantee',
                desc: 'All our services meet local fire safety codes and regulations',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-red-600 to-orange-500 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Fire Safety Services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and site visit
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Request a Quote
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

export default Services;
