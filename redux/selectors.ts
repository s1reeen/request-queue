import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Contact {
  id: string;
  name: string;
  imageUrl: string;
}

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectLoading = (state: RootState) => state.contacts.loading;
export const selectError = (state: RootState) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts],
  (contacts: Contact[] | null) =>
    contacts?.map(({ id, name, imageUrl }) => ({ id, name, imageUrl })) ?? null
);
