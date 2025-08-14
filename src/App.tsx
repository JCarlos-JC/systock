import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Placeholder routes - will be implemented later */}
            <Route
              path="/products"
              element={
                <ProtectedRoute requiredRoles={['admin', 'gestor_stock']}>
                  <Layout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
                      <p className="text-gray-600 mt-2">Módulo em desenvolvimento...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute requiredRoles={['admin', 'gestor_stock']}>
                  <Layout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">Fornecedores</h2>
                      <p className="text-gray-600 mt-2">Módulo em desenvolvimento...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/sales"
              element={
                <ProtectedRoute>
                  <Layout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">Vendas</h2>
                      <p className="text-gray-600 mt-2">Módulo em desenvolvimento...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports"
              element={
                <ProtectedRoute requiredRoles={['admin', 'gestor_stock']}>
                  <Layout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">Relatórios</h2>
                      <p className="text-gray-600 mt-2">Módulo em desenvolvimento...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/abc-analysis"
              element={
                <ProtectedRoute requiredRoles={['admin', 'gestor_stock']}>
                  <Layout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">Análise ABC</h2>
                      <p className="text-gray-600 mt-2">Módulo em desenvolvimento...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
