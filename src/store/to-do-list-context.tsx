import { createContext, useReducer } from "react";
import { Task, TodoListContextValues } from "../model/types.tsx";

export const TodoListContext = createContext<TodoListContextValues>({
  toDoList: [],
  deletedList: [],
  onDelete: () => {},
  onEdit: () => {},
});

interface ToDoListContextProviderProps {
  children: React.ReactNode;
}

interface ToDoListState {
  toDoList: Task[];
  deletedList: Task[];
}
type ToDoListAction = DeleteItemAction | EditItemAction;

interface EditItemAction {
  type: string;
  payload: {
    id: number;
    newText: string;
  };
}

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
      const deletePayload = action as DeleteItemAction;

      const deletedTaskToBeAddedToHistory = updatedToDoList.find(
        (task) => task.id === deletePayload.payload
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

    case "EDIT_ITEM": {
      let updatedToDoList = state.toDoList;
      const editPayload = action as EditItemAction;

      updatedToDoList
        .map((task) =>
          task.id === editPayload.payload.id
            ? { ...task, text: editPayload.payload.newText }
            : task
        )
        .filter((task) => task.text.trim() !== "");

      return {
        ...state,
        toDoList: updatedToDoList,
        deletedList: state.deletedList,
      };
    }
    default: {
      return state;
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

  function handleOnEditTask(id: number, newText: string) {
    toDoListDispatch({
      type: "EDIT_ITEM",
      payload: {
        id,
        newText,
      },
    });
  }

  const ctxValue = {
    toDoList: toDoListState.toDoList,
    deletedList: toDoListState.deletedList,
    onDelete: handleOnDeleteTask,
    onEdit: handleOnEditTask,
  };

  return (
    <TodoListContext.Provider value={ctxValue}>
      {children}
    </TodoListContext.Provider>
  );
}
