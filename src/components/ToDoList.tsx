import { useContext } from "react";
import NewTask from "./NewTask";
import { TodoListContext } from "../store/to-do-list-context.tsx";
import classes from "./todolist.module.css";

function ToDoList() {
  const { toDoList } = useContext(TodoListContext);

  return (
    <ul className={classes["to-do-list"]}>
      {toDoList.map((task, index) => (
        <NewTask key={index} data={task} />
      ))}
    </ul>
  );
}
export default ToDoList;
