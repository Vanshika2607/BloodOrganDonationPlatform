import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Users, Building2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Hospitals', value: '15,247', change: '+12%', color: 'text-blue-600' },
    { label: 'Active Donors', value: '2.5M', change: '+8%', color: 'text-emerald-600' },
    { label: 'Blood Units Available', value: '45,678', change: '-3%', color: 'text-red-600' },
    { label: 'Lives Saved Today', value: '1,234', change: '+15%', color: 'text-purple-600' },
  ];

  const shortageAreas = [
    { state: 'Uttar Pradesh', shortage: 'O- Blood', severity: 'Critical', percentage: 85 },
    { state: 'Maharashtra', shortage: 'AB- Blood', severity: 'High', percentage: 70 },
    { state: 'Bihar', shortage: 'A+ Blood', severity: 'Medium', percentage: 45 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">National Admin Dashboard</h1>
          <p className="text-gray-600">Monitor blood and organ availability across India</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-right ${stat.color}`}>
                  <p className="text-sm font-medium">{stat.change}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shortage Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Critical Shortage Alerts</h2>
          <div className="space-y-4">
            {shortageAreas.map((area, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`h-5 w-5 ${
                      area.severity === 'Critical' ? 'text-red-600' :
                      area.severity === 'High' ? 'text-orange-600' : 'text-yellow-600'
                    }`} />
                    <div>
                      <h3 className="font-semibold text-gray-900">{area.state}</h3>
                      <p className="text-sm text-gray-600">{area.shortage} shortage</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    area.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                    area.severity === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {area.severity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      area.severity === 'Critical' ? 'bg-red-600' :
                      area.severity === 'High' ? 'bg-orange-600' : 'bg-yellow-600'
                    }`}
                    style={{ width: `${area.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{area.percentage}% shortage level</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Heatmap Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">India Shortage Heatmap</h2>
          <div className="bg-gradient-to-br from-red-100 to-emerald-100 rounded-xl p-8 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg text-gray-600">Interactive India Heatmap</p>
              <p className="text-sm text-gray-500">Showing real-time shortage data across states</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;