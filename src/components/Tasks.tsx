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

function Tasks() {
  const [isInHistoryMode, setIsInHistoryMode] = useState(false);
  const { onClearAll } = useContext(TodoListContext);
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
