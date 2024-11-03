// src/store/slices/notesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from "firebase/firestore";

// Thunk to fetch all notes
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    const notesSnapshot = await getDocs(collection(db, "notes"));
    return notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Thunk to add a note
export const addNote = createAsyncThunk("notes/addNote", async ({ title, content, subject, createdBy }) => {
    // Debugging: Log data being sent
    console.log("Adding note with data:", { title, content, subject, createdBy });
    try {
        const docRef = await addDoc(collection(db, "notes"), {
            title,
            content,
            subject,
            createdBy,
            createdAt: Date.now(),  // Use timestamp
        });
        return { id: docRef.id, title, content, subject, createdBy };
    } catch (error) {
        console.error("Error adding note:", error);
        throw error;  // Re-throw the error to propagate it
    }
});

// Thunk to update a note
export const updateNote = createAsyncThunk("notes/updateNote", async ({ id, title, content }) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, { title, content, updatedAt: Date.now() });
    return { id, title, content };
});

// Thunk to delete a note
export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
    await deleteDoc(doc(db, "notes", id));
    return id;
});

const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notesList: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.fulfilled, (state, action) => {
                console.log("Fetched notes:", action.payload);
                state.notesList = action.payload;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                console.log("Added note:", action.payload);
                state.notesList.push(action.payload);
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const index = state.notesList.findIndex(note => note.id === action.payload.id);
                if (index !== -1) state.notesList[index] = action.payload;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notesList = state.notesList.filter(note => note.id !== action.payload);
            });
    },
});

export default notesSlice.reducer;
