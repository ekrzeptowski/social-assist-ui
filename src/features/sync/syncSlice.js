import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const syncRequest = createAsyncThunk(
  "sync/syncRequest",
  async (params, ThunkAPI) => {
    const options = {
      headers: { "x-auth-token": ThunkAPI.getState().auth.token },
    };

    try {
      axios
        .post("/api/sync", "", options)
        .then((res) => {})
        .catch((error) => {
          ThunkAPI.rejectWithValue(error);
        });
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  },
);

export const syncSlice = createSlice({
  name: "sync",
  initialState: {
    isLoading: false,
    error: null,
    statusMessage: null,
    progress: null,
  },
  reducers: {
    syncChange: (state, { payload }) => {
      state.error = null;
      state.statusMessage = payload.message;
      state.progress = payload.progress || null;
    },
    syncSuccess: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.statusMessage = payload.message;
      state.progress = null;
    },
    syncFail: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncRequest.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(syncRequest.fulfilled, (state) => {
        state.error = null;
        state.isLoading = true;
        state.progress = null;
      })
      .addCase(syncRequest.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
  },
});

export const { syncChange, syncSuccess, syncFail } = syncSlice.actions;

export default syncSlice.reducer;
