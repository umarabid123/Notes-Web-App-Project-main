// src/store/slices/commentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Fetch comments for a note
export const fetchComments = createAsyncThunk("comments/fetchComments", async (noteId) => {
    const commentsSnapshot = await getDocs(collection(db, "notes", noteId, "comments"));
    return commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), noteId }));
});

// Add a comment to a note
export const addComment = createAsyncThunk("comments/addComment", async ({ noteId, text, userId }) => {
    const docRef = await addDoc(collection(db, "notes", noteId, "comments"), {
        text,
        userId,
        createdAt: new Date(),
    });
    return { id: docRef.id, text, userId, noteId };
});

const commentsSlice = createSlice({
    name: "comments",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                const noteId = action.payload[0]?.noteId;
                if (noteId) {
                    state[noteId] = action.payload; // Assign comments to the specific note ID
                }
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { noteId } = action.payload;
                if (!state[noteId]) state[noteId] = []; // Ensure comments array exists
                state[noteId].push(action.payload); // Add the new comment
            });
    },
});

export default commentsSlice.reducer;
