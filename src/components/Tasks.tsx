import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { DeletedListRef, Task, ToDoListRef } from "../model/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClockRotateLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ToDoList from "./ToDoList";
import DeletedList from "./DeletedList";

const Tasks = forwardRef(function Tasks({}, ref) {
  const [isInHistoryMode, setIsInHistoryMode] = useState(false);
  const toDoListComponentRef = useRef<ToDoListRef | null>(null);
  const deletedListComponentRef = useRef<DeletedListRef | null>(null);

  function onAddHandler(taskToAdd: Task) {
    if (toDoListComponentRef.current === null) return;
    toDoListComponentRef.current.addTaskToList(taskToAdd);
  }

  function onDeleteHandler(deletedTask: Task) {
    if (deletedListComponentRef.current === null) return;
    deletedListComponentRef.current.addTaskToDeletedList(deletedTask);
  }

  function onUndoHandler(taskToUndo: Task) {
    onAddHandler(taskToUndo);
  }

  function onClearAllHandler() {
    if (deletedListComponentRef.current === null) return;
    deletedListComponentRef.current.clearAllDeletedList();
  }

  useImperativeHandle(ref, () => {
    return {
      addTask(text: string) {
        const newTask: Task = {
          text: text,
          id: Math.random(),
        };
        onAddHandler(newTask);
      },
    };
  });

  return (
    <div>
      <h2>Your Tasks:</h2>
      <div className="icon-container">
        {!isInHistoryMode ? (
          <FontAwesomeIcon
            className="clock-icon"
            icon={faClockRotateLeft}
            onClick={() => {
              setIsInHistoryMode(!isInHistoryMode);
            }}
          />
        ) : (
          <FontAwesomeIcon
            className="ArrowLeft"
            icon={faArrowLeft}
            onClick={() => {
              setIsInHistoryMode(!isInHistoryMode);
            }}
          />
        )}

        {!isInHistoryMode ? null : (
          <FontAwesomeIcon
            className="clear-all-icon"
            icon={faTrashCan}
            onClick={onClearAllHandler}
          />
        )}
      </div>
      {!isInHistoryMode ? (
        <ToDoList ref={toDoListComponentRef} onDelete={onDeleteHandler} />
      ) : (
        <DeletedList ref={deletedListComponentRef} onUndo={onUndoHandler} />
      )}
    </div>
  );
});

export default Tasks;
