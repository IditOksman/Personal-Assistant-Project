import { useContext, useRef } from "react";
import { TodoListContext } from "../store/to-do-list-context";

export default function UserInput() {
  const taskRef = useRef<HTMLInputElement | null>(null);

  const { onAdd } = useContext(TodoListContext);
  function onUserInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (taskRef.current) {
      taskRef.current.value = event.target.value;
    }
  }

  function onAddToListHandler() {
    if (taskRef.current === null) return;
    if (taskRef.current.value.trim() === "") return;
    onAdd(taskRef.current.value);
    taskRef.current.value = "";
  }

  return (
    <div className="input-box">
      <input type="text" onChange={onUserInputHandler} ref={taskRef} />
      <button onClick={onAddToListHandler}>Add Task</button>
    </div>
  );
}
