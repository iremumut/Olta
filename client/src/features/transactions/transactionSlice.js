import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../../utils/constants";

const { ethereum } = window;

const initialState = {
  transactions: [],
  account: "",
  transactionCount: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const connectWallet = createAsyncThunk(
  "transaction/connectWallet",
  async (_, thunkAPI) => {
    try {
      if (!ethereum) return alert("Please intall metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      return accounts[0];
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

export const checkIfWalletConnected = createAsyncThunk(
  "transaction/checkWallet",
  async (_, thunkAPI) => {
    try {
      console.log(ethereum);
      if (!ethereum) return alert("Please intall metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      return accounts[0];
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

export const sendTransaction = createAsyncThunk(
  "transaction/send",
  async (transaction, thunkAPI) => {
    try {
      //console.log(ethereum);
      if (!ethereum) return alert("Please intall metamask");

      const transactionContract = createEthereumContract();

      const parsedAmount = ethers.utils.parseEther(transaction.amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: transaction.account,
            to: transaction.addressTo,
            value: parsedAmount._hex,
            gas: "0x5208",
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        transaction.addressTo,
        parsedAmount,
        transaction.postid,
        transaction.payerUserId
      );

      await transactionHash.wait();

      let transactionCount = await transactionContract.getTransactionCount();
      transactionCount = transactionCount.toNumber();
    } catch (error) {
      console.log(error);
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

export const checkIfTransactionExist = createAsyncThunk(
  "transaction/checkTransaction",
  async (_, thunkAPI) => {
    try {
      const transactionContract = createEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      return transactionCount;
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

export const getAllTransactions = createAsyncThunk(
  "transaction/getAll",
  async (_, thunkAPI) => {
    try {
      if (!ethereum) return alert("Please intall metamask");

      const transactionContract = createEthereumContract();
      const availableTransaction =
        await transactionContract.getAllTransactions();

      console.log(availableTransaction);
      return availableTransaction;
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
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.account = action.payload;
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkIfWalletConnected.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkIfWalletConnected.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.account = action.payload;
      })
      .addCase(checkIfWalletConnected.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkIfTransactionExist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkIfTransactionExist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactionCount = action.payload;
      })
      .addCase(checkIfTransactionExist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = action.payload;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
