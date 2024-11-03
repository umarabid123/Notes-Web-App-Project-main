// src/store/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      console.log("User set in state:", action.payload);
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.loading = false;
      console.log("User cleared from state");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      console.log("Loading state set to:", action.payload);
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;

// Thunk for user registration and Firestore user creation
export const signupUser = (email, password, displayName) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      userId: user.uid,
      displayName: displayName,
      email: user.email,
      profileImage: "",
      createdAt: new Date(),
    });

    dispatch(setUser({ uid: user.uid, email: user.email, displayName }));
    console.log("User registered and added to Firestore:", user.uid);
  } catch (error) {
    console.error("Signup error:", error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for user login
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    dispatch(setUser({ uid: user.uid, email: user.email }));
    toast.success("Login successful!");
    console.log("Login successful:", user.uid);
  } catch (error) {
    toast.error(`Login Error: ${error.message}`);
    console.error("Login error:", error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for user logout
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
    console.log("Logout successful");
  } catch (error) {
    toast.error(`Logout Error: ${error.message}`);
    console.error("Logout error:", error.message);
  }
};

// Listener for authentication state change
export const initializeAuthListener = () => (dispatch) => {
  dispatch(setLoading(true));
  console.log("Setting up Firebase auth state listener");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ uid: user.uid, email: user.email }));
      console.log("Auth state changed - User logged in:", user.uid);
    } else {
      dispatch(clearUser());
      console.log("Auth state changed - User logged out");
    }
  });
};

export default userSlice.reducer;
