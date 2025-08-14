import React, { useState } from 'react'
import { AuthProvider } from './hooks/useAuth'
import { useAuth } from './hooks/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import './index.css'

const AppContent = () => {
  const { user, loading, signOut } = useAuth()
  const [currentPath, setCurrentPath] = useState('/dashboard')
  // eslint-disable-next-line no-unused-vars
  const [cashRegisterStatus, setCashRegisterStatus] = useState(false)

  const handleNavigate = (path) => {
    setCurrentPath(path)
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  const renderContent = () => {
    switch (currentPath) {
      case '/dashboard':
        return <DashboardPage />
      case '/sales':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vendas</h2>
          <p className="text-gray-600">Módulo de vendas em desenvolvimento...</p>
        </div>
      case '/products':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Produtos</h2>
          <p className="text-gray-600">Gestão de produtos em desenvolvimento...</p>
        </div>
      case '/suppliers':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Fornecedores</h2>
          <p className="text-gray-600">Gestão de fornecedores em desenvolvimento...</p>
        </div>
      case '/users':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Usuários</h2>
          <p className="text-gray-600">Gestão de usuários em desenvolvimento...</p>
        </div>
      case '/reports':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Relatórios</h2>
          <p className="text-gray-600">Relatórios em desenvolvimento...</p>
        </div>
      case '/analytics':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Análise ABC</h2>
          <p className="text-gray-600">Análise ABC em desenvolvimento...</p>
        </div>
      case '/settings':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Configurações</h2>
          <p className="text-gray-600">Configurações em desenvolvimento...</p>
        </div>
      default:
        return <DashboardPage />
    }
  }

  return (
    <Layout
      currentPath={currentPath}
      onNavigate={handleNavigate}
      user={user}
      onLogout={handleLogout}
      cashRegisterStatus={cashRegisterStatus}
    >
      {renderContent()}
    </Layout>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
