import React from 'react'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  BarChart3,
  Settings,
  LogOut,
  Building2
} from 'lucide-react'

const Sidebar = ({ currentPath, onNavigate, user, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'sales', icon: ShoppingCart, label: 'Vendas', path: '/sales' },
    { id: 'products', icon: Package, label: 'Produtos', path: '/products' },
    { id: 'suppliers', icon: Building2, label: 'Fornecedores', path: '/suppliers' },
    { id: 'users', icon: Users, label: 'Usuários', path: '/users', adminOnly: true },
    { id: 'reports', icon: FileText, label: 'Relatórios', path: '/reports' },
    { id: 'analytics', icon: BarChart3, label: 'Análise ABC', path: '/analytics' },
    { id: 'settings', icon: Settings, label: 'Configurações', path: '/settings' },
  ]

  const isActive = (path) => currentPath === path

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <div className="flex items-center">
          <Package className="h-8 w-8 text-primary-600" />
          <span className="ml-3 text-xl font-bold text-gray-800">SyStock</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            // Hide admin-only items for non-admin users
            if (item.adminOnly && user?.role !== 'admin') {
              return null
            }

            const Icon = item.icon
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.path)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'operador'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-gray-600 p-1"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar