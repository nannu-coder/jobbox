import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user: {
    email: "",
    role: "",
  },
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, thunkAPI) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return response.user.email;
  }
);

export const signinUser = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, thunkAPI) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);

export const googleSignin = createAsyncThunk("auth/googleSignin", async () => {
  const provider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, provider);

  return data.user.email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = "";
    },
    setUser: (state, action) => {
      state.user.email = action.payload;
      state.isLoading = false;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user.email = "";
        state.error = action.error.message;
      });

    builder
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user.email = "";
        state.error = action.error.message;
      });

    builder
      .addCase(googleSignin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleSignin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = action.payload;
      })
      .addCase(googleSignin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user.email = "";
        state.error = action.error.message;
      });
  },
});

export const { logout, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
