import React from 'react';
import { useContent } from '../../context/ContentContext';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const { content } = useContent();
  const { contact } = content;
  
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-white font-bold text-2xl mb-2">
              <span>NK</span>
              <span className="text-purple-500">.</span>
            </h2>
            <p className="text-gray-400 max-w-md">
              Tech Explorer | Builder | Startup Dreamer | Electronics Student
            </p>
          </div>
          
          <div className="flex space-x-4">
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="text-gray-400 hover:text-purple-500 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            )}
            
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="text-gray-400 hover:text-purple-500 transition-colors duration-300"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Nikhil Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;