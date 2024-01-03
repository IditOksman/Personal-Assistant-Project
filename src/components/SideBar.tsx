import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import classes from "./sidebar.module.css";
import { useContext } from "react";
import { TodoListContext } from "../store/to-do-list-context";

export default function SideBar() {
  const { toDoList, deletedList } = useContext(TodoListContext);

  return (
    <aside className={classes.sidebar}>
      <div className={classes.menuIcon}>
        <FontAwesomeIcon
          className={classes.menu}
          icon={faBars}
        ></FontAwesomeIcon>
      </div>
      <div className={classes["main-container"]}>
        <h1 className={classes.header}>To Do List</h1>
        <div className={classes.content}>
          <p>Tasks To do: {toDoList.length}</p>
          <p>Tasks completed: {deletedList.length}</p>
        </div>
      </div>
    </aside>
  );
}
