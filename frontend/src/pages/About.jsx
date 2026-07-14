import { FaAward, FaUsers, FaHandshake, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BALAJI FIRE SAFETY</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Leading fire safety solutions provider with over 5 years of excellence
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-gray-700 mb-4">
                BALAJI FIRE SAFETY is a premier fire safety equipment supplier and service provider, 
                established in 2021. We specialize in providing comprehensive fire safety solutions 
                to residential, commercial, and industrial sectors across India.
              </p>
              <p className="text-gray-700 mb-4">
                Our commitment to safety, quality, and customer satisfaction has made us a trusted 
                name in the fire safety industry. We offer a complete range of fire safety equipment, 
                from fire extinguishers to advanced fire suppression systems.
              </p>
              <p className="text-gray-700">
                With a team of certified professionals and partnerships with leading manufacturers, 
                we ensure that every project meets the highest safety standards and compliance requirements.
              </p>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <FaAward className="text-9xl text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl text-primary mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To provide world-class fire safety solutions that protect lives and property, 
                while maintaining the highest standards of quality, reliability, and customer service. 
                We strive to make fire safety accessible and affordable for everyone.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl text-primary mb-4">👁️</div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become India's most trusted fire safety solutions provider by 2030, 
                recognized for innovation, expertise, and unwavering commitment to safety. 
                We envision a future where every building is equipped with proper fire safety measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Experience in Fire Safety</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Over 5 years of expertise in fire safety solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaAward />, number: '5+', label: 'Years Experience' },
              { icon: <FaUsers />, number: '2000+', label: 'Happy Clients' },
              { icon: <FaHandshake />, number: '500+', label: 'Projects Completed' },
              { icon: <FaChartLine />, number: '100%', label: 'Customer Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl text-primary mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-secondary mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Standards */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Certifications & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'ISO 9001:2021 Certified',
              'NFPA Compliant Products',
              'ISI Marked Equipment',
              'CE Certified Systems',
              'NBC Compliant Solutions',
              'BIS Approved Products',
            ].map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl text-primary mb-3">✓</div>
                <p className="font-semibold">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BALAJI FIRE SAFETY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Quality Products',
                desc: 'We supply only certified and tested fire safety equipment from reputed manufacturers',
              },
              {
                title: 'Expert Team',
                desc: 'Our technicians are trained and certified in fire safety installation and maintenance',
              },
              {
                title: 'Timely Service',
                desc: 'We understand the importance of fire safety and ensure prompt service delivery',
              },
              {
                title: 'Competitive Pricing',
                desc: 'Best quality products and services at the most competitive prices in the market',
              },
              {
                title: 'Comprehensive Solutions',
                desc: 'From consultation to installation and maintenance, we handle everything',
              },
              {
                title: '24/7 Support',
                desc: 'Round-the-clock emergency support for all your fire safety needs',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
