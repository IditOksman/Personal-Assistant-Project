import { useImperativeHandle, useState, forwardRef, useContext } from "react";
import { Task, ToDoListProps } from "../model/types";
import NewTask from "./NewTask";
import { TodoListContext } from "../store/to-do-list-context.tsx";

const ToDoList = forwardRef(function ToDoList(ref) {
  const { toDoList, onDelete, onEdit } = useContext(TodoListContext);

  function onDeleteTaskHandler(id: number) {
    onDelete(id);
  }

  function onEditTaskHandler(id: number, newText: string) {
    onEdit(id, newText);
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
