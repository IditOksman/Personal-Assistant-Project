import { DeletedTaskProps } from "../model/types";
import classes from "./deletedtask.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function DeletedTask({
  data,
  undoDeletedTask,
}: DeletedTaskProps) {
  return (
    <div className={classes.task}>
      <li>
        <div className={classes["task-text"]}>{data.text}</div>
      </li>
      <FontAwesomeIcon
        className={classes["undo-icon"]}
        icon={faTrashCanArrowUp}
        onClick={() => {
          undoDeletedTask(data);
        }}
      />
    </div>
  );
}
