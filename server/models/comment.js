import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postID: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default CommentModel = mongoose.model("Comment", CommentSchema);
