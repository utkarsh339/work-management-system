import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import CreateTaskForm from "../components/CreateTaskForm";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTask, deleteTask } from "../store/taskSlice";

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
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCreateTask = (task) => {
    dispatch(addTask(task));
    setIsModelOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    dispatch(
      updateTask({
        id: selectedTask.id,
        ...updatedTask,
      }),
    );
    setSelectedTask(null);
    setIsModelOpen(false);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks =
    statusFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  return (
    <>
      <h2>My Tasks</h2>
      <p>Tasks Assigned to You.</p>

      {/* filter section */}
      <div style={{ marginBottom: "12px" }}>
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

      {/* create task section */}
      <button onClick={() => setIsModelOpen(true)}>+ Create Task</button>
      <Modal
        isOpen={isModelOpen}
        onClose={() => {
          setIsModelOpen(false);
          setSelectedTask(null);
        }}
        title={selectedTask ? "Edit Task" : "Create Task"}
      >
        <CreateTaskForm
          initialData={selectedTask || {}}
          onSubmit={selectedTask ? handleEditTask : handleCreateTask}
        />
      </Modal>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Assigned By</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Due Date</th>
            <th style={styles.th}>Actions</th>
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
              <td style={styles.td}>
                <button
                  onClick={() => {
                    setSelectedTask(task);
                    setIsModelOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </button>
              </td>
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
