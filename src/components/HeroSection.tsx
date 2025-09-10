import React, { useState } from 'react';
import { Search, MapPin, Droplets, Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSpeechRecognition } from 'react-speech-kit';

const HeroSection: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [isListening, setIsListening] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const { listen, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      const lowerResult = result.toLowerCase();
      
      // Extract blood group
      const bloodGroupMatch = bloodGroups.find(group => 
        lowerResult.includes(group.toLowerCase()) || 
        lowerResult.includes(group.replace('+', ' positive').replace('-', ' negative').toLowerCase())
      );
      
      if (bloodGroupMatch) {
        setBloodGroup(bloodGroupMatch);
      }
      
      // Extract location
      const words = result.split(' ');
      const locationWords = words.filter(word => 
        !bloodGroups.some(group => group.toLowerCase().includes(word.toLowerCase())) &&
        word.length > 2
      );
      
      if (locationWords.length > 0) {
        setSearchLocation(locationWords.join(' '));
      }
      
      setIsListening(false);
    },
  });
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', { searchLocation, bloodGroup });
    // In real app, this would trigger search functionality
  };

  const startVoiceSearch = () => {
    setIsListening(true);
    listen();
  };

  const stopVoiceSearch = () => {
    stop();
    setIsListening(false);
  };
  return (
    <section className="relative bg-gradient-to-b from-red-600 via-red-700 to-white text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-1/3 w-16 h-16 bg-white rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        ></motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Save someone's Life with
            <span className="block text-emerald-400">LifeStream_India</span>
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
            Connect donors, hospitals, and patients across India. Find blood and organs when every second counts.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Enter city or pincode"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                />
              </div>
              
              <div className="relative">
                <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
                <span>Find Now</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                <span>{isListening ? 'Stop' : 'Voice'}</span>
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-gray-600 text-sm">Popular searches:</span>
              {['O+', 'A+', 'B+'].map((group) => (
                <motion.button
                  key={group}
                  onClick={() => setBloodGroup(group)}
                  className="bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-3 py-1 rounded-full text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {group}
                </motion.button>
              ))}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;