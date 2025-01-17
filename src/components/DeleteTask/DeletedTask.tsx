//import { DeletedTaskProps } from "../model/types";
import classes from "./deletedtask.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
//import { useContext } from "react";
import { DeletedTaskProps } from "../../model/types";
//import { TodoListContext } from "../store/to-do-list-context";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/slices/todoSlice";

export default function DeletedTask({ data }: DeletedTaskProps) {
  //const { onUndo } = useContext(TodoListContext);
  const dispatch = useDispatch();

  const handleUndo = () => {
    dispatch(todoActions.undoHistoryItem(data.id));
  };

  return (
    <div className={classes.task}>
      <li>
        <div className={classes["task-text"]}>{data.text}</div>

        <div className={classes["task-icons"]}>
          <FontAwesomeIcon
            className={classes["undo-icon"]}
            icon={faTrashCanArrowUp}
            onClick={handleUndo}
          />
        </div>
      </li>
      <div className={classes["date-time-container"]}>
        <div>{data.time}</div>
        <div>{data.date}</div>
      </div>
    </div>
  );
}
