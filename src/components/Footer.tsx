import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="px-6">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            © 2024 SyStock. Sistema de Gestão de Stock.
          </div>
          <div className="flex items-center space-x-4">
            <span>Versão 1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;