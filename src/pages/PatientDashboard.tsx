import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const PatientDashboard: React.FC = () => {
  const [activeRequests] = useState([
    {
      id: 'REQ001',
      bloodGroup: 'O+',
      unitsNeeded: 2,
      status: 'pending',
      hospital: 'AIIMS Delhi',
      requestedAt: '2024-01-15 14:30',
      urgency: 'Critical',
    },
    {
      id: 'REQ002',
      bloodGroup: 'A+',
      unitsNeeded: 1,
      status: 'fulfilled',
      hospital: 'Apollo Mumbai',
      requestedAt: '2024-01-10 09:15',
      urgency: 'High',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Track your blood and organ requests</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-sm text-gray-600">Active Requests</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-sm text-gray-600">Fulfilled Requests</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Support Available</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Active Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Requests</h2>
          
          <div className="space-y-4">
            {activeRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      request.status === 'fulfilled' ? 'bg-emerald-500' :
                      request.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <h3 className="font-semibold text-gray-900">Request #{request.id}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                    request.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.urgency}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Blood Group</p>
                    <p className="font-semibold text-gray-900">{request.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Units Needed</p>
                    <p className="font-semibold text-gray-900">{request.unitsNeeded}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hospital</p>
                    <p className="font-semibold text-gray-900">{request.hospital}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Requested: {request.requestedAt}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {request.status === 'fulfilled' ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      request.status === 'fulfilled' ? 'text-emerald-600' : 'text-yellow-600'
                    }`}>
                      {request.status === 'fulfilled' ? 'Fulfilled' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;