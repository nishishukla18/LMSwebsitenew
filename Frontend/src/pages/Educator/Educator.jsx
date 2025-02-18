import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Educators/Navbar';
import Sidebar from '../../components/Educators/Sidebar';
import Footer from '../../components/Educators/Footer';

function Educator() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Educator;
