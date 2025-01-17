// import { createContext, useReducer } from "react";
// import { Task, TodoListContextValues } from "../model/types.tsx";

// //context creation
// export const TodoListContext = createContext<TodoListContextValues>({
//   toDoList: [],
//   deletedList: [],
//   isSidebarOpen: true,
//   onToggleSidebar: () => {},
//   onDelete: () => {},
//   onEdit: () => {},
//   onAdd: () => {},
//   onDeleteHistoryTask: () => {},
//   onUndo: () => {},
//   onClearAll: () => {},
// });

// //context Provider component
// interface ToDoListContextProviderProps {
//   children: React.ReactNode;
// }

// interface ToDoListState {
//   toDoList: Task[];
//   deletedList: Task[];
//   isSidebarOpen: boolean;
// }

// interface EditItemAction {
//   type: string;
//   payload: {
//     id: number;
//     newText: string;
//   };
// }

// interface DeleteItemAction {
//   type: string;
//   payload: number; // Assuming payload is the ID
// }

// interface AddItemAction {
//   type: string;
//   payload: string; // Assuming payload is the newText
// }

// interface DeleteHistoryTaskAction {
//   type: string;
//   payload: number;
// }

// interface UndoHistoryItemAction {
//   type: string;
//   payload: number;
// }

// interface ClearAllAction {
//   type: string;
//   payload: null;
// }

// interface ToggleSidebarAction {
//   type: string;
//   payload: null;
// }

// type ToDoListAction =
//   | DeleteItemAction
//   | EditItemAction
//   | AddItemAction
//   | DeleteHistoryTaskAction
//   | UndoHistoryItemAction
//   | ClearAllAction
//   | ToggleSidebarAction;

// //A reducer function that manages the state changes in the Todo List application:

// function toDoListReducer(
//   state: ToDoListState, //current state
//   action: ToDoListAction //Action to perform
// ): ToDoListState {
//   //returns a new ToDoListState (updated version of state)
//   switch (action.type) {
//     case "DELETE_ITEM": {
//       let updatedToDoList = [...state.toDoList];
//       let updatedDeletedList = [...state.deletedList];
//       const deleteAction = action as DeleteItemAction;

//       const deletedTaskToBeAddedToHistory = updatedToDoList.find(
//         (task) => task.id === deleteAction.payload
//       );
//       if (deletedTaskToBeAddedToHistory) {
//         updatedToDoList = updatedToDoList.filter(
//           (task) => task.id !== deletedTaskToBeAddedToHistory.id
//         );
//         updatedDeletedList.push(deletedTaskToBeAddedToHistory);
//       }
//       return {
//         ...state,
//         toDoList: updatedToDoList,
//         deletedList: updatedDeletedList,
//       };
//     }

//     case "EDIT_ITEM": {
//       let updatedToDoList = [...state.toDoList];
//       const editAction = action as EditItemAction;
//       const currDate = new Date().toLocaleDateString();
//       const currTime = new Date().toLocaleTimeString();

//       updatedToDoList = updatedToDoList
//         .map((task) =>
//           task.id === editAction.payload.id &&
//           task.text !== editAction.payload.newText
//             ? {
//                 ...task,
//                 text: editAction.payload.newText,
//                 date: currDate,
//                 time: currTime,
//                 edited: true,
//               }
//             : task
//         )
//         .filter((task) => task.text.trim() !== "");

//       return {
//         ...state,
//         toDoList: updatedToDoList,
//         deletedList: state.deletedList,
//       };
//     }

//     // 5. Reducer receives the action and processes it:
//     case "ADD_ITEM": {
//       // console.log("toDoListReducer ADD_ITEM");
//       // console.log("-------ADD_ITEM Action Started-------");
//       // console.log("Current State:", state);
//       // console.log("Action Received:", action);
//       let updatedToDoList = [...state.toDoList];
//       //console.log("Initial ToDo List:", updatedToDoList);
//       const addAction = action as AddItemAction;
//       //console.log("Add Action Payload:", addAction.payload);
//       const currDate = new Date().toLocaleDateString();
//       const currTime = new Date().toLocaleTimeString();
//       //console.log("Current DateTime:", currDate, currTime);
//       //console.log("list = " + updatedToDoList);

//       // 6. Creates new task
//       const newTask: Task = {
//         id: Math.random(),
//         text: addAction.payload,
//         time: currTime,
//         date: currDate,
//         edited: false,
//       };
//       // console.log("New Task Created:", newTask);
//       // console.log("task to add = ");
//       // console.log(newTask);

//       // 7. Updates list and returns new state
//       updatedToDoList.push(newTask);
//       // console.log("Updated ToDo List:", updatedToDoList);

//       // console.log("list after add = ");
//       // console.log(updatedToDoList);
//       return {
//         ...state,
//         toDoList: updatedToDoList,
//         deletedList: state.deletedList,
//       };
//     }

