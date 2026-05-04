import React, { useState } from 'react';
import { Plus, Download, Filter, Edit, MoreVertical, ChevronLeft, ChevronRight, AlertTriangle, Sparkles, Warehouse } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total SKUs', value: '2.481', sub: '+12%', subColor: 'text-emerald-600' },
  { label: 'Baixo Estoque', value: '24', valueColor: 'text-red-500', sub: 'itens', subColor: 'text-zinc-400' },
  { label: 'Movimentação (24h)', value: '156', sub: 'In/Out', subColor: 'text-emerald-600' },
  { label: 'Capacidade', value: '84%', sub: null, subColor: '', isProgress: true },
];

const inventoryRows = [
  {
    sku: 'LF-JKT-092',
    name: 'Jaqueta Térmica Pro',
    sub: '3 variações agrupadas',
    qty: 142,
    status: 'Estável',
    statusClass: 'bg-emerald-50 text-emerald-700',
    location: 'SETOR-A / 01-02',
    variations: [
      { sku: 'LF-JKT-092-SM-BK', label: 'Tamanho P • Preto', qty: 8, location: 'A-01-02-01', low: true },
      { sku: 'LF-JKT-092-MD-BK', label: 'Tamanho M • Preto', qty: 64, location: 'A-01-02-02', low: false },
    ],
  },
  {
    sku: 'LF-SCP-441',
    name: 'Sapatilha Aeroflow V2',
    sub: 'Unidade Única',
    qty: 421,
    status: 'Alto',
    statusClass: 'bg-blue-50 text-blue-700',
    location: 'SETOR-B / 04-11',
    variations: [],
  },
  {
    sku: 'LF-TRK-112',
    name: 'Rastreador GPS Nano',
    sub: 'Componente Eletrônico',
    qty: 12,
    status: 'Alerta Crítico',
    statusClass: 'bg-red-100 text-red-700',
    location: 'SETOR-D / 12-01',
    variations: [],
    critical: true,
  },
];

