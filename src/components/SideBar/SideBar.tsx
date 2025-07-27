import { useSelector } from "react-redux";
import classes from "./sidebar.module.css";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
//import { useContext } from "react";
//import { TodoListContext } from "../store/to-do-list-context";

export default function SideBar() {
  const navigate = useNavigate();

  const { toDoList, deletedList } = useSelector(
    (state: RootState) => state.todos
  );

  function handleOnclickNewsButton() {
    navigate("/News");
  }

  return (
    <div>
      <button
        className={classes["newsButton"]}
        onClick={handleOnclickNewsButton}
      >
        News
      </button>
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
