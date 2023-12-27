import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import classes from "./newtask.module.css";
import { useContext, useState } from "react";
import { NewTaskProps } from "../model/types";
import { TodoListContext } from "../store/to-do-list-context";

export default function NewTask({ data }: NewTaskProps) {
  const { onDelete, onEdit } = useContext(TodoListContext);
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
              onDelete(data.id);
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
                onEdit(data.id, editedTask);
              }}
            />
          )}
        </div>
      </li>
    </div>
  );
}
