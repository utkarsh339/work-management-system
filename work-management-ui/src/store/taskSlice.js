import { createSlice } from "@reduxjs/toolkit";

const initialTasks = [
  {
    id: 1,
    title: "Prepare monthly report",
    assignedBy: "Manager",
    status: "Pending",
    dueDate: "2026-01-15",
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

const getInitialTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : initialTasks;
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: getInitialTasks(),
  },
  reducers: {
    addTask(state, action) {
      state.list.push({
        id: state.list.length + 1,
        ...action.payload,
      });
      localStorage.setItem("tasks", JSON.stringify(state.list));
    },
    updateTask(state, action) {
      const index = state.list.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.list[index] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.list));
      }
    },
    deleteTask(state, action) {
      state.list = state.list.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.list));
    },
    clearTasks(state) {
      state.list = [];
      localStorage.removeItem("tasks");
    },
  },
});

export const { addTask, updateTask, deleteTask, clearTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