//     case "DELETE_HISTORY_ITEM": {
//       let updatedDeletedList = [...state.deletedList];
//       const deleteHistoryTaskAction = action as DeleteHistoryTaskAction;

//       const deletedTaskToBeDeletedFromHistory = updatedDeletedList.find(
//         (task) => task.id === deleteHistoryTaskAction.payload
//       );
//       if (deletedTaskToBeDeletedFromHistory) {
//         updatedDeletedList = updatedDeletedList.filter(
//           (task) => task.id !== deletedTaskToBeDeletedFromHistory.id
//         );
//       }
//       return {
//         ...state,
//         toDoList: state.toDoList,
//         deletedList: updatedDeletedList,
//       };
//     }

//     case "UNDO_HISTORY_ITEM": {
//       let updatedToDoList = [...state.toDoList];
//       let updatedDeletedList = [...state.deletedList];
//       const deleteHistoryTaskAction = action as DeleteHistoryTaskAction;

//       const deletedTaskToBeDeletedFromHistory = updatedDeletedList.find(
//         (task) => task.id === deleteHistoryTaskAction.payload
//       );
//       if (deletedTaskToBeDeletedFromHistory) {
//         updatedDeletedList = updatedDeletedList.filter(
//           (task) => task.id !== deletedTaskToBeDeletedFromHistory.id
//         );
//         updatedToDoList.push(deletedTaskToBeDeletedFromHistory);
//       }
//       return {
//         ...state,
//         toDoList: updatedToDoList,
//         deletedList: updatedDeletedList,
//       };
//     }

//     case "CLEAR_ALL": {
//       return {
//         ...state,
//         toDoList: [...state.toDoList],
//         deletedList: [],
//       };
//     }

//     case "TOGGLE_SIDEBAR": {
//       let currentSideBarState = state.isSidebarOpen;
//       return {
//         ...state,
//         isSidebarOpen: !currentSideBarState,
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }

// //provider:

// export default function ToDoListContextProvider({
//   children, // the Context Provider wrapping around other components (the children)
// }: ToDoListContextProviderProps) {
//   //Inside the Provider, we set up the state management using useReducer (for complex state management similar to Redux)
//   //Creates our "storage box" with initial values:
//   const [toDoListState, toDoListDispatch] = useReducer(toDoListReducer, {
//     toDoList: [],
//     deletedList: [],
//     isSidebarOpen: true,
//   });

//   //We create handler functions: (These are like "buttons" that components can press to change the state.)

//   function handleOnDeleteTask(id: number) {
//     toDoListDispatch({
//       type: "DELETE_ITEM",
//       payload: id,
//     });
//   }

//   function handleOnEditTask(id: number, newText: string) {
//     toDoListDispatch({
//       type: "EDIT_ITEM",
//       payload: {
//         id,
//         newText,
//       },
//     });
//   }

//   //3. onAdd function (handleOnAddTask) is called(triggered) by the provider:
//   function handleOnAddTask(newText: string) {
//     console.log("handleOnAddTask");
//     //4.Dispatches the action to the reducer:
//     toDoListDispatch({
//       type: "ADD_ITEM",
//       payload: newText,
//     });
//   }

//   function handleOnDeleteHistoryTask(id: number) {
//     toDoListDispatch({
//       type: "DELETE_HISTORY_ITEM",
//       payload: id,
//     });
//   }

//   function handleOnUndo(id: number) {
//     toDoListDispatch({
//       type: "UNDO_HISTORY_ITEM",
//       payload: id,
//     });
//   }

//   function handleOnClearAll() {
//     toDoListDispatch({
//       type: "CLEAR_ALL",
//       payload: null,
//     });
//   }

//   function handleToggleSidebar() {
//     toDoListDispatch({
//       type: "TOGGLE_SIDEBAR",
//       payload: null,
//     });
//   }

//   //We package everything into ctxValue:(This is like creating a "gift package" with all the values and functions we want to share.)

//   // 8. Provider's state is updated with new values
//   const ctxValue = {
//     toDoList: toDoListState.toDoList,
//     deletedList: toDoListState.deletedList,
//     isSidebarOpen: toDoListState.isSidebarOpen,
//     onToggleSidebar: handleToggleSidebar,
//     onDelete: handleOnDeleteTask,
//     onEdit: handleOnEditTask,
//     onAdd: handleOnAddTask,
//     onDeleteHistoryTask: handleOnDeleteHistoryTask,
//     onUndo: handleOnUndo,
//     onClearAll: handleOnClearAll,
//   };

//   //Finally, we wrap everything with the Provider:(This makes all these values available to any child component.)

//   return (
//     <TodoListContext.Provider value={ctxValue}>
//       {children}
//     </TodoListContext.Provider>
//   );
// }
