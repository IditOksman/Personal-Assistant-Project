import { useContext } from "react";
import NewTask from "./NewTask";
import { TodoListContext } from "../store/to-do-list-context.tsx";

function ToDoList() {
  const { toDoList } = useContext(TodoListContext);

  return (
    <ul>
      {toDoList.map((task, index) => (
        <NewTask key={index} data={task} />
      ))}
    </ul>
  );
}
export default ToDoList;
