import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import FindBloodOrgan from './pages/FindBloodOrgan';
import HospitalDashboard from './pages/HospitalDashboard';
import DonorSection from './pages/DonorSection';
import Awareness from './pages/Awareness';
import Contact from './pages/Contact';
import DonorLogin from './pages/auth/DonorLogin';
import HospitalLogin from './pages/auth/HospitalLogin';
import AdminLogin from './pages/auth/AdminLogin';
import OrganisationLogin from './pages/auth/OrganisationLogin';
import PatientLogin from './pages/auth/PatientLogin';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import SOSButton from './components/SOSButton';
import { mockData } from './data/mockData';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/find" element={<FindBloodOrgan />} />
            <Route path="/hospitals" element={<HospitalDashboard />} />
            <Route path="/donors" element={<DonorSection />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login/donor" element={<DonorLogin />} />
            <Route path="/login/hospital" element={<HospitalLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/organisation" element={<OrganisationLogin />} />
            <Route path="/login/patient" element={<PatientLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/patient" element={<PatientDashboard />} />
          </Routes>
        </main>
        <SOSButton />
      </div>
    </Router>
  );
}

export default App;