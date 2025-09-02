import React from 'react';
import { Search, UserPlus, Building2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuickActionCards: React.FC = () => {
  const actions = [
    {
      title: 'Find Blood Now',
      description: 'Search for available blood and organs near you',
      icon: Search,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      link: '/find',
    },
    {
      title: 'Register as Donor',
      description: 'Join thousands of life-savers in your community',
      icon: UserPlus,
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
      link: '/login/donor',
    },
    {
      title: 'Hospital Login',
      description: 'Update inventory and manage requests',
      icon: Building2,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      link: '/login/hospital',
    },
    {
      title: 'Organ Awareness',
      description: 'Learn about organ donation and its impact',
      icon: Heart,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      link: '/awareness',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Can We Help You Today?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our quick actions to get started on your life-saving journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={action.link}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 block"
                >
                  <motion.div 
                    className={`${action.color} ${action.hoverColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {action.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActionCards;