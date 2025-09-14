import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingNavbar from './LandingNavbar';
import Footer from './Footer';

const LandingLayout: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <LandingNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
