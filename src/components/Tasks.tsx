import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClockRotateLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ToDoList from "./ToDoList";
import DeletedList from "./DeletedList";
import { TodoListContext } from "../store/to-do-list-context";
import classes from "./tasks.module.css";

function Tasks() {
  const [isInHistoryMode, setIsInHistoryMode] = useState(false);
  const { onClearAll } = useContext(TodoListContext);
  return (
    <div className={classes["tasks-wrapper"]}>
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
            className={classes["ArrowLeft"]}
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
              onClearAll();
            }}
          />
        )}
      </div>
      {!isInHistoryMode ? <ToDoList /> : <DeletedList />}
    </div>
  );
}

export default Tasks;
