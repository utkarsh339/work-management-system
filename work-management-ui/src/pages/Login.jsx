import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/apiSlice";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("User");
  const [loginApi, { isLoading, error }] = useLoginMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Button Clicked");
    try {
      const response = await loginApi({
        email,
        password,
      }).unwrap();

      console.log("Login Response:", response);

      onLogin({
        token: response.token,
        role: response.role,
      });

      console.log("After onLogin");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          style={styles.input}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          style={styles.input}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
        </select> */}
        {error && (
          <p style={{ color: "red", fontSize: "13px" }}>
            Invalid email or Password
          </p>
        )}

        <button style={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f6f8",
  },
  form: {
    width: "300px",
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Login;
