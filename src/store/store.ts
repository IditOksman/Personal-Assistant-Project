import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice"; //we can name this import whatever we want

//store creation:
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    // This 'todos' key is the actual key that matters for accessing state
    //This is what matters for useSelector
    //the 'todos' key in store.ts and in todoSlice.ts typically should match for consistency, but they don't have to.
  },
});

export type RootState = ReturnType<typeof store.getState>; //This type will contain all state types from all reducers
export type AppDispatch = typeof store.dispatch;
