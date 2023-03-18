import React, { useEffect, useState } from "react";
import styles from "../styles/modules/taskItem.module.css";
import { getClasses } from "../utils/getClasses";
import { format } from "date-fns/esm";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editTodo, deleteTodo } from "../slices/plannerSlice";
import { toast } from "react-hot-toast";
import PlannerModal from "./PlannerModal";
import CheckBoxButton from "./CheckBoxButton";

const TaskItem = ({ todo }) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
  
    const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Task deleted successfully");
    };
  
    const handleEdit = () => {
    setEditModalOpen(true);
    };

    const handleCheck = () => {
        setChecked(!checked);
        dispatch((editTodo({
            ...todo, 
            status: checked ? 'incomplete' : 'complete',
        })))
    }

    useEffect(() => {
        if (todo.status === 'complete') {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [todo.status]);

  return (
    <>
    <div className={styles.item}>
      <div className={styles.todoDetails}>
        <CheckBoxButton checked={checked} handleCheck={handleCheck} />
        <div className={styles.texts}>
          <p
            className={getClasses([
              styles.todoText,
              todo.status === "complete" && styles["todoText--completed"],
            ])}
          >
            {todo.task}
          </p>
          <p className={styles.time}>
            {format(new Date(todo.time), "MM/dd/yyyy, p")}
          </p>
        </div>
      </div>
      <div className={styles.todoActions}>
        <div
          className={styles.icon}
          onClick={handleDelete}
          onKeyDown={handleDelete}
          role="button"
          tabIndex={0}
        >
          <MdDelete />
        </div>
        <div
          className={styles.icon}
          onClick={handleEdit}
          onKeyDown={handleEdit}
          role="button"
          tabIndex={0}
        >
          <MdEdit />
        </div>
      </div>
    </div>
    <PlannerModal type="update" todo={todo} modalOpen={editModalOpen} setModalOpen={setEditModalOpen}/>
    </>
  );
}

export default TaskItem;
