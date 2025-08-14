import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <Navbar />
        
        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;