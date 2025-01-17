import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import classes from "./newtask.module.css";
import { useState, useRef } from "react";
import { NewTaskProps } from "../../model/types";
//import { TodoListContext } from "../store/to-do-list-context";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/slices/todoSlice";

export default function NewTask({ data }: NewTaskProps) {
  //const { onDelete, onEdit } = useContext(TodoListContext);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const taskTextRef = useRef<HTMLInputElement | null>(null);

  function onTaskTextEditHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (taskTextRef.current) {
      taskTextRef.current.value = event.target.value;
    }
  }

  const handleDelete = () => {
    dispatch(todoActions.deleteItem(data.id));
  };

  const handleEdit = () => {
    if (taskTextRef.current === null) return;
    if (taskTextRef.current.value.trim() !== "") {
      dispatch(
        todoActions.editItem({
          id: data.id,
          newText: taskTextRef.current.value,
        })
      );
      setIsEditing(false);
    }
  };

  return (
    <div className={classes.task}>
      <li>
        <div className={classes["task-text"]}>
          {isEditing ? (
            <input
              className={classes["edit-task-text"]}
              type="text"
              defaultValue={data.text}
              onChange={onTaskTextEditHandler}
              ref={taskTextRef}
            />
          ) : (
            data.text
          )}

          {data.edited ? (
            <p className={classes["last-edited"]}>
              Last edited: {data.date} at {data.time}
            </p>
          ) : (
            <div className={classes["date-time-container"]}>
              <div>{data.time}</div>
              <div>{data.date}</div>
            </div>
          )}
        </div>
        <div className={classes["task-icons"]}>
          <FontAwesomeIcon
            onClick={handleDelete}
            className={classes["task-trash-icon"]}
            icon={faTrash}
          />
          {!isEditing ? (
            <FontAwesomeIcon
              className={classes["task-pen-icon"]}
              icon={faPen}
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <FontAwesomeIcon
              className={classes["task-check-icon"]}
              icon={faCheck}
              onClick={handleEdit}
            />
          )}
        </div>
      </li>
    </div>
  );
}

//The main changes are:
//*Instead of using context functions (onDelete, onEdit), we're now dispatching Redux actions
//*The component is now completely independent of the Context API
//*The state management is handled through Redux actions and reducers
