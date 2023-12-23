import { forwardRef, useImperativeHandle, useState } from "react";
import { DeletedListProps, Task } from "../model/types";
import DeletedTask from "./DeletedTask";

const DeletedList = forwardRef(function DeletedList(
  { onUndo }: DeletedListProps,
  ref
) {
  const [deletedTasks, setDeletedTasks] = useState<Array<Task>>([]);

  function onUndoDeletedTask(data: Task) {
    onUndo(data);
    setDeletedTasks((prevDeletedTasks) => {
      return prevDeletedTasks.filter(
        (deletedTask) => deletedTask.id !== data.id
      );
    });
  }

  useImperativeHandle(ref, () => {
    return {
      addTaskToDeletedList(deletedTask: Task) {
        setDeletedTasks((prevDeletedTasks) => {
          return [...prevDeletedTasks, deletedTask];
        });
      },
      clearAllDeletedList() {
        setDeletedTasks([]);
      },
    };
  });

  return (
    <ul>
      {deletedTasks.map((deletedTask, index) => (
        <DeletedTask
          key={index}
          data={deletedTask}
          undoDeletedTask={onUndoDeletedTask}
        />
      ))}
    </ul>
  );
});

export default DeletedList;
