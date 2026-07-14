import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-secondary text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:+91 7483017477" className="flex items-center hover:text-gray-200">
              <FaPhone className="mr-2" /> +91 7483017477
            </a>
            <a href="mailto:primeventures07@gmail.com" className="hidden sm:flex items-center hover:text-gray-200">
              <FaEnvelope className="mr-2" /> primeventures07@gmail.com
            </a>
          </div>
          <Link to="/admin" className="hover:text-gray-200">Admin Login</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            BALAJI FIRE<span className="text-primary"> SAFETY</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <Link to="/about" className="hover:text-primary transition">About</Link>
            <Link to="/products" className="hover:text-primary transition">Products</Link>
            <Link to="/services" className="hover:text-primary transition">Services</Link>
            <Link to="/contact" className="hover:text-primary transition">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" onClick={toggleMenu} className="block py-2 hover:text-primary transition">Home</Link>
            <Link to="/about" onClick={toggleMenu} className="block py-2 hover:text-primary transition">About</Link>
            <Link to="/products" onClick={toggleMenu} className="block py-2 hover:text-primary transition">Products</Link>
            <Link to="/services" onClick={toggleMenu} className="block py-2 hover:text-primary transition">Services</Link>
            <Link to="/contact" onClick={toggleMenu} className="block py-2 hover:text-primary transition">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
