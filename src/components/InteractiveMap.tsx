import React, { useState } from 'react';
import { MapPin, Droplets, Activity } from 'lucide-react';
import { mockData } from '../data/mockData';

const InteractiveMap: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<any>(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real-Time Availability Map
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore hospitals across India and check live blood and organ availability
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2 bg-gray-100 rounded-2xl p-8 min-h-96 relative overflow-hidden">
            <div className="text-center text-gray-500 mb-8">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-red-300" />
              <p className="text-lg">Interactive India Map</p>
              <p className="text-sm">Click on hospital pins to view availability</p>
            </div>

            {/* Hospital Pins (Simplified representation) */}
            <div className="absolute inset-0 p-8">
              {mockData.hospitals.slice(0, 6).map((hospital, index) => (
                <button
                  key={hospital.id}
                  onClick={() => setSelectedHospital(hospital)}
                  className={`absolute bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 ${
                    index % 2 === 0 ? 'animate-pulse' : ''
                  }`}
                  style={{
                    top: `${20 + (index * 12)}%`,
                    left: `${15 + (index * 15)}%`,
                  }}
                >
                  <MapPin className="h-4 w-4" fill="white" />
                </button>
              ))}
            </div>
          </div>

          {/* Hospital Details */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hospital Details</h3>
            
            {selectedHospital ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedHospital.name}</h4>
                  <p className="text-gray-600 text-sm">{selectedHospital.location}</p>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-gray-800">Blood Availability</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedHospital.bloodStock).map(([group, stock]) => (
                      <div key={group} className="bg-white p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{group}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            (stock as number) > 10 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : (stock as number) > 5 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {stock} units
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    <Activity className="h-4 w-4 inline mr-1" />
                    Last updated: 2 mins ago
                  </p>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Contact Hospital
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Click on a hospital pin to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;