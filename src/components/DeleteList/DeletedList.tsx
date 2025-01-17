//import { useContext } from "react";
import DeletedTask from "../DeleteTask/DeletedTask";
//import { TodoListContext } from "../../store/to-do-list-context";
import classes from "./deletedlist.module.css";

import { todoActions } from "../../store/slices/todoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function DeletedList() {
  //const { deletedList } = useContext(TodoListContext);
  const deletedList = useSelector(
    (state: RootState) => state.todos.deletedList
  );

  return (
    <ul className={classes["deleted-list"]}>
      {deletedList.map((deletedTask, index) => (
        <DeletedTask key={index} data={deletedTask} />
      ))}
    </ul>
  );
}

export default DeletedList;
