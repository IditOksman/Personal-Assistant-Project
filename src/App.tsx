import { useRef } from "react";
import "./App.css";
import { TasksRef } from "./model/types";
import Tasks from "./components/Tasks";
import UserInput from "./components/UserInput";

function App() {
  const tasksComponentRef = useRef<TasksRef | null>(null);

  function onInputReadyHandler(input: string) {
    if (tasksComponentRef.current === null) return;
    tasksComponentRef.current.addTask(input);
  }

  return (
    <div>
      <h1>To Do List</h1>
      <UserInput InputReady={onInputReadyHandler} />
      <Tasks ref={tasksComponentRef} />
    </div>
  );
}

export default App;
