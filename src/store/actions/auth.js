import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "/auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
        {
          method: "POST",
          data: {
            username,
            password,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);
