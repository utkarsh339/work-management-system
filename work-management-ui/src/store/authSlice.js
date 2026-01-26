import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  role: localStorage.getItem("role") || "User",
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.token;

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = "User";
      state.token = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
