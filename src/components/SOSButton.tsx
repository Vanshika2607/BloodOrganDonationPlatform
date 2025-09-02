import React, { useState } from 'react';
import { AlertTriangle, X, Phone, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SOSButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emergencyData, setEmergencyData] = useState({
    bloodGroup: '',
    urgency: 'Critical',
    location: '',
    contact: '',
    patientName: '',
    unitsNeeded: 1,
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSOSClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmitEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send emergency request to hospitals
    alert(`Emergency request submitted! Nearest hospitals have been notified for ${emergencyData.bloodGroup} blood.`);
    setIsModalOpen(false);
    
    // Reset form
    setEmergencyData({
      bloodGroup: '',
      urgency: 'Critical',
      location: '',
      contact: '',
      patientName: '',
      unitsNeeded: 1,
    });
  };

  return (
    <>
      <motion.button
        onClick={handleSOSClick}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: [
            "0 10px 25px rgba(220, 38, 38, 0.3)",
            "0 10px 35px rgba(220, 38, 38, 0.5)",
            "0 10px 25px rgba(220, 38, 38, 0.3)"
          ]
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity },
          scale: { duration: 0.2 }
        }}
        aria-label="Emergency SOS Request"
      >
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <AlertTriangle className="h-6 w-6" fill="white" />
          </motion.div>
          <span className="hidden sm:block font-semibold">SOS</span>
        </div>
      </motion.button>

      {/* Emergency Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Emergency Request</h2>
                      <p className="text-sm text-gray-600">Fill details for immediate help</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmitEmergency} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                    <input
                      type="text"
                      value={emergencyData.patientName}
                      onChange={(e) => setEmergencyData({ ...emergencyData, patientName: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group Needed</label>
                    <select
                      value={emergencyData.bloodGroup}
                      onChange={(e) => setEmergencyData({ ...emergencyData, bloodGroup: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Units Needed</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={emergencyData.unitsNeeded}
                      onChange={(e) => setEmergencyData({ ...emergencyData, unitsNeeded: parseInt(e.target.value) })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
                    <input
                      type="text"
                      value={emergencyData.location}
                      onChange={(e) => setEmergencyData({ ...emergencyData, location: e.target.value })}
                      placeholder="Hospital name or address"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                    <input
                      type="tel"
                      value={emergencyData.contact}
                      onChange={(e) => setEmergencyData({ ...emergencyData, contact: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-red-800">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Emergency hotlines:</span>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-red-700">
                      <div>National Emergency: <strong>108</strong></div>
                      <div>Blood Bank Helpline: <strong>1910</strong></div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Emergency Request
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;