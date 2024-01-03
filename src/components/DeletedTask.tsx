import { DeletedTaskProps } from "../model/types";
import classes from "./deletedtask.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { TodoListContext } from "../store/to-do-list-context";

export default function DeletedTask({ data }: DeletedTaskProps) {
  const { onUndo } = useContext(TodoListContext);
  return (
    <div className={classes.task}>
      <li>
        <div className={classes["task-text"]}>{data.text}</div>

        <div className={classes["task-icons"]}>
          <FontAwesomeIcon
            className={classes["undo-icon"]}
            icon={faTrashCanArrowUp}
            onClick={() => {
              onUndo(data.id);
            }}
          />
        </div>
      </li>
    </div>
  );
}
