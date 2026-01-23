import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import Approvals from "./pages/Approvals.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.js";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => dispatch(login())} />}
          />
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                onLogout={() => dispatch(logout())}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/approvals" element={<Approvals />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
