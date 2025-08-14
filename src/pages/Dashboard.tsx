import React from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  CubeIcon,
  TruckIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

// Mock data - in real app, this would come from API
const stats = [
  {
    name: 'Total Produtos',
    stat: '127',
    icon: CubeIcon,
    change: '+12%',
    changeType: 'increase',
    color: 'bg-blue-500',
  },
  {
    name: 'Fornecedores',
    stat: '15',
    icon: TruckIcon,
    change: '+2%',
    changeType: 'increase',
    color: 'bg-green-500',
  },
  {
    name: 'Vendas Hoje',
    stat: '23',
    icon: ShoppingCartIcon,
    change: '+18%',
    changeType: 'increase',
    color: 'bg-purple-500',
  },
  {
    name: 'Receita Hoje',
    stat: 'R$ 12.840',
    icon: CurrencyDollarIcon,
    change: '+8%',
    changeType: 'increase',
    color: 'bg-yellow-500',
  },
];

const lowStockProducts = [
  { name: 'Produto A', stock: 5, minStock: 10 },
  { name: 'Produto B', stock: 2, minStock: 15 },
  { name: 'Produto C', stock: 8, minStock: 20 },
];

const recentSales = [
  { id: '001', customer: 'Cliente A', total: 'R$ 450,00', time: '10:30' },
  { id: '002', customer: 'Cliente B', total: 'R$ 280,00', time: '11:15' },
  { id: '003', customer: 'Cliente C', total: 'R$ 720,00', time: '12:45' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Bem-vindo, {user?.full_name || user?.email}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`${item.color} p-3 rounded-lg`}>
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">{item.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                  <p className="ml-2 text-sm font-medium text-green-600">
                    {item.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Low Stock Alert */}
        <div className="card">
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Produtos com Baixo Stock
            </h2>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Stock atual: {product.stock} | Mínimo: {product.minStock}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                    Baixo
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="card">
          <div className="flex items-center mb-4">
            <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Vendas Recentes
            </h2>
          </div>
          <div className="space-y-3">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">#{sale.id}</p>
                  <p className="text-sm text-gray-600">{sale.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{sale.total}</p>
                  <p className="text-sm text-gray-500">{sale.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="btn-primary">
            Nova Venda
          </button>
          <button className="btn-secondary">
            Adicionar Produto
          </button>
          <button className="btn-secondary">
            Novo Fornecedor
          </button>
          <button className="btn-secondary">
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;