import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import Approvals from "./pages/Approvals.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={() => setIsAuthenticated(false)} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/tasks"
            element={
              isAuthenticated ? (
                <Tasks onLogout={() => setIsAuthenticated(false)} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/approvals"
            element={
              isAuthenticated ? (
                <Approvals onLogout={() => setIsAuthenticated(false)} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
