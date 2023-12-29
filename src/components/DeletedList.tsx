import { useContext } from "react";
import DeletedTask from "./DeletedTask";
import { TodoListContext } from "../store/to-do-list-context";

function DeletedList() {
  const { deletedList } = useContext(TodoListContext);

  return (
    <ul>
      {deletedList.map((deletedTask, index) => (
        <DeletedTask key={index} data={deletedTask} />
      ))}
    </ul>
  );
}

export default DeletedList;
