import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_APP_BASE_URL}/products`,
        {
          method: "GET",
        }
      );

      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  }
);
