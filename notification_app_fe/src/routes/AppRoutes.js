import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Priority from '../pages/Priority/Priority';
import Navbar from '../components/layout/Navbar';

function AppRoutes() {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/priority" element={<Priority />} />
          <Route path="/recent" element={<Priority />} />
        </Routes>
      </main>
    </div>
  );
}

export default AppRoutes;
