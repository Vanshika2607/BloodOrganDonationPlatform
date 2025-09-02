import React from 'react';
import { Users, Building2, Heart, Zap } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '2.5M+',
      label: 'Registered Donors',
      color: 'text-emerald-600',
    },
    {
      icon: Building2,
      number: '15K+',
      label: 'Partner Hospitals',
      color: 'text-blue-600',
    },
    {
      icon: Heart,
      number: '1.2M+',
      label: 'Lives Saved',
      color: 'text-red-600',
    },
    {
      icon: Zap,
      number: '98%',
      label: 'Success Rate',
      color: 'text-purple-600',
    },
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact Across India
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Together, we're building a stronger, more connected healthcare network
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors">
                  <IconComponent className={`h-8 w-8 ${stat.color} mx-auto mb-4`} />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;