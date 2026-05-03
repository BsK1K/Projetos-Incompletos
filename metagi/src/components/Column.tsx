import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, MoreHorizontal } from 'lucide-react';
import type { Task, Column as ColumnType } from '../types';
import Card from './Card';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export default function Column({ column, tasks, onAddTask, onEditTask, onDeleteTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const taskIds = tasks.map((t) => t.id);

  return (
    <div className="flex flex-col w-full min-w-[300px] max-w-[400px] flex-shrink-0">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-sm">
            {column.title}
          </h2>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-500">
            {tasks.length}
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className="kanban-column"
      >
        <div className="flex flex-col gap-3 min-h-[50px]">
          <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <Card 
                key={task.id} 
                task={task} 
                onEdit={onEditTask} 
                onDelete={onDeleteTask} 
              />
            ))}
          </SortableContext>
        </div>

        <button
          onClick={() => onAddTask(column.id)}
          className="mt-2 flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-cyan-500 hover:border-cyan-500/50 hover:bg-cyan-50/30 dark:hover:bg-cyan-950/20 transition-all font-medium text-sm"
        >
          <Plus size={18} />
          Adicionar Tarefa
        </button>
      </div>
    </div>
  );
}
