import React from 'react';
import { Rocket, ArrowRight, CheckCircle2, BarChart3, Package as PackageIcon, RefreshCw, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 h-16 bg-white border-b border-zinc-200 shadow-sm font-sans antialiased text-sm font-medium">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-emerald-600 font-inter">LogiFlow</span>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/orders" className="text-zinc-700 hover:text-emerald-600 transition-colors duration-300">Pedidos</a>
            <a href="/inventory" className="text-zinc-700 hover:text-emerald-600 transition-colors duration-300">Estoque</a>
            <a href="/customers" className="text-zinc-700 hover:text-emerald-600 transition-colors duration-300">Clientes</a>
            <a href="/reports" className="text-zinc-700 hover:text-emerald-600 transition-colors duration-300">Relatórios</a>
            <a href="/settings" className="text-zinc-700 hover:text-emerald-600 transition-colors duration-300">Configurações</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="text-zinc-700 hover:text-emerald-600 font-medium transition-colors">Entrar</a>
          <a href="/dashboard" className="bg-emerald-500 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-600 transition-all duration-300 hover:scale-105 shadow-md shadow-emerald-500/20">
            Acessar Sistema
          </a>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-50">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          </div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Rocket className="w-4 h-4" />
                  LOGÍSTICA DE PRÓXIMA GERAÇÃO
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-tight">
                  Otimize suas Expedições, <br className="hidden md:block" />
                  <span className="text-emerald-600">Impulsione seu E-commerce</span>
                </h1>
                <p className="text-lg text-zinc-600 max-w-xl leading-relaxed">
                  Receba, organize, separe e envie seus pedidos com eficiência inigualável. Uma plataforma completa desenvolvida para transformar sua cadeia de suprimentos em uma vantagem competitiva.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="/dashboard" className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 flex items-center gap-2 group">
                    Começar agora
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button className="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-50 active:scale-95 transition-all duration-300">
                    Ver Demonstração
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 relative hidden lg:block">
                 {/* Decorative Hero Elements */}
                 <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-zinc-200 p-6 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
                       <div>
                          <p className="text-sm font-bold text-zinc-900">Desempenho de Expedição</p>
                          <p className="text-xs text-zinc-500">Últimos 7 dias</p>
                       </div>
                       <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">+14.2%</span>
                    </div>
                    <div className="space-y-4">
                       <div className="h-4 bg-zinc-100 rounded-full w-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                       </div>
                       <div className="h-4 bg-zinc-100 rounded-full w-3/4 overflow-hidden">
                          <div className="h-full bg-blue-500 w-[70%] rounded-full"></div>
                       </div>
                       <div className="h-4 bg-zinc-100 rounded-full w-5/6 overflow-hidden">
                          <div className="h-full bg-amber-500 w-[90%] rounded-full"></div>
                       </div>
                    </div>
                 </div>
                 <div className="absolute -bottom-8 -left-8 z-20 bg-white p-4 rounded-xl shadow-xl border border-zinc-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                       <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-zinc-900">99.8%</p>
                       <p className="text-xs text-zinc-500">Precisão no Picking</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold text-zinc-900">Controle Total de Ponta a Ponta</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto text-lg">Nossas ferramentas foram criadas para simplificar a complexidade logística do e-commerce moderno.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 bg-zinc-50 rounded-3xl p-8 border border-zinc-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all">
                <div className="space-y-4 mb-8">
                  <BarChart3 className="w-10 h-10 text-emerald-600" />
                  <h3 className="text-2xl font-bold text-zinc-900">Relatórios Inteligentes</h3>
                  <p className="text-zinc-600 max-w-md">Tome decisões baseadas em dados reais com dashboards que mostram tendências de vendas, giro de estoque e gargalos operacionais em tempo real.</p>
                </div>
              </div>
              <div className="md:col-span-4 bg-zinc-950 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                  <PackageIcon className="text-emerald-500 w-10 h-10" />
                  <h3 className="text-xl font-bold">Picking & Packing</h3>
                  <p className="text-zinc-400 text-sm">Reduza erros de separação em até 95% com fluxos otimizados via código de barras.</p>
                </div>
              </div>
              <div className="md:col-span-4 bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">Integração Total</h3>
                  <p className="text-zinc-600 text-sm">Conecte-se com os maiores marketplaces e transportadoras do mercado nacional.</p>
                </div>
              </div>
              <div className="md:col-span-8 bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                       <CheckCircle2 className="text-emerald-600 w-6 h-6" />
                       <span className="font-medium text-zinc-900">Segurança de Dados LGPD</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <CheckCircle2 className="text-emerald-600 w-6 h-6" />
                       <span className="font-medium text-zinc-900">Suporte 24/7 Especializado</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <Smartphone className="text-emerald-600 w-6 h-6" />
                       <span className="font-medium text-zinc-900">App nativo para Operadores (Mobile)</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
