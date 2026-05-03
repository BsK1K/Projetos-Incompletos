export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  columnId: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
}

export interface KanbanState {
  tasks: Task[];
  columns: Column[];
}
