import { useState } from "react";
const mockTasks = [
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
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTasks =
    statusFilter === "All"
      ? mockTasks
      : mockTasks.filter((task) => task.status === statusFilter);

  return (
    <>
      <h2>My Tasks</h2>
      <p>Tasks Assigned to You.</p>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ marginRight: "8px" }}>Filter By Status:</label>
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
          {filteredTasks.map((tasks) => (
            <tr key={tasks.id}>
              <td style={styles.td}>{tasks.title}</td>
              <td style={styles.td}>{tasks.assignedBy}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.badge,
                    ...styles[tasks.status.replace(" ", "")],
                  }}
                >
                  {tasks.status}
                </span>
              </td>

              <td style={styles.td}>{tasks.dueDate}</td>
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
