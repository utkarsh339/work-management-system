import { Link } from "react-router-dom";

function DashboardLayout({ onLogout, children }) {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h3>WMS</h3>
        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
          <Link to="/tasks" style={styles.link}>
            My Tasks
          </Link>
          <Link to="/approvals" style={styles.link}>
            Approval Requests
          </Link>
        </nav>
      </aside>
      {/* Main area */}
      <div style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <span>Work Management System</span>
          <button onClick={onLogout}>Logout</button>
        </header>
        <main style={styles.main}>{children}</main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#1f2937",
    color: "#fff",
    padding: "16px",
  },
  main: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "60px",
    backgroundColor: "#f9fafb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
    borderBottom: "1px solid #e5e7eb",
  },
  content: {
    padding: "24px",
    backgroundColor: "#f3f4f6",
    flex: 1,
    marginTop: "12px",
  },
};

export default DashboardLayout;
