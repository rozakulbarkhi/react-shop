import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../actions/auth";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state) => {
      const token = Cookies.get("token");
      const { user } = jwtDecode(token);
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;

        Cookies.set("token", action.payload.token, {
          expires: 1,
        });
        window.location.href = "/";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        toast.error(action.payload.data, {
          style: {
            fontSize: "14px",
          },
        });
      });
  },
});

export const { getUser, logout } = authSlice.actions;
export default authSlice.reducer;
