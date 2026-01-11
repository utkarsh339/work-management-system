import DashboardLayout from "../layouts/DashboardLayout";

function Tasks({ onLogout }) {
  return (
    <DashboardLayout onLogout={onLogout}>
      <h2>My Tasks</h2>
      <p>This page will show tasks assigned to the user.</p>
    </DashboardLayout>
  );
}

export default Tasks;
