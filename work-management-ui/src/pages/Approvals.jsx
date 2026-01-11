import DashboardLayout from "../layouts/DashboardLayout";

function Approvals({ onLogout }) {
  return (
    <DashboardLayout onLogout={onLogout}>
      <h2>Approvals</h2>
      <p>This page will show Approval Requests.</p>
    </DashboardLayout>
  );
}

export default Approvals;
