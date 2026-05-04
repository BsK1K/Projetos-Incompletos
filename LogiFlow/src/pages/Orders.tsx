import React, { useState } from 'react';
import { Upload, Plus, Filter, ChevronLeft, ChevronRight, Eye, Edit2, TrendingUp, ShoppingCart, Clock, Wallet, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type OrderStatus = 'Pendente' | 'Enviado' | 'Cancelado' | 'Em Separação';

interface Order {
  id: string;
  initials: string;
  client: string;
  email: string;
  status: OrderStatus;
  date: string;
  value: string;
}

const mockOrders: Order[] = [
  { id: '#ORD-9402', initials: 'AS', client: 'Artur Silveira', email: 'artur@empresa.com.br', status: 'Pendente', date: '24 Mai, 2024', value: 'R$ 1.250,00' },
  { id: '#ORD-9401', initials: 'ML', client: 'Mariana Lopes', email: 'mariana.l@log.com', status: 'Enviado', date: '23 Mai, 2024', value: 'R$ 840,20' },
  { id: '#ORD-9399', initials: 'RP', client: 'Ricardo Pereira', email: 'ricardo.p@tech.io', status: 'Cancelado', date: '22 Mai, 2024', value: 'R$ 2.105,50' },
  { id: '#ORD-9395', initials: 'FC', client: 'Fabiana Costa', email: 'fabiana@costa.net', status: 'Enviado', date: '22 Mai, 2024', value: 'R$ 492,00' },
  { id: '#ORD-9390', initials: 'GM', client: 'Gilberto Mota', email: 'gilberto@express.com', status: 'Pendente', date: '21 Mai, 2024', value: 'R$ 3.420,00' },
];

const statusConfig: Record<OrderStatus, { label: string; classes: string }> = {
  'Pendente':      { label: 'Pendente',     classes: 'bg-amber-50 text-amber-700 border border-amber-100' },
  'Enviado':       { label: 'Enviado',      classes: 'bg-emerald-50 text-emerald-700 border border-emerald-100' },
  'Cancelado':     { label: 'Cancelado',    classes: 'bg-rose-50 text-rose-700 border border-rose-100' },
  'Em Separação':  { label: 'Em Separação', classes: 'bg-blue-50 text-blue-700 border border-blue-100' },
};

export default function Orders() {
  const [selected, setSelected] = useState<Order | null>(null);

  return (
    <div className="space-y-8">
      {/* Page Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Gerenciamento de Pedidos</h1>
          <p className="text-zinc-500 mt-1 text-sm">Visualize e processe todos os pedidos em tempo real.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-sm rounded-lg transition-all active:scale-95">
            <Upload className="w-4 h-4" />
            Importar CSV
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm shadow-emerald-200 transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            Novo Pedido
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'TOTAL PEDIDOS', value: '1,284', sub: '+12% vs mês anterior', subColor: 'text-emerald-600', icon: ShoppingCart, iconBg: 'bg-emerald-50 text-emerald-600', hover: 'hover:border-emerald-200' },
          { label: 'PENDENTES', value: '42', sub: 'Requer atenção imediata', subColor: 'text-zinc-400', icon: Clock, iconBg: 'bg-yellow-50 text-yellow-600', hover: 'hover:border-yellow-200' },
          { label: 'EM TRÂNSITO', value: '156', sub: '8 entregas hoje', subColor: 'text-blue-600', icon: TrendingUp, iconBg: 'bg-blue-50 text-blue-600', hover: 'hover:border-blue-200' },
          { label: 'RECEITA ESTIMADA', value: 'R$ 42.5k', sub: 'Meta 85%', subColor: 'text-emerald-600', icon: Wallet, iconBg: 'bg-emerald-50 text-emerald-600', hover: 'hover:border-emerald-200' },
        ].map((s) => (
          <div key={s.label} className={cn('bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-center justify-between transition-colors', s.hover)}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{s.label}</p>
              <h3 className="text-2xl font-bold text-zinc-900 mt-1">{s.value}</h3>
              <p className={cn('text-xs font-medium mt-1 flex items-center gap-1', s.subColor)}>{s.sub}</p>
            </div>
            <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', s.iconBg)}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-600 hover:bg-zinc-50 transition-colors font-medium">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <div className="h-4 w-px bg-zinc-200" />
            <span className="text-sm text-zinc-500">Exibindo 1–5 de 1,284 resultados</span>
          </div>
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-zinc-100 rounded text-zinc-400 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-zinc-100 rounded text-zinc-400 transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50">
                {['ID do Pedido', 'Cliente', 'Status', 'Data', 'Valor', 'Ações'].map((h, i) => (
                  <th key={h} className={cn('px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100', i === 4 && 'text-right', i === 5 && 'text-center')}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-sm text-emerald-600 font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500 flex-shrink-0">
                        {order.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">{order.client}</p>
                        <p className="text-xs text-zinc-500">{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', statusConfig[order.status].classes)}>
                      {statusConfig[order.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-zinc-900 font-medium text-right">{order.value}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelected(order)}
                        className="p-1.5 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-all"
                        title="Ver Detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded transition-all" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/30 flex items-center justify-between">
          <div className="flex gap-1">
            {['1','2','3','...','12'].map((p) => (
              <button key={p} className={cn('px-3 py-1 rounded text-sm', p === '1' ? 'bg-white border border-zinc-200 font-medium text-zinc-700' : 'text-zinc-400 hover:bg-zinc-50')}>
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <label htmlFor="per_page">Linhas por página:</label>
            <select id="per_page" className="bg-white border border-zinc-200 rounded-lg text-xs py-1 px-2 focus:ring-emerald-500">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Secondary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm relative overflow-hidden h-[300px]">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h4 className="text-lg font-semibold text-zinc-900">Localização dos Pedidos (Tempo Real)</h4>
            <span className="flex items-center gap-2 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
              AO VIVO
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50" />
          <div className="absolute inset-0 flex items-end p-6 z-10">
            <div className="flex flex-wrap gap-3">
              {[{ city: 'São Paulo, SP', count: '12 Entregas Pendentes' }, { city: 'Curitiba, PR', count: '5 Entregas Pendentes' }].map((loc) => (
                <div key={loc.city} className="bg-white/90 backdrop-blur-md p-3 rounded-lg border border-zinc-200 shadow-xl flex items-center gap-3">
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  <div>
                    <p className="text-xs font-bold">{loc.city}</p>
                    <p className="text-[10px] text-zinc-500">{loc.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-2">Suporte Premium</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">Precisa de ajuda com o rastreamento ou faturamento de pedidos complexos?</p>
          </div>
          <button className="relative z-10 mt-8 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2">
            Falar com Logista
          </button>
          <div className="absolute -bottom-10 -right-10 opacity-5">
            <div className="w-48 h-48 border-8 border-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido — {selected?.id}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-zinc-50 rounded-lg p-3">
                  <p className="text-zinc-500 text-xs font-medium mb-1">Cliente</p>
                  <p className="font-semibold text-zinc-900">{selected.client}</p>
                  <p className="text-zinc-500 text-xs">{selected.email}</p>
                </div>
                <div className="bg-zinc-50 rounded-lg p-3">
                  <p className="text-zinc-500 text-xs font-medium mb-1">Valor Total</p>
                  <p className="font-semibold text-zinc-900">{selected.value}</p>
                  <p className="text-zinc-500 text-xs">{selected.date}</p>
                </div>
              </div>
              <div className="bg-zinc-50 rounded-lg p-3">
                <p className="text-zinc-500 text-xs font-medium mb-2">Status Atual</p>
                <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', statusConfig[selected.status].classes)}>
                  {statusConfig[selected.status].label}
                </span>
              </div>
              <div className="bg-zinc-50 rounded-lg p-3">
                <p className="text-zinc-500 text-xs font-medium mb-2">Histórico de Status</p>
                <div className="space-y-2">
                  {['Pedido recebido', 'Pagamento confirmado', selected.status === 'Enviado' ? 'Enviado para transportadora' : 'Aguardando separação'].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={cn('w-2 h-2 rounded-full', i === 2 && selected.status !== 'Enviado' ? 'bg-amber-400' : 'bg-emerald-500')} />
                      <p className="text-xs text-zinc-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
