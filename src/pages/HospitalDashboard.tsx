import React, { useState } from 'react';
import { Building2, Plus, Edit3, TrendingUp, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockData } from '../data/mockData';

const HospitalDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState(mockData.hospitals[0].bloodStock);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const updateStock = (bloodGroup: string, newStock: number) => {
    setInventory(prev => ({
      ...prev,
      [bloodGroup]: Math.max(0, newStock)
    }));
  };

  if (!isLoggedIn) {
    // Redirect to hospital login page
    window.location.href = '/login/hospital';
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AIIMS Delhi Dashboard</h1>
              <p className="text-gray-600">Manage your blood and organ inventory</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                Verified Hospital
              </div>
              <Link
                to="/login/hospital"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'inventory', label: 'Inventory', icon: Edit3 },
                { id: 'requests', label: 'Requests', icon: Users },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'inventory' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Blood Inventory</h2>
                  <motion.button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Update Stock</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(inventory).map(([bloodGroup, stock]) => (
                    <motion.div 
                      key={bloodGroup} 
                      className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-center mb-3">
                        <div className="text-lg font-bold text-gray-900">{bloodGroup}</div>
                        <div className={`text-2xl font-bold ${
                          stock > 10 ? 'text-emerald-600' : stock > 5 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {stock}
                        </div>
                        <div className="text-sm text-gray-600">units</div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => updateStock(bloodGroup, stock - 1)}
                          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-1 px-2 rounded text-sm transition-colors"
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateStock(bloodGroup, stock + 1)}
                          className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 py-1 px-2 rounded text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'requests' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Requests</h2>
                <div className="space-y-4">
                  {mockData.requests.map((request, index) => (
                    <motion.div 
                      key={index} 
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900">{request.bloodGroup} Blood Request</div>
                          <div className="text-sm text-gray-600">Patient ID: {request.patientId}</div>
                          <div className="text-sm text-gray-600">Required: {request.unitsNeeded} units</div>
                        </div>
                        <div className="text-right">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                            request.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.urgency}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{request.timeAgo}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl font-bold text-blue-600">247</div>
                    <div className="text-blue-700">Total Donations This Month</div>
                  </motion.div>
                  <motion.div 
                    className="bg-emerald-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl font-bold text-emerald-600">156</div>
                    <div className="text-emerald-700">Lives Saved</div>
                  </motion.div>
                  <motion.div 
                    className="bg-purple-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl font-bold text-purple-600">89%</div>
                    <div className="text-purple-700">Request Fulfillment Rate</div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalDashboard;