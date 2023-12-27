import "./App.css";
import Tasks from "./components/Tasks";
import UserInput from "./components/UserInput";
import ToDoListContextProvider from "./store/to-do-list-context.tsx";

function App() {
  return (
    <ToDoListContextProvider>
      <h1>To Do List</h1>
      <UserInput />
      <Tasks />
    </ToDoListContextProvider>
  );
}

export default App;
