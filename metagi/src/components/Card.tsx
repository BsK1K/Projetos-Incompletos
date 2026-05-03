import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit2, Trash2, Clock, MoreVertical } from 'lucide-react';
import type { Task } from '../types';

interface CardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function Card({ task, onEdit, onDelete }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const priorityColors = {
    low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    high: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  };

  const priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="kanban-card opacity-30 border-2 border-cyan-500 border-dashed min-h-[120px]"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="kanban-card group"
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
          {priorityLabels[task.priority]}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500"
            aria-label="Editar tarefa"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="p-1 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded text-rose-500"
            aria-label="Excluir tarefa"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 leading-snug">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <Clock size={12} />
          {new Date(task.createdAt).toLocaleDateString('pt-BR')}
        </div>
        
        <div className="text-slate-300 dark:text-slate-600">
          <MoreVertical size={14} />
        </div>
      </div>
    </div>
  );
}
