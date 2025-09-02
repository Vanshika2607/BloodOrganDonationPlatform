import React from 'react';
import { Heart, Users, CheckCircle, AlertCircle } from 'lucide-react';

const Awareness: React.FC = () => {
  const facts = [
    {
      icon: Heart,
      title: 'One Organ Donor',
      description: 'Can save up to 8 lives and enhance the lives of 50+ people',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: Users,
      title: 'Every 3 Seconds',
      description: 'Someone in India needs blood or blood products',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: CheckCircle,
      title: 'Safe Process',
      description: 'Organ donation is completely safe and doesn\'t affect the donor',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      icon: AlertCircle,
      title: 'High Demand',
      description: '5 lakh people in India are waiting for organ transplants',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Organ Donation Awareness
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about the importance of organ donation and how you can make a difference in someone's life
          </p>
        </div>

        {/* Hero Video Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="aspect-video bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
            <div className="text-center text-white">
              <Heart className="h-16 w-16 mx-auto mb-4" fill="white" />
              <h3 className="text-2xl font-semibold mb-2">The Gift of Life</h3>
              <p className="text-red-100">Watch inspiring stories of organ donation</p>
              <button className="mt-4 bg-white text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Play Video
              </button>
            </div>
          </div>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {facts.map((fact, index) => {
            const IconComponent = fact.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
                <div className={`${fact.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className={`h-6 w-6 ${fact.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{fact.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{fact.description}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Who can donate organs?</h3>
                <p className="text-gray-600 text-sm">
                  Anyone aged 18-65 can pledge to donate organs. Medical suitability is determined at the time of death.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Does organ donation cost money?</h3>
                <p className="text-gray-600 text-sm">
                  No, organ donation is completely free. The recipient's insurance or the hospital covers all costs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I donate blood if I have tattoos?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, you can donate blood 6 months after getting a tattoo from a licensed tattoo parlor.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How often can I donate blood?</h3>
                <p className="text-gray-600 text-sm">
                  You can donate blood every 56 days (8 weeks). Your body naturally replenishes the donated blood.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is organ donation against my religion?</h3>
                <p className="text-gray-600 text-sm">
                  Most major religions support organ donation as an act of charity and compassion.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I change my mind about donation?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, you can update your donation preferences anytime through your donor profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awareness;