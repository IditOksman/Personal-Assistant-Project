export interface NewTaskProps {
  data: Task;
}

export interface DeletedTaskProps {
  data: Task;
}

export interface Task {
  text: string;
  id: number;
  time: string;
  date: string;
  edited: boolean;
}

export interface TodoListContextValues {
  toDoList: Task[];
  deletedList: Task[];
  isSidebarOpen: boolean;
  // onToggleSidebar: () => void;
  // onDelete: (id: number) => void;
  // onEdit: (id: number, newText: string) => void;
  // onAdd: (newText: string) => void;
  // onDeleteHistoryTask: (id: number) => void;
  // onUndo: (id: number) => void;
  // onClearAll: () => void;
}
