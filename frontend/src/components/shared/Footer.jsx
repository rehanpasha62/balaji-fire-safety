import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">BALAJI FIRE SAFETY</h3>
              <p className="text-gray-300 mb-4">
                Your trusted partner in fire safety solutions. Providing quality equipment and expert services since 2021.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-2xl https://www.facebook.com/profile.php?id=1000"><FaFacebook /></a>
                <a href="#" className="text-2xl hover:text-primary transition"><FaTwitter /></a>
                <a href="#" className="text-2xl hover:text-primary transition"><FaLinkedin /></a>
                <a href="#" className="text-2xl hover:text-primary transition"><FaInstagram /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-primary transition">Home</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-primary transition">About Us</Link></li>
                <li><Link to="/products" className="text-gray-300 hover:text-primary transition">Products</Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-primary transition">Services</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-primary transition">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-4">Our Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Fire Safety Installation</li>
                <li>Maintenance & AMC</li>
                <li>Inspection & Testing</li>
                <li>Fire Safety Training</li>
                <li>Emergency Support</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-primary" />
                  <span>#9/1B 100 Feet Road Jalahalli Cross T Dasarahalli Bangalore 560057, India</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-3 text-primary" />
                  <a href="tel:+91 7483017477" className="hover:text-primary">+91 7483017477</a>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-3 text-primary" />
                  <a href="mailto:primeventures07@gmail.com" className="hover:text-primary">primeventures07@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BALAJI FIRE SAFETY. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
