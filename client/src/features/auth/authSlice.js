import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//register a user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

//login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.log(error.response.data);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//get users posts
export const getPosts = createAsyncThunk(
  "auth/getPosts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getPosts(token);
    } catch (error) {
      console.log(error.response.data);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//subscribe to a user
export const subscribe = createAsyncThunk(
  "auth/subscribe",
  async (userid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.subscribe(userid, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//unsubscribe from a user
export const unsubscribe = createAsyncThunk(
  "auth/unsubscribe",
  async (userid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.unsubscribe(userid, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//follow to a user
export const follow = createAsyncThunk(
  "auth/follow",
  async (userid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.follow(userid, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//unfollow from a user
export const unfollow = createAsyncThunk(
  "auth/unfollow",
  async (userid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.unfollow(userid, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.posts = null;
      })
      .addCase(subscribe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.subscribedTo = action.payload.subscribedTo;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(subscribe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.posts = null;
      })
      .addCase(unsubscribe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unsubscribe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.subscribedTo = action.payload.subscribedTo;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(unsubscribe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.posts = null;
      })
      .addCase(follow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.followed = action.payload.followed;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(follow.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.posts = null;
      })
      .addCase(unfollow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.followed = action.payload.followed;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(unfollow.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.posts = null;
      });
  },
});

export default authSlice.reducer;

export const { reset } = authSlice.actions;
