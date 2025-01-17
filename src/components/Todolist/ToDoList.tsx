import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Import RootState type
import NewTask from "../NewTask/NewTask";
//import { TodoListContext } from "../store/to-do-list-context.tsx";
import classes from "./todolist.module.css";

function ToDoList() {
  // 9. Any component using toDoList will automatically re-render
  // Will receive updated list and re-render
  //const { toDoList } = useContext(TodoListContext);

  // Use useSelector to get toDoList data from Redux store:
  //(RootState represents the entire Redux store structure.
  //It combines all your slice reducers and helps TypeScript understand what data is available in your store)
  const toDoList = useSelector((state: RootState) => state.todos.toDoList);

  return (
    <ul className={classes["to-do-list"]}>
      {toDoList.map((task) => (
        <NewTask key={task.id} data={task} />
      ))}
    </ul>
  );
}
export default ToDoList;
