import DashboardLayout from "../layouts/DashboardLayout";
function Dashboard({ onLogout }) {
  return (
    <DashboardLayout onLogout={onLogout}>
      <h2>Dashboard</h2>
      <p>Welcome to Work Management System. You are in Dashboard Page.</p>
    </DashboardLayout>
  );
}

export default Dashboard;
