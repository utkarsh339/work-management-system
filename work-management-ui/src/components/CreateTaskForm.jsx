import { useState } from "react";

function CreateTaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !assignedBy || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    onCreate({
      title,
      assignedBy,
      status,
      dueDate,
    });

    setTitle("");
    setAssignedBy("");
    setStatus("Pending");
    setDueDate("");
  };
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Create Task</h3>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Assigned by"
        value={assignedBy}
        onChange={(e) => setAssignedBy(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default CreateTaskForm;
