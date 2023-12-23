import { useRef } from "react";
import { UserInputProps } from "../model/types";

export default function UserInput({ InputReady }: UserInputProps) {
  const taskRef = useRef<HTMLInputElement | null>(null);
  function onUserInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (taskRef.current) {
      taskRef.current.value = event.target.value;
    }
  }

  function onAddToListHandler() {
    if (taskRef.current === null) return;
    if (taskRef.current.value.trim() === "") return;
    InputReady(taskRef.current.value);
    taskRef.current.value = "";
  }

  return (
    <div className="input-box">
      <input type="text" onChange={onUserInputHandler} ref={taskRef} />
      <button onClick={onAddToListHandler}>Add Task</button>
    </div>
  );
}
