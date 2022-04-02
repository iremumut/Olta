import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  addres: {
    type: String,
    required: true,
  },
  sellerAddres: {
    type: String,
    required: true,
  },
  postID: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  contentURL: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  timestamp: Date,
  amount: {
    type: Number,
    required: true,
  },
});

export default TransactionModel = mongoose.model(
  "Transaction",
  TransactionSchema
);
