import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users,
  DollarSign,
  AlertTriangle,
  Calendar
} from 'lucide-react'
import { supabase, isDemoMode } from '../lib/supabase'

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    lowStockItems: 0,
    dailySales: 0,
    recentSales: [],
    topProducts: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      if (isDemoMode) {
        // Set mock data for demo
        setStats({
          totalSales: 15750.00,
          totalProducts: 120,
          lowStockItems: 8,
          dailySales: 2350.00,
          recentSales: [
            { id: '1', sale_date: new Date().toISOString(), total_amount: 150.00 },
            { id: '2', sale_date: new Date(Date.now() - 3600000).toISOString(), total_amount: 230.50 },
            { id: '3', sale_date: new Date(Date.now() - 7200000).toISOString(), total_amount: 89.99 },
            { id: '4', sale_date: new Date(Date.now() - 10800000).toISOString(), total_amount: 320.00 },
            { id: '5', sale_date: new Date(Date.now() - 14400000).toISOString(), total_amount: 75.25 },
          ],
          topProducts: [
            { id: '1', name: 'Produto A', quantity: 25, sale_price: 45.99 },
            { id: '2', name: 'Produto B', quantity: 12, sale_price: 89.50 },
            { id: '3', name: 'Produto C', quantity: 8, sale_price: 120.00 },
            { id: '4', name: 'Produto D', quantity: 35, sale_price: 29.99 },
            { id: '5', name: 'Produto E', quantity: 5, sale_price: 199.99 },
          ]
        })
        setLoading(false)
        return
      }

      // Load basic statistics from Supabase
      const [productsRes, salesRes] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('sales').select('*, sale_items(*, products(name))')
      ])

      const products = productsRes.data || []
      const sales = salesRes.data || []
      
      // Calculate stats
      const lowStockItems = products.filter(p => p.quantity < 10).length
      const today = new Date().toDateString()
      const todaySales = sales.filter(s => 
        new Date(s.sale_date).toDateString() === today
      )
      const dailySalesTotal = todaySales.reduce((sum, sale) => sum + sale.total_amount, 0)

      // Get recent sales (last 5)
      const recentSales = sales
        .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date))
        .slice(0, 5)

      setStats({
        totalSales: sales.reduce((sum, sale) => sum + sale.total_amount, 0),
        totalProducts: products.length,
        lowStockItems,
        dailySales: dailySalesTotal,
        recentSales,
        topProducts: products.slice(0, 5) // Simple top products for now
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ title, value, icon: Icon, color = 'primary', trend }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>
            {typeof value === 'number' && title.includes('Vendas') 
              ? `$${value.toLocaleString()}` 
              : value.toLocaleString()}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu negócio</p>
        {isDemoMode && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Modo Demonstração:</strong> Configure as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env para conectar com Supabase.
            </p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vendas Totais"
          value={stats.totalSales}
          icon={DollarSign}
          color="primary"
          trend={12}
        />
        <StatCard
          title="Vendas Hoje"
          value={stats.dailySales}
          icon={Calendar}
          color="success"
          trend={5}
        />
        <StatCard
          title="Produtos"
          value={stats.totalProducts}
          icon={Package}
          color="purple"
        />
        <StatCard
          title="Stock Baixo"
          value={stats.lowStockItems}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas Recentes</h3>
          <div className="space-y-3">
            {stats.recentSales.length > 0 ? (
              stats.recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="bg-primary-50 p-2 rounded-lg mr-3">
                      <ShoppingCart className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Venda #{sale.id.slice(-8) || sale.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(sale.sale_date).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    ${sale.total_amount.toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhuma venda recente</p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Produtos em Destaque</h3>
          <div className="space-y-3">
            {stats.topProducts.length > 0 ? (
              stats.topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="bg-purple-50 p-2 rounded-lg mr-3">
                      <Package className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        Stock: {product.quantity} unidades
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary-600">
                    ${product.sale_price.toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhum produto cadastrado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage