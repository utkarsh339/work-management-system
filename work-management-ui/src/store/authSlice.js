import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  role: localStorage.getItem("role") || "User",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = "User";
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
