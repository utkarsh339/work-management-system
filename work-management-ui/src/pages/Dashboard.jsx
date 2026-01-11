function Dashboard({ onLogout }) {
  return (
    <>
      <h2>Dashboard</h2>
      <p>Welcome to Work Management System. You are in Dashboard Page.</p>

      <button onClick={onLogout}>Logout</button>
    </>
  );
}

export default Dashboard;
