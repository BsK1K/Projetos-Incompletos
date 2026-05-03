import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { BarChart3, Package, Truck, TrendingDown } from 'lucide-react'

export default function ReportsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600 mt-1">Insights e métricas da sua operação</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm rounded-xl border-zinc-200 hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-emerald-600" />
              Pedidos por Período
            </CardTitle>
            <CardDescription>Volume de pedidos nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-zinc-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-sm text-zinc-400">Gráfico de pedidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm rounded-xl border-zinc-200 hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              Performance de Entregas
            </CardTitle>
            <CardDescription>Tempo médio de entrega por transportadora</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-zinc-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-sm text-zinc-400">Gráfico de entregas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm rounded-xl border-zinc-200 hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Produtos Mais Vendidos
            </CardTitle>
            <CardDescription>Ranking de produtos por volume de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Camiseta Básica Preta M', 'Tênis Esportivo 42', 'Notebook Gamer X1'].map((name, i) => (
                <div key={name} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0">
                  <span className="text-sm text-gray-900">{i + 1}. {name}</span>
                  <span className="text-sm font-medium text-gray-600">{[24, 18, 12][i]} vendas</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm rounded-xl border-zinc-200 hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Faturamento Mensal
            </CardTitle>
            <CardDescription>Receita total por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-zinc-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-sm text-zinc-400">Gráfico de faturamento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
