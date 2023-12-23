import { useImperativeHandle, useState, forwardRef } from "react";
import { Task, ToDoListProps } from "../model/types";
import NewTask from "./NewTask";

const ToDoList = forwardRef(function ToDoList(
  { onDelete }: ToDoListProps,
  ref
) {
  const [tasks, setTasks] = useState<Array<Task>>([]);

  function onDeleteTaskHandler(id: number) {
    const deletedTaskToBeAddedToHistory = tasks.find((task) => task.id === id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    if (deletedTaskToBeAddedToHistory) {
      onDelete(deletedTaskToBeAddedToHistory);
    }
  }

  function onEditTaskHandler(id: number, newText: string) {
    setTasks((prevTasks) =>
      prevTasks
        .map((task) => (task.id === id ? { ...task, text: newText } : task))
        .filter((task) => task.text.trim() !== "")
    );
  }

  useImperativeHandle(ref, () => {
    return {
      addTaskToList(newTask: Task) {
        setTasks((prevTasks) => {
          return [...prevTasks, newTask];
        });
      },
    };
  });

  return (
    <ul>
      {tasks.map((task, index) => (
        <NewTask
          key={index}
          data={task}
          deleteTask={onDeleteTaskHandler}
          editTask={onEditTaskHandler}
        />
      ))}
    </ul>
  );
});
export default ToDoList;
