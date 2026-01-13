function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose}>X</button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    width: "500px",
    borderRadius: "6px",
    overflow: "hidden",
  },
  header: {
    padding: "12px 16px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    padding: "16px",
  },
};

export default Modal;
