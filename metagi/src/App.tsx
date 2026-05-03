import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task, Column as ColumnType } from './types';
import Header from './components/Header';
import Board from './components/Board';
import Modal from './components/Modal';

const DEFAULT_COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'A Fazer' },
  { id: 'doing', title: 'Em Progresso' },
  { id: 'done', title: 'Concluído' },
];

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('metagi-tasks', []);
  const [columns] = useState<ColumnType[]>(DEFAULT_COLUMNS);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | undefined>(undefined);

  const handleAddTask = (columnId: string) => {
    setEditingTask(null);
    setActiveColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setActiveColumnId(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing
      setTasks(tasks.map((t) => 
        t.id === editingTask.id ? { ...t, ...taskData } as Task : t
      ));
    } else {
      // Create new
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: taskData.title || '',
        description: taskData.description,
        priority: taskData.priority || 'medium',
        columnId: taskData.columnId || activeColumnId || 'todo',
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.columnId === 'done').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <Header totalTasks={totalTasks} completedTasks={completedTasks} />
      
      <main className="flex-1 flex flex-col mt-8">
        <Board
          tasks={tasks}
          columns={columns}
          onTasksChange={setTasks}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>

      <footer className="py-6 px-8 text-center text-slate-400 text-xs font-medium border-t border-slate-200 dark:border-slate-900">
        &copy; {new Date().getFullYear()} Metagi - Gestão Ágil de Tarefas
      </footer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        columnId={activeColumnId}
      />
    </div>
  );
}

export default App;
