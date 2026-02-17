import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialUser = () => {
  if (typeof window !== "undefined") {
    try {
      const item = window?.localStorage.getItem("adminUser");
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }
  return null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser(),
    isAuth: false, // verified by /api/auth/me on load
  },
  reducers: {
    setAuth: (state, action) => {
      const { user, isAuth } = action.payload;
      state.user = user ?? state.user;
      state.isAuth = isAuth !== undefined ? isAuth : state.isAuth;
      if (typeof window !== "undefined" && user !== undefined) {
        if (user) window?.localStorage.setItem("adminUser", JSON.stringify(user));
        else window?.localStorage.removeItem("adminUser");
      }
    },
    handleLogin: (state, action) => {
      const { user } = action.payload || {};
      state.user = user || state.user;
      state.isAuth = true;
      if (typeof window !== "undefined" && user) {
        window?.localStorage.setItem("adminUser", JSON.stringify(user));
      }
      toast.success("Logged in successfully", {
        position: "top-right",
        autoClose: 1500,
      });
    },
    handleLogout: (state) => {
      state.user = null;
      state.isAuth = false;
      if (typeof window !== "undefined") {
        window?.localStorage.removeItem("adminUser");
      }
      toast.success("Logged out successfully", { position: "top-right" });
    },
    handleRegister: () => {
      // Admin panel: registration is disabled; admins are created in DB/seed
      toast.info("Contact administrator for access.", { position: "top-right" });
    },
  },
});

export const { setAuth, handleLogin, handleLogout, handleRegister } = authSlice.actions;
export default authSlice.reducer;
