import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavItem } from '../../types';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Hackathons', href: '#hackathons' },
  { name: 'Contact', href: '#contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      const headerHeight = 80; // Height of the fixed header
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-primary/5 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex justify-between items-center">
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-3xl font-bold flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="gradient-text">NK</span>
          <span className="text-primary">.</span>
        </motion.a>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {item.name}
            </motion.a>
          ))}
          
          {isAuthenticated ? (
            <>
              <motion.a
                href="#admin"
                onClick={(e) => handleNavClick(e, '#admin')}
                className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider"
                whileHover={{ y: -2 }}
              >
                Admin
              </motion.a>
              <motion.button
                onClick={logout}
                className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm uppercase tracking-wider"
                whileHover={{ y: -2 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.a
              href="#login"
              onClick={(e) => handleNavClick(e, '#login')}
              className="flex items-center px-6 py-2 rounded-full bg-primary hover:bg-primary-light transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm text-white">Login</span>
            </motion.a>
          )}
        </nav>

        <motion.button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-accent backdrop-blur-md"
          >
            <div className="container py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-300 hover:text-primary transition-colors py-2 border-b border-gray-800/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
              
              {isAuthenticated ? (
                <>
                  <motion.a
                    href="#admin"
                    onClick={(e) => handleNavClick(e, '#admin')}
                    className="text-gray-300 hover:text-primary transition-colors py-2 border-b border-gray-800/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Admin
                  </motion.a>
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors py-2 text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.a
                  href="#login"
                  onClick={(e) => handleNavClick(e, '#login')}
                  className="flex items-center text-primary hover:text-primary-light py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <User className="w-4 h-4 mr-2" />
                  <span>Login</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;