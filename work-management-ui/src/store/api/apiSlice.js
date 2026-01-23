import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      queryFn: () => {
        let tasks = JSON.parse(localStorage.getItem("tasks"));

        // Seed data only once
        if (!tasks || tasks.length === 0) {
          localStorage.setItem("tasks", JSON.stringify(initialTasks));
          tasks = initialTasks;
        }

        return { data: tasks };
      },
    }),

    addTask: builder.mutation({
      queryFn: (newTask) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskWithId = {
          id: tasks.length + 1,
          ...newTask,
        };
        const updatedTasks = [...tasks, taskWithId];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { data: taskWithId };
      },
    }),

    updateTask: builder.mutation({
      queryFn: (updatedTask) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { data: updatedTask };
      },
    }),

    deleteTask: builder.mutation({
      queryFn: (id) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { data: id };
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;

export default apiSlice.reducer;
