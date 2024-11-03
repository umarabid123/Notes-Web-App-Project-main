// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notesReducer from "./slices/notesSlice";
import commentsReducer from "./slices/commentsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    comments: commentsReducer,
  },
});

export default store;
