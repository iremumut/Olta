import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    tags: [String],
    price: { type: Number, min: 0, default: 0 },
    isFree: Boolean,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //required: true,
    },
    contentType: {
      type: String,
      enum: ["video", "sound", "image", "text"],
      required: true,
    },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    contentURL: {
      type: String, //required: true
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

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
