import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
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
  score: {
    type: Number,
    required: true,
  },
});

export default Scores = mongoose.model("Score", ScoreSchema);
