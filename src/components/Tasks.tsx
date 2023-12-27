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

function Tasks() {
  const [isInHistoryMode, setIsInHistoryMode] = useState(false);
  const deletedListComponentRef = useRef<DeletedListRef | null>(null);

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
        <ToDoList />
      ) : (
        <DeletedList ref={deletedListComponentRef} onUndo={onUndoHandler} />
      )}
    </div>
  );
}

export default Tasks;
