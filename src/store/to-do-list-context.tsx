import { createContext, useReducer } from "react";
import { Task, TodoListContextValues } from "../model/types.tsx";

export const TodoListContext = createContext<TodoListContextValues>({
  toDoList: [],
  deletedList: [],
  onDelete: () => {},
});

interface ToDoListContextProviderProps {
  children: React.ReactNode;
}

interface ToDoListState {
  toDoList: Task[];
  deletedList: Task[];
}
type ToDoListAction = DeleteItemAction;

interface DeleteItemAction {
  type: string;
  payload: number; // Assuming payload is the ID
}

function toDoListReducer(
  state: ToDoListState,
  action: ToDoListAction
): ToDoListState {
  switch (action.type) {
    case "DELETE_ITEM": {
      let updatedToDoList = state.toDoList;
      let updatedDeletedList = state.deletedList;

      const deletedTaskToBeAddedToHistory = updatedToDoList.find(
        (task) => task.id === action.payload
      );
      if (deletedTaskToBeAddedToHistory) {
        updatedToDoList = updatedToDoList.filter(
          (task) => task.id !== deletedTaskToBeAddedToHistory.id
        );
        updatedDeletedList.push(deletedTaskToBeAddedToHistory);
      }
      return {
        ...state,
        toDoList: updatedToDoList,
        deletedList: updatedDeletedList,
      };
    }
    default: {
    }
  }

  return state;
}

export default function ToDoListContextProvider({
  children,
}: ToDoListContextProviderProps) {
  const [toDoListState, toDoListDispatch] = useReducer(toDoListReducer, {
    toDoList: [],
    deletedList: [],
  });

  function handleOnDeleteTask(id: number) {
    toDoListDispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  }
  const ctxValue = {
    toDoList: toDoListState.toDoList,
    deletedList: toDoListState.deletedList,
    onDelete: handleOnDeleteTask,
  };
  return (
    <TodoListContext.Provider value={ctxValue}>
      {children}
    </TodoListContext.Provider>
  );
}
