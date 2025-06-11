import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "./contactsOps";

interface ContactsState {
  items: { id: string; name: string; imageUrl: string }[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  items: null,
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
