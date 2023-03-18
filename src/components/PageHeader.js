import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.css";
import PlannerModal from "./PlannerModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slices/plannerSlice";

const PageHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus)
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  }

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Tasks
      </Button>
      <SelectButton id="status" value={filterStatus} onChange={handleFilter} >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <PlannerModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default PageHeader;
