export interface NewTaskProps {
  data: Task;
}

export interface Task {
  text: string;
  id: number;
}

export interface TodoListContextValues {
  toDoList: Task[];
  deletedList: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onAdd: (newText: string) => void;
}

export interface DeletedTaskProps {
  data: Task;
  undoDeletedTask: (data: Task) => void;
}

export interface TasksRef {
  addTask: (text: string) => void;
}

export interface ToDoListRef {
  addTaskToList: (newTask: Task) => void;
}

export interface DeletedListRef {
  addTaskToDeletedList: (deletedTask: Task) => void;
  clearAllDeletedList: () => void;
}

export interface DeletedListProps {
  onUndo: (taskToUndo: Task) => void;
}

export interface UserInputProps {
  InputReady: (text: string) => void;
}

export interface ToDoListProps {
  onDelete: (deletedTask: Task) => void;
}

// type newTaskData = {
//   data: string;
//   deleteTask: () => void;
// };