export default function Inventory() {
  const [entryDialog, setEntryDialog] = useState(false);
  const [nfStep, setNfStep] = useState<1 | 2>(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Estoque</h1>
          <p className="text-sm text-zinc-500 mt-1">Controle de inventário e endereçamento de produtos.</p>
        </div>
        <button
          onClick={() => { setEntryDialog(true); setNfStep(1); }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nova Entrada
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-xl border border-zinc-100 shadow-sm flex flex-col gap-1">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{s.label}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={cn('text-3xl font-bold', s.valueColor || 'text-zinc-900')}>{s.value}</span>
              {s.isProgress && (
                <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[84%]" />
                </div>
              )}
              {s.sub && <span className={cn('text-xs font-bold', s.subColor)}>{s.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-md text-xs font-medium hover:bg-zinc-50 transition-colors">
              <Filter className="w-3.5 h-3.5" />Filtros
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-md text-xs font-medium hover:bg-zinc-50 transition-colors">
              <Download className="w-3.5 h-3.5" />Exportar
            </button>
          </div>
          <span className="text-xs text-zinc-500 font-medium">Mostrando 1–10 de 2.481 itens</span>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-white">
              {['SKU', 'Nome do Produto', 'Quantidade', 'Localização', 'Ações'].map((h, i) => (
                <th key={h} className={cn('px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100', i === 4 && 'text-right')}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {inventoryRows.map((row) => (
              <React.Fragment key={row.sku}>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-zinc-600">{row.sku}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-100 flex-shrink-0 flex items-center justify-center">
                        <Warehouse className="w-4 h-4 text-zinc-400" />
                      </div>
                      <div>
                        <span className="font-medium text-zinc-900 block">{row.name}</span>
                        <span className="text-xs text-zinc-500">{row.sub}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={cn('font-semibold', row.critical ? 'text-red-500' : 'text-zinc-900')}>{row.qty}</span>
                      <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide', row.statusClass)}>{row.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 font-medium text-sm">{row.location}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-zinc-400 hover:text-emerald-600 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 text-zinc-400 hover:text-zinc-900 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
                {row.variations.map((v) => (
                  <tr key={v.sku} className="bg-zinc-50/30">
                    <td className="px-6 py-3 pl-12 font-mono text-[10px] text-zinc-400 italic">{v.sku}</td>
                    <td className="px-6 py-3 pl-16">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-zinc-900 flex-shrink-0" />
                        <span className="text-xs text-zinc-500">{v.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span className={cn('text-xs font-medium', v.low ? 'text-red-500' : 'text-zinc-700')}>{v.qty}</span>
                        {v.low && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                        {v.low && <span className="text-[10px] text-red-600 font-bold uppercase">Repor</span>}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-xs text-zinc-400">{v.location}</td>
                    <td className="px-6 py-3 text-right">
                      <span className="text-[10px] text-zinc-400 font-medium">SKU Individual</span>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="p-4 bg-white flex items-center justify-between border-t border-zinc-100">
          <button className="flex items-center gap-2 text-zinc-500 font-medium text-sm hover:text-zinc-900 transition-colors">
            <ChevronLeft className="w-4 h-4" />Anterior
          </button>
          <div className="flex gap-1">
            {['1','2','3','...','24'].map((p) => (
              <button key={p} className={cn('w-8 h-8 flex items-center justify-center rounded font-medium text-xs', p === '1' ? 'bg-emerald-600 text-white' : 'hover:bg-zinc-100 text-zinc-600')}>
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-zinc-500 font-medium text-sm hover:text-zinc-900 transition-colors">
            Próximo<ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Otimização Inteligente</h3>
            <p className="text-zinc-400 text-sm mb-6 max-w-sm leading-relaxed">
              Nosso algoritmo sugere realocar 45 itens do Setor A para o Setor B para reduzir o tempo de separação em 12%.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
              Ver Recomendações
            </button>
          </div>
          <Sparkles className="absolute -right-4 -bottom-4 w-28 h-28 text-white/5 pointer-events-none" />
        </div>
        <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-zinc-900">Localização do Galpão</h3>
            <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Ao Vivo</span>
          </div>
          <div className="h-40 rounded-lg bg-zinc-100 relative overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-8 gap-1 p-2 opacity-30">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="bg-zinc-300 rounded-sm" />
              ))}
            </div>
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-emerald-500 rounded-full animate-pulse border-2 border-white shadow-lg" />
            <div className="absolute bottom-1/4 right-1/2 w-4 h-4 bg-emerald-500 rounded-full animate-pulse border-2 border-white shadow-lg" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-white/90 px-2 py-1 rounded-lg text-[10px] font-bold text-zinc-700">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />2 Zonas Ativas
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-zinc-950 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50" title="Scanner QR Code">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
      </button>

      {/* Entry Dialog */}
      <Dialog open={entryDialog} onOpenChange={setEntryDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {nfStep === 1 ? 'Nova Entrada — Dados da Nota Fiscal' : 'Confirmar Produtos e Alocação'}
            </DialogTitle>
          </DialogHeader>
          {nfStep === 1 ? (
            <div className="space-y-4 mt-2">
              <p className="text-sm text-zinc-500">Insira os dados da NF para iniciar o recebimento de mercadoria.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-zinc-500 uppercase">Número da NF</label>
                  <input type="text" placeholder="Ex: 000.123.456" className="mt-1 w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500 uppercase">Fornecedor</label>
                  <input type="text" placeholder="Nome do fornecedor" className="mt-1 w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500 uppercase">Data de Recebimento</label>
                  <input type="date" className="mt-1 w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEntryDialog(false)} className="flex-1 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors">Cancelar</button>
                <button onClick={() => setNfStep(2)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-all">Próximo</button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mt-2">
              <p className="text-sm text-zinc-500">Confirme os produtos recebidos e defina as localizações.</p>
              <div className="space-y-2">
                {[{ sku: 'TSH-BLK-M', name: 'Camiseta Preta M', qty: 50 }, { sku: 'TSH-BLK-L', name: 'Camiseta Preta G', qty: 30 }].map((p) => (
                  <div key={p.sku} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900">{p.name}</p>
                      <p className="text-xs text-zinc-500 font-mono">{p.sku}</p>
                    </div>
                    <div className="text-sm font-bold text-zinc-900">{p.qty}</div>
                    <input type="text" defaultValue="A-01-01" className="w-24 px-2 py-1 border border-zinc-200 rounded text-xs font-mono focus:ring-1 focus:ring-emerald-500 outline-none" />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setNfStep(1)} className="flex-1 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors">Voltar</button>
                <button onClick={() => setEntryDialog(false)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-all">Confirmar Entrada</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
