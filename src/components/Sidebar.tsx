import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  TruckIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, roles: ['admin', 'operador', 'gestor_stock'] },
  { name: 'Produtos', href: '/products', icon: CubeIcon, roles: ['admin', 'gestor_stock'] },
  { name: 'Fornecedores', href: '/suppliers', icon: TruckIcon, roles: ['admin', 'gestor_stock'] },
  { name: 'Vendas', href: '/sales', icon: ShoppingCartIcon, roles: ['admin', 'operador', 'gestor_stock'] },
  { name: 'Relatórios', href: '/reports', icon: DocumentTextIcon, roles: ['admin', 'gestor_stock'] },
  { name: 'Análise ABC', href: '/abc-analysis', icon: ChartBarIcon, roles: ['admin', 'gestor_stock'] },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, hasPermission } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    hasPermission(item.roles)
  );

  return (
    <div className="flex h-full w-64 flex-col fixed inset-y-0 bg-white border-r border-gray-200">
      <div className="flex flex-1 flex-col pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-6">
          <h1 className="text-2xl font-bold text-blue-600">SyStock</h1>
        </div>
        <nav className="mt-8 flex-1 space-y-1 px-3">
          {filteredNavigation.map((item) => {
            const current = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  current
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    current ? 'text-blue-500' : 'text-gray-500 group-hover:text-blue-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {user?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">
              {user?.full_name || user?.email}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role?.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;