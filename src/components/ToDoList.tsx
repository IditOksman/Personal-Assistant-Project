import { useImperativeHandle, useState, forwardRef, useContext } from "react";
import { Task, ToDoListProps } from "../model/types";
import NewTask from "./NewTask";
import { TodoListContext } from "../store/to-do-list-context.tsx";

const ToDoList = forwardRef(function ToDoList(ref) {
  const { toDoList, onDelete } = useContext(TodoListContext);

  const [tasks, setTasks] = useState<Array<Task>>([]);

  function onDeleteTaskHandler(id: number) {
    onDelete(id);
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
      {toDoList.map((task, index) => (
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
