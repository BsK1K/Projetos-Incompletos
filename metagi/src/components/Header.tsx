import { Layout, Calendar, BarChart3 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  totalTasks: number;
  completedTasks: number;
}

export default function Header({ totalTasks, completedTasks }: HeaderProps) {
  const date = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="w-full py-6 px-4 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500 rounded-lg text-white shadow-lg shadow-cyan-500/20">
            <Layout size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Metagi</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Sistema Kanban Ágil</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Calendar size={18} className="text-cyan-500" />
            <span className="text-sm font-medium capitalize">{date}</span>
          </div>

          <div className="flex items-center gap-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-cyan-500" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Progresso</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
            <div className="text-sm font-bold">
              <span className="text-cyan-600 dark:text-cyan-400">{completedTasks}</span>
              <span className="text-slate-400 mx-1">/</span>
              <span className="text-slate-700 dark:text-slate-200">{totalTasks}</span>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
