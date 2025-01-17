import { useRef } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/slices/todoSlice";

export default function UserInput() {
  const taskRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch(); //to dispatch actions to the store

  //const { onAdd } = useContext(TodoListContext); //when used context API

  function onUserInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (taskRef.current) {
      taskRef.current.value = event.target.value;
    }
  }

  // 1. User types in input and clicks "Add Task" button
  function onAddToListHandler() {
    if (taskRef.current === null) return;
    if (taskRef.current.value.trim() === "") return;
    dispatch(todoActions.addItem(taskRef.current.value));
    //console.log("onAddToListHandler");
    // onAdd(taskRef.current.value); // 2. calls onAdd function from context
    taskRef.current.value = ""; //clear the input
  }

  return (
    <div className="input-box">
      <input type="text" onChange={onUserInputHandler} ref={taskRef} />
      <button onClick={onAddToListHandler}>Add Task</button>
    </div>
  );
}

//Visual Flow:
// User Input → onAddToListHandler → handleOnAddTask →
// toDoListDispatch → toDoListReducer → State Update →
// Context Update → Component Re-render
