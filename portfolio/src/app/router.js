import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page';  // Adjust the import path based on your structure
import Dashboard from '../components/Dashboard';  // Ensure this path is correct

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
