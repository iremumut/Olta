import mongoose from "mongoose";
import { contentTypes } from "../constants.js";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: String,
    tags: [String],
    price: { type: Number, min: 0, default: 0 },
    isFree: { type: Boolean, default: true },
    updated: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator needs to be added."],
    },
    contentType: {
      type: String,
      enum: [...contentTypes],
      required: [true, "Content type needs to be added."],
    },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    contentURL: {
      type: String,
      required: [true, "Content url needs to be added"],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    likes: [
      {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
    ],

    buyers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    scores: [
      {
        type: Schema.Types.ObjectId,
        ref: "Score",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Post", PostSchema);

export default Posts;
