import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await api.post('/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">Get in touch with our fire safety experts</p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our products or services? Need a quote? Our team is here to help you with all your fire safety needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      #9/1B 100 Feet Road Jalahalli Cross T Dasarahalli Bangalore 560057<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FaPhone className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+91 7483017477" className="hover:text-primary">+91 7483017477</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FaEnvelope className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:primeventures07@gmail.com" className="hover:text-primary">primeventures07@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FaClock className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Closed<br />
                      <span className="text-primary font-semibold">24/7 Emergency Support Available</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>

                {success && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3">
                    <FaCheckCircle className="text-xl" />
                    <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="+91 0123456789"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Tell us about your fire safety requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Visit Our Office</h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
           <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62195.167877813845!2d77.4795426506141!3d13.023060193626602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d1d493e08db%3A0x7622cb713defec8c!2sBalaji%20Fire%20Safety!5e0!3m2!1sen!2sin!4v1784054296963!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
  title="Balaji Fire Safety Location"
/>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="bg-primary text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl mb-6">Call us now for urgent fire safety support</p>
          <a
            href="tel:+91 7483017477"
            className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center gap-2"
          >
            <FaPhone /> +91 7483017477
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
