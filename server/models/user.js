import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String, maxlength: 250 },
    metaMaskAccount: String,
    birthday: Date,
    profilePicture: String,
    subscriptionAmount: { type: Number, default: 0 },
    openSubscription: Boolean,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    purchasedContent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    likedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    followed: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    subscribedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
