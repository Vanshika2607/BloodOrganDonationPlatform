import React, { useState } from 'react';
import { Search, MapPin, Users, Building2, Award, Phone } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import QuickActionCards from '../components/QuickActionCards';
import InteractiveMap from '../components/InteractiveMap';
import StatsSection from '../components/StatsSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <QuickActionCards />
      <InteractiveMap />
      <StatsSection />
    </div>
  );
};

export default HomePage;