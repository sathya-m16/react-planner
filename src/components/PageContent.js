import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import styles from '../styles/modules/app.module.css';

function PageContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const sortedTaskList = [...todoList];
  sortedTaskList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filterTodoList = sortedTaskList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <div className={styles.content__wrapper}>
      {filterTodoList && filterTodoList.length > 0
        ? filterTodoList.map((todo) => <TaskItem key={todo.id} todo={todo} />)
        : "No task found"}
    </div>
  );
}

export default PageContent;
