import { useSelector } from "react-redux";
import classes from "./sidebar.module.css";
import { RootState } from "../../store/store";
//import { useContext } from "react";
//import { TodoListContext } from "../store/to-do-list-context";

export default function SideBar() {
  //const { toDoList, deletedList } = useContext(TodoListContext);
  const { toDoList, deletedList } = useSelector(
    (state: RootState) => state.todos
  );

  return (
    <div>
      <aside className={classes.sidebar}>
        <div className={classes["main-sidebar-container"]}>
          <h1 className={classes.header}>To Do List</h1>
          <div className={classes.content}>
            <p>Tasks To do: {toDoList.length}</p>
            <p>Tasks completed: {deletedList.length}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
