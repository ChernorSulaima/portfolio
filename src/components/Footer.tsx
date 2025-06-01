import React from 'react';
import { socialLinks } from '../data/personalData';
import SocialLinks from './SocialLinks';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-2xl font-bold">
              <span className="text-white">Port</span>
              <span className="text-yellow-400">fo</span>
            </a>
          </div>
          
          <div className="text-center mb-4 md:mb-0">
            <p className="text-gray-300">
              © {currentYear} - All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <p className="text-gray-300">Made with</p>
            <Heart className="text-red-500" size={18} />
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;