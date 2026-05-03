import { useNavigate } from 'react-router-dom'
import { Package, Truck, BarChart3, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-xl text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            LogiFlow
          </h1>
          <nav className="flex items-center gap-6">
            <a href="/dashboard" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Pedidos</a>
            <a href="/inventory" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Estoque</a>
            <a href="/customers" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Clientes</a>
            <a href="/reports" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Relatórios</a>
            <a href="/settings" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium">Configurações</a>
          </nav>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-emerald-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 hover:bg-emerald-600 transition-all duration-300"
          >
            Acessar Sistema
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Otimize suas Expedições,<br />
            <span className="text-emerald-600">Impulsione seu E-commerce</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Receba, organize, separe e envie seus pedidos com eficiência inigualável.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:bg-emerald-600 transition-all duration-300 inline-flex items-center gap-2"
            >
              Começar agora
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border border-zinc-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-zinc-50 transition-all duration-300">
              Saiba mais
            </button>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Gestão de Pedidos</h3>
              <p className="text-sm text-gray-600">Controle total sobre o ciclo de vida dos seus pedidos.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expedição Rápida</h3>
              <p className="text-sm text-gray-600">Separação e envio otimizados para alta performance.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Relatórios Inteligentes</h3>
              <p className="text-sm text-gray-600">Insights detalhados sobre sua operação logística.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
