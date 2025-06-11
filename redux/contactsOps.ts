import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "https://6733dbe4a042ab85d1183385.mockapi.io";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message || "Failed to fetch contacts");
    }
  }
);
