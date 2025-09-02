import React, { useState } from 'react';
import { UserPlus, Award, Users, Share2, Star, CheckCircle } from 'lucide-react';

const DonorSection: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    location: '',
    organDonation: false,
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  const achievements = [
    { icon: Star, title: 'First Donation', description: 'Complete your first blood donation', earned: true },
    { icon: Users, title: 'Community Hero', description: 'Refer 5 new donors', earned: true },
    { icon: Award, title: 'Life Saver', description: 'Save 10 lives through donations', earned: false },
  ];

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Community!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for registering as a donor. You're now part of a life-saving network.
            </p>

            {/* Gamification Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">150</div>
                <div className="text-emerald-700">Points Earned</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-blue-700">Lives Saved</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">Gold</div>
                <div className="text-purple-700">Donor Level</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={index} className={`p-4 rounded-xl border-2 ${
                      achievement.earned 
                        ? 'border-emerald-200 bg-emerald-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <IconComponent className={`h-6 w-6 mx-auto mb-2 ${
                        achievement.earned ? 'text-emerald-600' : 'text-gray-400'
                      }`} />
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Sharing */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-2">Spread the Word!</h3>
              <p className="mb-4">Share your donor status and inspire others to join</p>
              <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2 mx-auto">
                <Share2 className="h-4 w-4" />
                <span>I'm a Life Saver, Join Me!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Become a Life Saver
          </h1>
          <p className="text-lg text-gray-600">
            Join millions of donors making a difference every day
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Donor Registration</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="organDonation"
                  checked={formData.organDonation}
                  onChange={(e) => setFormData({ ...formData, organDonation: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="organDonation" className="ml-2 block text-sm text-gray-700">
                  I pledge to donate organs after death
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Register as Donor
              </button>
            </form>
          </div>

          {/* Benefits & Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Why Become a Donor?</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Save up to 3 lives with one blood donation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Get health checkups and notifications</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Earn badges and recognition</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Join a community of life-savers</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Urgent Requests Near You</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="font-medium text-gray-900">O+ Blood Needed</div>
                  <div className="text-sm text-gray-600">AIIMS Delhi - 2.5 km away</div>
                  <div className="text-xs text-red-600 font-medium">CRITICAL</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="font-medium text-gray-900">AB- Blood Needed</div>
                  <div className="text-sm text-gray-600">Max Hospital - 4.1 km away</div>
                  <div className="text-xs text-yellow-600 font-medium">MEDIUM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorSection;