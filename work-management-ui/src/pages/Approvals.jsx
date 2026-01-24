import {
  useGetApprovalsQuery,
  useApproveApprovalMutation,
  useRejectApprovalMutation,
} from "../store/api/apiSlice";

function Approvals() {
  const { data: approvals = [], isLoading } = useGetApprovalsQuery();
  const [approveApproval] = useApproveApprovalMutation();
  const [rejectApproval] = useRejectApprovalMutation();

  if (isLoading) {
    return <p>Loading approvals...</p>;
  }
  return (
    <>
      <h1>Approvals</h1>
      <p>Requests awaiting your action</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Requested By</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Requested Date</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {approvals.map((approval) => (
            <tr key={approval.id}>
              <td style={styles.td}>{approval.title}</td>
              <td style={styles.td}>{approval.requestedBy}</td>
              <td style={styles.td}>
                <span style={{ ...styles.badge, ...styles[approval.status] }}>
                  {approval.status}
                </span>
              </td>
              <td style={styles.td}>{approval.requestedDate}</td>
              <td style={styles.td}>
                {approval.status === "Pending" && (
                  <>
                    <button onClick={() => approveApproval(approval.id)}>
                      Approve
                    </button>
                    <button
                      onClick={() => rejectApproval(approval.id)}
                      style={{ marginLeft: "8px" }}
                    >
                      Reject
                    </button>
                  </>
                )}
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
  th: {
    border: "1px solid #e5e7eb",
    padding: "8px",
    backgroundColor: "#f9fafb",
    textAlign: "left",
  },
  td: {
    border: "1px solid #e5e7eb",
    padding: "8px",
  },
  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#fff",
    fontWeight: "bold",
  },
  Pending: {
    backgroundColor: "#f59e0b",
  },
  Approved: {
    backgroundColor: "#10b981",
  },
  Rejected: {
    backgroundColor: "#ef4444",
  },
};

export default Approvals;
