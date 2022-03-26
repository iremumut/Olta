import mongoose from "mongoose";

const Schema = mongoose.Schema();

const PostSchema = Schema({
  title: { Type: String, required: true },
  description: String,
  tags: [String],
  price: { type: Number, min: 0, default: 0 },
  isFree: Boolean,
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { Type: Date, default: new Date() },
  contentType: {
    type: String,
    enum: ["video", "sound", "image", "text"],
    required: true,
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
  likeCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  contentURL: { type: String, required: true },
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
});

export default PostModel = mongoose.model("Post", PostSchema);
