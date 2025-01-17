// src/store/todoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../model/types";

//Define the state interface:
interface TodoState {
  toDoList: Task[];
  deletedList: Task[];
  isSidebarOpen: boolean;
}

//initial state is defined:
const initialState: TodoState = {
  toDoList: [],
  deletedList: [],
  isSidebarOpen: true,
};

//Create a slice with name 'todos' that Contains all reducer functions:
const todoSlice = createSlice({
  name: "todos", //Used for action type names (e.g., "todos/addItem") and Internal Redux identification
  initialState,
  reducers: {
    deleteItem(state, action: PayloadAction<number>) {
      const deletedTask = state.toDoList.find(
        (task) => task.id === action.payload
      );
      if (deletedTask) {
        state.toDoList = state.toDoList.filter(
          (task) => task.id !== action.payload
        );
        state.deletedList.push(deletedTask);
      }
    },

    editItem(state, action: PayloadAction<{ id: number; newText: string }>) {
      const currDate = new Date().toLocaleDateString();
      const currTime = new Date().toLocaleTimeString();

      state.toDoList = state.toDoList
        .map((task) =>
          task.id === action.payload.id && task.text !== action.payload.newText
            ? {
                ...task,
                text: action.payload.newText,
                date: currDate,
                time: currTime,
                edited: true,
              }
            : task
        )
        .filter((task) => task.text.trim() !== "");
    },

    addItem(state, action: PayloadAction<string>) {
      const newTask: Task = {
        id: Math.random(),
        text: action.payload,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        edited: false,
      };
      state.toDoList.push(newTask);
    },

    deleteHistoryItem(state, action: PayloadAction<number>) {
      state.deletedList = state.deletedList.filter(
        (task) => task.id !== action.payload
      );
    },

    undoHistoryItem(state, action: PayloadAction<number>) {
      const taskToUndo = state.deletedList.find(
        (task) => task.id === action.payload
      );
      if (taskToUndo) {
        state.deletedList = state.deletedList.filter(
          (task) => task.id !== action.payload
        );
        state.toDoList.push(taskToUndo);
      }
    },

    clearAll(state) {
      state.deletedList = [];
    },

    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

//exports:
//Exports action creators:
export const {
  deleteItem,
  editItem,
  addItem,
  deleteHistoryItem,
  undoHistoryItem,
  clearAll,
  toggleSidebar,
} = todoSlice.actions;

//Exports reducer for store configuration:
export default todoSlice.reducer; // this is what becomes todoReducer in your import
export const todoActions = todoSlice.actions; //export actions so that we can use them in the components
