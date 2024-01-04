import { createContext, useReducer } from "react";
import { Task, TodoListContextValues } from "../model/types.tsx";

export const TodoListContext = createContext<TodoListContextValues>({
  toDoList: [],
  deletedList: [],
  onDelete: () => {},
  onEdit: () => {},
  onAdd: () => {},
  onDeleteHistoryTask: () => {},
  onUndo: () => {},
  onClearAll: () => {},
});

interface ToDoListContextProviderProps {
  children: React.ReactNode;
}

interface ToDoListState {
  toDoList: Task[];
  deletedList: Task[];
}

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

interface AddItemAction {
  type: string;
  payload: string; // Assuming payload is the newText
}

interface DeleteHistoryTaskAction {
  type: string;
  payload: number;
}

interface UndoHistoryItemAction {
  type: string;
  payload: number;
}

interface ClearAllAction {
  type: string;
  payload: null;
}

type ToDoListAction =
  | DeleteItemAction
  | EditItemAction
  | AddItemAction
  | DeleteHistoryTaskAction
  | UndoHistoryItemAction
  | ClearAllAction;

function toDoListReducer(
  state: ToDoListState,
  action: ToDoListAction
): ToDoListState {
  switch (action.type) {
    case "DELETE_ITEM": {
      let updatedToDoList = [...state.toDoList];
      let updatedDeletedList = [...state.deletedList];
      const deleteAction = action as DeleteItemAction;

      const deletedTaskToBeAddedToHistory = updatedToDoList.find(
        (task) => task.id === deleteAction.payload
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
      let updatedToDoList = [...state.toDoList];
      const editAction = action as EditItemAction;
      const currDate = new Date().toLocaleDateString();
      const currTime = new Date().toLocaleTimeString();

      updatedToDoList = updatedToDoList
        .map((task) =>
          task.id === editAction.payload.id &&
          task.text !== editAction.payload.newText
            ? {
                ...task,
                text: editAction.payload.newText,
                date: currDate,
                time: currTime,
                edited: true,
              }
            : task
        )
        .filter((task) => task.text.trim() !== "");

      return {
        ...state,
        toDoList: updatedToDoList,
        deletedList: state.deletedList,
      };
    }

    case "ADD_ITEM": {
      console.log("toDoListReducer ADD_ITEM");
      let updatedToDoList = [...state.toDoList];
      const addAction = action as AddItemAction;
      const currDate = new Date().toLocaleDateString();
      const currTime = new Date().toLocaleTimeString();

      console.log("list = " + updatedToDoList);

      const newTask: Task = {
        id: Math.random(),
        text: addAction.payload,
        time: currTime,
        date: currDate,
        edited: false,
      };

      console.log("task to add = ");
      console.log(newTask);

      updatedToDoList.push(newTask);

      console.log("list after add = ");
      console.log(updatedToDoList);
      return {
        ...state,
        toDoList: updatedToDoList,
        deletedList: state.deletedList,
      };
    }

    case "DELETE_HISTORY_ITEM": {
      let updatedDeletedList = [...state.deletedList];
      const deleteHistoryTaskAction = action as DeleteHistoryTaskAction;

      const deletedTaskToBeDeletedFromHistory = updatedDeletedList.find(
        (task) => task.id === deleteHistoryTaskAction.payload
      );
      if (deletedTaskToBeDeletedFromHistory) {
        updatedDeletedList = updatedDeletedList.filter(
          (task) => task.id !== deletedTaskToBeDeletedFromHistory.id
        );
      }
      return {
        ...state,
        toDoList: state.toDoList,
        deletedList: updatedDeletedList,
      };
    }

    case "UNDO_HISTORY_ITEM": {
      let updatedToDoList = [...state.toDoList];
      let updatedDeletedList = [...state.deletedList];
      const deleteHistoryTaskAction = action as DeleteHistoryTaskAction;

      const deletedTaskToBeDeletedFromHistory = updatedDeletedList.find(
        (task) => task.id === deleteHistoryTaskAction.payload
      );
      if (deletedTaskToBeDeletedFromHistory) {
        updatedDeletedList = updatedDeletedList.filter(
          (task) => task.id !== deletedTaskToBeDeletedFromHistory.id
        );
        updatedToDoList.push(deletedTaskToBeDeletedFromHistory);
      }
      return {
        ...state,
        toDoList: updatedToDoList,
        deletedList: updatedDeletedList,
      };
    }

    case "CLEAR_ALL": {
      return {
        ...state,
        toDoList: [...state.toDoList],
        deletedList: [],
      };
    }

    default: {
      return state;
    }
  }
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

  function handleOnAddTask(newText: string) {
    console.log("handleOnAddTask");
    toDoListDispatch({
      type: "ADD_ITEM",
      payload: newText,
    });
  }

  function handleOnDeleteHistoryTask(id: number) {
    toDoListDispatch({
      type: "DELETE_HISTORY_ITEM",
      payload: id,
    });
  }

  function handleOnUndo(id: number) {
    toDoListDispatch({
      type: "UNDO_HISTORY_ITEM",
      payload: id,
    });
  }

  function handleOnClearAll() {
    toDoListDispatch({
      type: "CLEAR_ALL",
      payload: null,
    });
  }

  const ctxValue = {
    toDoList: toDoListState.toDoList,
    deletedList: toDoListState.deletedList,
    onDelete: handleOnDeleteTask,
    onEdit: handleOnEditTask,
    onAdd: handleOnAddTask,
    onDeleteHistoryTask: handleOnDeleteHistoryTask,
    onUndo: handleOnUndo,
    onClearAll: handleOnClearAll,
  };

  return (
    <TodoListContext.Provider value={ctxValue}>
      {children}
    </TodoListContext.Provider>
  );
}
