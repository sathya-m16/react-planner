import React, { useEffect, useState } from "react";
import styles from "../styles/modules/modal.module.css";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Button from "./Button";
import { v4 as uuid } from "uuid";
import { addTodo, editTodo } from "../slices/plannerSlice";

function PlannerModal({ type, modalOpen, setModalOpen, todo }) {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTask(todo.task);
      setStatus(todo.status);
    } else {
      setTask("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === "") {
      toast.error("Please enter the Task name");
      return;
    }
    if (task && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            task,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task added Successfully");
      }
      if (type === "update") {
        if (todo.task !== task || todo.status !== status) {
          dispatch(editTodo({ ...todo, task, status }));
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    } 
  };
  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>
              {type === "update" ? "Update" : "Add"} Tasks
            </h1>
            <label htmlFor="task">
              Task
              <input
                type="text"
                id="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                {type === "update" ? "Update" : "Add"} Task
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default PlannerModal;
