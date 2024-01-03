import "./App.css";
import SideBar from "./components/SideBar.tsx";
import Tasks from "./components/Tasks";
import UserInput from "./components/UserInput";
import ToDoListContextProvider from "./store/to-do-list-context.tsx";

function App() {
  return (
    <ToDoListContextProvider>
      <div className="app-container">
        <SideBar />
        <div className="main-content">
          <h1>To Do List</h1>
          <UserInput />
          <div className="tasks">
            <Tasks />
          </div>
        </div>
      </div>
    </ToDoListContextProvider>
  );
}

export default App;
