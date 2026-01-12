import { useState } from "react";
const initialData = [
  {
    id: 1,
    title: "Prepare Monthly Report",
    assignedBy: "Manager",
    status: "Pending",
    dueDate: "2026-01-20",
  },
  {
    id: 2,
    title: "Fix login bug",
    assignedBy: "Tech Lead",
    status: "In Progress",
    dueDate: "2026-01-12",
  },
  {
    id: 3,
    title: "Update documentation",
    assignedBy: "Admin",
    status: "Completed",
    dueDate: "2026-01-10",
  },
];

function Tasks() {
  const [tasks, setTasks] = useState(initialData);
  const [statusFilter, setStatusFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title || !assignedBy || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      title,
      assignedBy,
      status,
      dueDate,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setAssignedBy("");
    setStatus("Pending");
    setDueDate("");
  };

  const filteredTasks =
    statusFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  return (
    <>
      <h2>My Tasks</h2>
      <p>Tasks Assigned to You.</p>

      {/* FILTER SECTION */}
      <div style={styles.filterSection}>
        <label style={{ marginRight: "8px" }}>Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* CREATE TASK SECTION */}
      <form onSubmit={handleCreateTask} style={styles.form}>
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

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Assigned By</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Due Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td style={styles.td}>{task.title}</td>
              <td style={styles.td}>{task.assignedBy}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.badge,
                    ...styles[task.status.replace(" ", "")],
                  }}
                >
                  {task.status}
                </span>
              </td>

              <td style={styles.td}>{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px",
    backgroundColor: "#fff",
  },
  filterSection: {
    marginBottom: "12px",
  },
  form: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
  },
  Pending: {
    backgroundColor: "#f59e0b",
  },
  InProgress: {
    backgroundColor: "#3b82f6",
  },
  Completed: {
    backgroundColor: "#10b981",
  },
  th: {
    border: "1px solid #e5e7eb",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#f9fafb",
  },
  td: {
    border: "1px solid #e5e7eb",
    padding: "8px",
  },
};

export default Tasks;
