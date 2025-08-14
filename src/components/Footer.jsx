import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t px-6 py-4">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          © 2024 SyStock - Sistema de Gestão de Stock
        </div>
        <div className="flex space-x-4">
          <span>v1.0.0</span>
          <span>•</span>
          <span>Suporte: suporte@systock.com</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer