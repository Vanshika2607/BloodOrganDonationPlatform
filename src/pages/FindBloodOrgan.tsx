import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, CheckCircle, Mic, MicOff, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { mockData } from '../data/mockData';

const FindBloodOrgan: React.FC = () => {
  const [searchResults, setSearchResults] = useState(mockData.hospitals);
  const [filters, setFilters] = useState({
    location: '',
    bloodGroup: '',
    urgency: '',
  });
  const [, setIsListening] = useState(false);
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = ['Low', 'Medium', 'High', 'Critical'];

  const { speak, cancel } = useSpeechSynthesis();
  const { listen, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      // Parse voice input for blood group and location
      const lowerResult = result.toLowerCase();
      
      // Extract blood group
      const bloodGroupMatch = bloodGroups.find(group => 
        lowerResult.includes(group.toLowerCase()) || 
        lowerResult.includes(group.replace('+', ' positive').replace('-', ' negative').toLowerCase())
      );
      
      if (bloodGroupMatch) {
        setFilters(prev => ({ ...prev, bloodGroup: bloodGroupMatch }));
      }
      
      // Extract location (simple keyword matching)
      const cities = ['delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'pune', 'ahmednagar'];
      const locationMatch = cities.find(city => lowerResult.includes(city));
      
      if (locationMatch) {
        setFilters(prev => ({ ...prev, location: locationMatch }));
      }
      
      // Auto-search after voice input
      setTimeout(() => {
        handleSearch();
      }, 500);
      
      setIsListening(false);
      setVoiceSearchActive(false);
    },
  });

  const handleSearch = () => {
    let filtered = mockData.hospitals;
    
    if (filters.location) {
      filtered = filtered.filter(hospital => 
        hospital.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.bloodGroup) {
      filtered = filtered.filter(hospital => 
        hospital.bloodStock[filters.bloodGroup as keyof typeof hospital.bloodStock] > 0
      );
    }

    setSearchResults(filtered);
    
    // Voice feedback
    if (filtered.length > 0) {
      speak({ text: `Found ${filtered.length} hospitals with available ${filters.bloodGroup || 'blood'} in ${filters.location || 'your area'}` });
    } else {
      speak({ text: 'No hospitals found with the specified criteria. Please try different filters.' });
    }
  };

  const startVoiceSearch = () => {
    setVoiceSearchActive(true);
    setIsListening(true);
    speak({ text: 'Please say the blood group and location you need' });
    setTimeout(() => {
      listen();
    }, 2000);
  };

  const stopVoiceSearch = () => {
    stop();
    setIsListening(false);
    setVoiceSearchActive(false);
    cancel();
  };

  type Hospital = {
    id: string | number;
    name: string;
    location: string;
    bloodStock: { [key: string]: number };
    // add other fields if needed
  };

  const speakHospitalInfo = (hospital: Hospital) => {
    const availableGroups = Object.entries(hospital.bloodStock)
      .filter(([, stock]) => (stock as number) > 5)
      .map(([group]) => group)
      .join(', ');
    
    speak({ 
      text: `${hospital.name} in ${hospital.location}. Available blood groups: ${availableGroups}` 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Blood & Organs
          </h1>
          <p className="text-lg text-gray-600">
            Search for available blood and organs at nearby hospitals
          </p>
        </motion.div>

        {/* Voice Search Indicator */}
        <AnimatePresence>
          {voiceSearchActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-2xl p-8 text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Mic className="h-10 w-10 text-red-600" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Listening...</h3>
                <p className="text-gray-600 mb-4">Say blood group and location</p>
                <button
                  onClick={stopVoiceSearch}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Stop Listening
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                placeholder="City, State, or Pincode"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select
                value={filters.bloodGroup}
                onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
              <select
                value={filters.urgency}
                onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              >
                <option value="">All Levels</option>
                {urgencyLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <motion.button
                onClick={handleSearch}
                className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </motion.button>
            </div>

            <div className="flex items-end">
              <motion.button
                onClick={voiceSearchActive ? stopVoiceSearch : startVoiceSearch}
                className={`w-full p-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${
                  voiceSearchActive 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {voiceSearchActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                <span>{voiceSearchActive ? 'Stop' : 'Voice'}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Search Results ({searchResults.length})
            </h2>
            {searchResults.length > 0 && (
              <button
                onClick={() => speak({ text: `Found ${searchResults.length} hospitals` })}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <Volume2 className="h-4 w-4" />
                <span className="text-sm">Read Results</span>
              </button>
            )}
          </div>

          <div className="grid gap-6">
            <AnimatePresence>
              {searchResults.map((hospital, index) => (
                <motion.div
                  key={hospital.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
                  whileHover={{ y: -2 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Hospital Info */}
                    <div>
                      <div className="flex items-start space-x-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="bg-red-100 p-2 rounded-lg"
                        >
                          <CheckCircle className="h-6 w-6 text-red-600" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {hospital.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{hospital.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm text-emerald-600 font-medium">Verified Hospital</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Blood Stock */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Blood Availability</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {Object.entries(hospital.bloodStock).map(([group, stock]) => (
                          <motion.div
                            key={group}
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={`p-2 rounded-lg transition-colors ${
                              (stock as number) > 10 
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                : (stock as number) > 5 
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}>
                              <div className="text-xs font-medium">{group}</div>
                              <div className="text-xs">{stock}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-3">
                      <motion.button
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Phone className="h-4 w-4" />
                        <span>Contact Now</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => speakHospitalInfo(hospital)}
                        className="border border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-600 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Volume2 className="h-4 w-4" />
                        <span>Read Info</span>
                      </motion.button>
                      
                      <button className="border border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-600 py-2 px-4 rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Updated 5 mins ago</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
              <button
                onClick={() => {
                  setFilters({ location: '', bloodGroup: '', urgency: '' });
                  setSearchResults(mockData.hospitals);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FindBloodOrgan;
