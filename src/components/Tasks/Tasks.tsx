import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClockRotateLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ToDoList from "../Todolist/ToDoList";
import DeletedList from "../DeleteList/DeletedList";
//import { TodoListContext } from "../../store/to-do-list-context";
import classes from "./tasks.module.css";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/slices/todoSlice";

function Tasks() {
  const [isInHistoryMode, setIsInHistoryMode] = useState(false);
  // const { onClearAll } = useContext(TodoListContext);
  const dispatch = useDispatch();

  return (
    <div className={classes["tasks-wrapper"]}>
      {" "}
      <div className={classes["icon-container"]}>
        {!isInHistoryMode ? (
          <FontAwesomeIcon
            className={classes["clock-icon"]}
            icon={faClockRotateLeft}
            onClick={() => {
              setIsInHistoryMode(!isInHistoryMode);
            }}
          />
        ) : (
          <FontAwesomeIcon
            className={classes["ArrowLeft"]} //CSS Modules Syntax
            icon={faArrowLeft}
            onClick={() => {
              setIsInHistoryMode(!isInHistoryMode);
            }}
          />
        )}

        {!isInHistoryMode ? null : (
          <FontAwesomeIcon
            className={classes["clear-all-icon"]}
            icon={faTrashCan}
            onClick={() => {
              dispatch(todoActions.clearAll());
            }}
          />
        )}
      </div>
      {!isInHistoryMode ? <ToDoList /> : <DeletedList />}
    </div>
  );
}

export default Tasks;
