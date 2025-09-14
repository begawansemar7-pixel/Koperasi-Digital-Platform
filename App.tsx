import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import Loans from './pages/Loans';
import Savings from './pages/Savings';
import AiAdvisor from './components/AiAdvisor';
import Landing from './pages/Landing';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import About from './pages/About';
import Programs from './pages/Programs';
import LandingLayout from './components/LandingLayout';
import Register from './pages/Register';
import DevPersona from './pages/DevPersona';
import ProgramDetail from './pages/ProgramDetail';

const AppLayout: React.FC = () => (
  <div className="min-h-screen bg-gray-50 text-gray-800">
    <Layout>
      <Outlet />
    </Layout>
    <AiAdvisor />
  </div>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:programId" element={<ProgramDetail />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Developer-facing persona page */}
      <Route path="/dev/persona" element={<DevPersona />} /> 
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:productId" element={<ProductDetail />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;