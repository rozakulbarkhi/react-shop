import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "/products/fetchProduct",
  async (id) => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_APP_BASE_URL}/products/${id}`,
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
