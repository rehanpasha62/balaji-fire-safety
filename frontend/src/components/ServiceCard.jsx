import { Link } from 'react-router-dom';
import { FaWrench, FaCog, FaSearch, FaUsers, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

const iconMap = {
  wrench: FaWrench,
  settings: FaCog,
  search: FaSearch,
  users: FaUsers,
  shield: FaShieldAlt
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || FaShieldAlt;

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      <div className="p-8">
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-primary to-red-600 text-white group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-3xl" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-secondary group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-3">
          {service.shortDescription}
        </p>
        
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center text-primary font-semibold hover:text-red-600 transition-colors duration-300 group/link"
        >
          View Details
          <FaArrowRight className="ml-2 group-hover/link:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
      
      <div className="h-1 bg-gradient-to-r from-primary via-red-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};

export default ServiceCard;
