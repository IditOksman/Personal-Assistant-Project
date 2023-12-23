import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import classes from "./newtask.module.css";
import { useState } from "react";
import { NewTaskProps } from "../model/types";

export default function NewTask({ data, deleteTask, editTask }: NewTaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(data.text);

  return (
    <div className={classes.task}>
      <li>
        <div className={classes["task-text"]}>
          {isEditing ? (
            <input
              className={classes["edit-task-text"]}
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
          ) : (
            data.text
          )}
        </div>
        <div className={classes["task-icons"]}>
          <FontAwesomeIcon
            onClick={() => {
              deleteTask(data.id);
            }}
            className={classes["task-trash-icon"]}
            icon={faTrash}
          />
          {!isEditing ? (
            <FontAwesomeIcon
              className={classes["task-pen-icon"]}
              icon={faPen}
              onClick={() => {
                setIsEditing(true);
              }}
            />
          ) : (
            <FontAwesomeIcon
              className={classes["task-check-icon"]}
              icon={faCheck}
              onClick={() => {
                setIsEditing(false);
                editTask(data.id, editedTask);
              }}
            />
          )}
        </div>
      </li>
    </div>
  );
}
