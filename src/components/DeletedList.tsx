import { useContext } from "react";
import DeletedTask from "./DeletedTask";
import { TodoListContext } from "../store/to-do-list-context";
import classes from "./deletedlist.module.css";

function DeletedList() {
  const { deletedList } = useContext(TodoListContext);

  return (
    <ul className={classes["deleted-list"]}>
      {deletedList.map((deletedTask, index) => (
        <DeletedTask key={index} data={deletedTask} />
      ))}
    </ul>
  );
}

export default DeletedList;
