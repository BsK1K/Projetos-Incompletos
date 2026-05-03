import { Card, CardContent } from '../components/ui/card'
import { Package, TrendingDown, PackageCheck, BarChart3 } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { title: 'Pedidos Pendentes', value: '24', icon: Package, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Produtos em Baixo Estoque', value: '8', icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Pedidos Enviados Hoje', value: '42', icon: PackageCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Faturamento Mensal', value: 'R$ 84.250', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral da sua operação de expedição</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow duration-300 border-zinc-200">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm rounded-xl border-zinc-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Pedidos Recentes</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0">
                  <div>
                    <p className="font-medium text-sm text-gray-900">#ORD-2026-00{i}</p>
                    <p className="text-xs text-gray-500">Cliente {i}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${i <= 2 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {i <= 2 ? 'Pendente' : 'Enviado'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm rounded-xl border-zinc-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Alertas de Estoque</h3>
            <div className="space-y-3">
              {[
                { name: 'Camiseta Básica Preta M', sku: 'CAM-BAS-PRE-M', qty: 3 },
                { name: 'Tênis Esportivo 42', sku: 'TEN-ESP-42', qty: 2 },
                { name: 'Notebook Gamer X1', sku: 'NOTE-GAM-X1', qty: 1 },
              ].map((item) => (
                <div key={item.sku} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.sku}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                    {item.qty} un.
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
