import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/find', label: 'Find Blood/Organ' },
    { path: '/hospitals', label: 'Hospitals' },
    { path: '/donors', label: 'Donors' },
    { path: '/awareness', label: 'Awareness' },
    { path: '/contact', label: 'Contact' },
  ];

  const loginOptions = [
    { path: '/login/donor', label: 'Donor Login', color: 'text-red-600' },
    { path: '/login/hospital', label: 'Hospital Login', color: 'text-blue-600' },
    { path: '/login/patient', label: 'Patient Login', color: 'text-purple-600' },
    { path: '/login/organisation', label: 'Organisation Login', color: 'text-emerald-600' },
    { path: '/login/admin', label: 'Admin Login', color: 'text-gray-600' },
  ];
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="bg-red-600 p-2 rounded-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Heart className="h-6 w-6 text-white" fill="white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-900">LifeStream_India</span>
              <span className="text-xs text-gray-600 hidden sm:block">National Tracker</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <span>Login</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isLoginDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isLoginDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    {loginOptions.map((option) => (
                      <Link
                        key={option.path}
                        to={option.path}
                        onClick={() => setIsLoginDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${option.color}`}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-gray-200">
                <p className="px-3 py-2 text-sm font-medium text-gray-500">Login Options</p>
                {loginOptions.map((option) => (
                  <Link
                    key={option.path}
                    to={option.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-50 ${option.color}`}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;