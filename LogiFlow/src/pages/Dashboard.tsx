import React, { useState, useMemo } from 'react';
import {
  Package, TrendingDown, PackageCheck, Truck,
  ChevronLeft, ChevronRight, Search, Plus, Bell, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const stats = [
  { label: 'Pedidos Pendentes', value: '142', badge: '+12.5%', badgeColor: 'bg-amber-100 text-amber-700', iconBg: 'bg-amber-100', icon: Package, iconColor: 'text-amber-500' },
  { label: 'Produtos em Baixo Estoque', value: '28', badge: 'Ação Necessária', badgeColor: 'bg-red-100 text-red-700', iconBg: 'bg-red-100', icon: TrendingDown, iconColor: 'text-red-500' },
  { label: 'Pedidos Enviados Hoje', value: '315', badge: 'Meta Diária', badgeColor: 'bg-emerald-100 text-emerald-700', iconBg: 'bg-emerald-100', icon: PackageCheck, iconColor: 'text-emerald-600' },
];

const chartWeek = [40, 65, 50, 80, 95, 70, 45];
const chartMonth = [55, 72, 48, 90, 61, 83, 76];

type ChartPeriod = 'Semanas' | 'Meses';

const shipments = [
  { truck: 'Caminhão #8824', desc: 'Em trânsito para São Paulo', location: 'Rodovia Anhanguera', color: 'bg-emerald-500', active: true },
  { truck: 'Caminhão #1290', desc: 'Carregamento concluído', location: 'CD Cajamar', color: 'bg-zinc-600', active: false },
  { truck: 'Caminhão #4431', desc: 'Atraso na descarga', location: 'Porto de Santos', color: 'bg-amber-500', active: true },
];

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const allOrders = [
  { id: '#LOG-2024-001', client: 'Alpha Indústrias S.A.', date: '15 Out, 2023', status: 'Entregue', statusClass: 'bg-emerald-50 text-emerald-700', value: 'R$ 12.450,00' },
  { id: '#LOG-2024-002', client: 'Beta Soluções Logísticas', date: '16 Out, 2023', status: 'Em Rota', statusClass: 'bg-amber-50 text-amber-700', value: 'R$ 8.200,00' },
  { id: '#LOG-2024-003', client: 'Gamma Tech LTDA', date: '16 Out, 2023', status: 'Processando', statusClass: 'bg-zinc-100 text-zinc-600', value: 'R$ 4.150,00' },
  { id: '#LOG-2024-004', client: 'Delta Comércio E.I.', date: '17 Out, 2023', status: 'Entregue', statusClass: 'bg-emerald-50 text-emerald-700', value: 'R$ 2.800,00' },
  { id: '#LOG-2024-005', client: 'Epsilon Distribuidora', date: '17 Out, 2023', status: 'Em Rota', statusClass: 'bg-amber-50 text-amber-700', value: 'R$ 5.900,00' },
];

const PAGE_SIZE = 3;

export default function Dashboard() {
  const [period, setPeriod] = useState<ChartPeriod>('Semanas');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [newOrderDialog, setNewOrderDialog] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({ client: '', address: '', payment: 'Pix', items: '' });

  const chartData = period === 'Semanas' ? chartWeek : chartMonth;

  const filtered = useMemo(
    () => allOrders.filter((o) =>
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageOrders = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-zinc-500 mt-1">Desempenho da cadeia de suprimentos em tempo real.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-zinc-100 hover:bg-zinc-200 p-2.5 rounded-lg transition-colors" title="Notificações">
            <Bell className="w-5 h-5 text-zinc-600" />
          </button>
          <button
            onClick={() => setNewOrderDialog(true)}
            className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-emerald-700 active:scale-95 transition-all shadow-sm shadow-emerald-200"
          >
            <Plus className="w-4 h-4" /> Novo Pedido
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200/80 flex flex-col gap-4 hover:shadow-md transition-shadow cursor-default">
            <div className="flex items-center justify-between">
              <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', stat.iconBg)}>
                <stat.icon className={cn('w-6 h-6', stat.iconColor)} />
              </div>
              <span className={cn('px-2 py-1 rounded-full text-xs font-bold', stat.badgeColor)}>{stat.badge}</span>
            </div>
            <div>
              <h3 className="text-sm text-zinc-500 font-medium">{stat.label}</h3>
              <p className="text-4xl font-bold text-zinc-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm border border-zinc-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900">Fluxo de Inventário</h3>
            <div className="flex gap-1 bg-zinc-100 rounded-lg p-1">
              {(['Semanas', 'Meses'] as ChartPeriod[]).map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setPage(0); }}
                  className={cn('px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200',
                    period === p ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 px-8 pb-8 pt-6 h-[280px]">
            {chartData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full flex items-end justify-center" style={{ height: '200px' }}>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-500 group-hover:to-emerald-300 transition-all duration-300"
                    style={{ height: `${h}%` }}
                  />
                  <span className="absolute -top-6 text-[10px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}%
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GPS Panel — FIXED */}
        <div className="col-span-12 lg:col-span-4 bg-zinc-900 rounded-xl shadow-xl overflow-hidden text-white flex flex-col">
          <div className="p-6 flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Monitoramento GPS</h3>
              <Truck className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="space-y-5">
              {shipments.map((s, i) => (
                <div key={i} className={cn('flex items-start gap-4', !s.active && 'opacity-50')}>
                  <div className={cn('w-1 h-12 rounded-full flex-shrink-0 mt-0.5', s.color)} />
                  <div>
                    <p className="text-sm font-semibold">{s.truck}</p>
                    <p className="text-xs text-zinc-400">{s.desc}</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide mt-1">{s.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Map area — FIXED, no overlapping */}
          <div className="h-28 bg-zinc-800 flex-shrink-0 relative overflow-hidden border-t border-zinc-700">
            {/* Grid decoration — properly contained */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 100" preserveAspectRatio="none">
              {[0,25,50,75,100,125,150,175].map(x => <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#10b981" strokeWidth="0.5"/>)}
              {[0,25,50,75].map(y => <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#10b981" strokeWidth="0.5"/>)}
            </svg>
            {/* Animated dots */}
            <div className="absolute top-4 left-1/4 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border border-emerald-300" />
            <div className="absolute top-8 left-2/3 w-2 h-2 bg-amber-400 rounded-full animate-pulse border border-amber-200" style={{ animationDelay: '0.5s' }} />
            {/* Labels — properly positioned at bottom, no overlap */}
            <div className="absolute bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-between px-4 py-2">
              <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">SP → RJ</span>
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">3 Rotas Ativas</span>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="col-span-12 bg-white rounded-xl shadow-sm border border-zinc-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900">Últimos Pedidos</h3>
            <div className="flex items-center bg-zinc-50 rounded-lg px-3 border border-zinc-200 gap-2">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                className="bg-transparent border-none text-sm py-1.5 w-48 outline-none placeholder:text-zinc-400"
                placeholder="Buscar pedidos..."
              />
              {search && (
                <button onClick={() => { setSearch(''); setPage(0); }} className="text-zinc-400 hover:text-zinc-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50/50 text-zinc-500 border-b border-zinc-100">
                <tr>
                  {['ID Pedido', 'Cliente', 'Data', 'Status', 'Valor', 'Ações'].map((h) => (
                    <th key={h} className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pageOrders.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-zinc-400 text-sm">Nenhum pedido encontrado.</td></tr>
                ) : pageOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900">{o.id}</td>
                    <td className="px-6 py-4 text-zinc-600">{o.client}</td>
                    <td className="px-6 py-4 text-zinc-500">{o.date}</td>
                    <td className="px-6 py-4">
                      <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide', o.statusClass)}>{o.status}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-900">{o.value}</td>
                    <td className="px-6 py-4">
                      <button className="p-1.5 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-zinc-100 bg-zinc-50/30 flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              {filtered.length === 0 ? 'Nenhum resultado' : `Mostrando ${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, filtered.length)} de ${filtered.length}`}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1 rounded border border-zinc-200 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-zinc-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-1 rounded border border-zinc-200 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-zinc-400"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Order Dialog */}
      <Dialog open={newOrderDialog} onOpenChange={setNewOrderDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Pedido Rápido</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase">Cliente</label>
              <input
                value={newOrderForm.client}
                onChange={(e) => setNewOrderForm((f) => ({ ...f, client: e.target.value }))}
                placeholder="Nome do cliente"
                className="mt-1 w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase">Endereço de Entrega</label>
              <input
                value={newOrderForm.address}
                onChange={(e) => setNewOrderForm((f) => ({ ...f, address: e.target.value }))}
                placeholder="Rua, número, cidade – UF"
                className="mt-1 w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase">Itens (SKUs)</label>
              <textarea
                value={newOrderForm.items}
                onChange={(e) => setNewOrderForm((f) => ({ ...f, items: e.target.value }))}
                placeholder="Ex: LF-JKT-092 x2, LF-SCP-441 x1"
                rows={3}
                className="mt-1 w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase">Pagamento</label>
              <select
                value={newOrderForm.payment}
                onChange={(e) => setNewOrderForm((f) => ({ ...f, payment: e.target.value }))}
                className="mt-1 w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option>Pix</option>
                <option>Cartão de Crédito</option>
                <option>Boleto</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setNewOrderDialog(false)} className="flex-1 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors">Cancelar</button>
              <button
                onClick={() => {
                  alert(`✅ Pedido criado para ${newOrderForm.client || 'cliente'} com sucesso!`);
                  setNewOrderDialog(false);
                  setNewOrderForm({ client: '', address: '', payment: 'Pix', items: '' });
                }}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-all"
              >
                Criar Pedido
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
