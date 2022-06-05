import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../../utils/constants";

const { ethereum } = window;

const initialState = {
  transactions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
});

export const { reset } = postSlice.actions;
export default transactionSlice.reducer;
