import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import type {
  DragStartEvent,
  DragOverEvent,
  DropAnimation,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { Task, Column as ColumnType } from '../types';
import Column from './Column';
import Card from './Card';
import { createPortal } from 'react-dom';

interface BoardProps {
  tasks: Task[];
  columns: ColumnType[];
  onTasksChange: (tasks: Task[]) => void;
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export default function Board({ 
  tasks, 
  columns, 
  onTasksChange, 
  onAddTask, 
  onEditTask, 
  onDeleteTask 
}: BoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (!isActiveATask) return;

    // Dropping a task over another task
    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex].columnId = tasks[overIndex].columnId;
        onTasksChange(arrayMove(updatedTasks, activeIndex, overIndex));
      } else {
        onTasksChange(arrayMove(tasks, activeIndex, overIndex));
      }
    }

    // Dropping a task over a column
    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const updatedTasks = [...tasks];
      updatedTasks[activeIndex].columnId = overId as string;
      onTasksChange(arrayMove(updatedTasks, activeIndex, activeIndex));
    }
  }

  function onDragEnd() {
    setActiveTask(null);
  }

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto h-full">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <div className="flex gap-6 h-full items-start">
            {columns.map((col) => (
              <Column
                key={col.id}
                column={col}
                tasks={tasks.filter((t) => t.columnId === col.id)}
                onAddTask={onAddTask}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>

          {createPortal(
            <DragOverlay dropAnimation={dropAnimation}>
              {activeTask && (
                <Card 
                  task={activeTask} 
                  onEdit={() => {}} 
                  onDelete={() => {}} 
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
}
