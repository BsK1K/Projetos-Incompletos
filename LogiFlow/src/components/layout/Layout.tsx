import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Boxes, Users, BarChart3, Settings2,
  Bell, UserCircle, Zap, X, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const notifications = [
  { id: 1, type: 'warning', msg: '12 SKUs abaixo do estoque mínimo', time: '5 min atrás', read: false },
  { id: 2, type: 'success', msg: 'Pedido #ORD-9402 enviado com sucesso', time: '18 min atrás', read: false },
  { id: 3, type: 'info', msg: 'Coleta Correios confirmada para 14h', time: '1h atrás', read: true },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [unread, setUnread] = useState(2);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Pedidos', href: '/orders', icon: Package },
    { name: 'Estoque', href: '/inventory', icon: Boxes },
    { name: 'Clientes', href: '/customers', icon: Users },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
    { name: 'Configurações', href: '/settings', icon: Settings2 },
  ];

  const currentPage = navigation.find((n) => location.pathname.startsWith(n.href));

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 text-zinc-400 flex flex-col border-r border-zinc-800 hidden md:flex sticky top-0 h-screen overflow-hidden">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-800 flex-shrink-0">
          <Link
            to="/"
            className="group flex items-center gap-2.5 select-none"
            title="Voltar à home"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 group-hover:bg-emerald-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center shadow-lg shadow-emerald-900/50">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300">
              Logi<span className="text-emerald-500 group-hover:text-white transition-colors duration-300">Flow</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-zinc-800 text-white'
                    : 'hover:bg-zinc-800/60 hover:text-zinc-100'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
                )}
                <item.icon
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-colors duration-200',
                    isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-emerald-400'
                  )}
                />
                <span className="font-medium text-sm">{item.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-emerald-500/60" />}
              </Link>
            );
          })}
        </nav>

        {/* User info bottom */}
        <div className="border-t border-zinc-800 p-4 flex-shrink-0">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-800 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <UserCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-white text-xs font-semibold truncate">Admin User</p>
              <p className="text-zinc-500 text-[10px] truncate">Logistics Lead</p>
            </div>
            <Settings2 className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 ml-auto flex-shrink-0 transition-colors" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-zinc-900">
              {currentPage?.name || 'LogiFlow'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifs((v) => !v); setUnread(0); }}
                className="relative p-2 text-zinc-500 hover:text-emerald-600 hover:bg-zinc-50 rounded-lg transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                {unread > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>
              {showNotifs && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-zinc-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
                    <p className="font-semibold text-sm text-zinc-900">Notificações</p>
                    <button onClick={() => setShowNotifs(false)} className="text-zinc-400 hover:text-zinc-600 p-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="divide-y divide-zinc-50">
                    {notifications.map((n) => (
                      <div key={n.id} className={cn('px-4 py-3 flex gap-3 items-start hover:bg-zinc-50 transition-colors', !n.read && 'bg-emerald-50/40')}>
                        <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', n.type === 'warning' ? 'bg-amber-400' : n.type === 'success' ? 'bg-emerald-500' : 'bg-blue-400')} />
                        <div>
                          <p className="text-xs text-zinc-800 leading-relaxed">{n.msg}</p>
                          <p className="text-[10px] text-zinc-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-zinc-100 text-center">
                    <button className="text-xs text-emerald-600 font-medium hover:underline">Ver todas as notificações</button>
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-50 transition-all duration-200 group"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-zinc-600 group-hover:text-zinc-900 hidden sm:block">Admin</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-zinc-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
