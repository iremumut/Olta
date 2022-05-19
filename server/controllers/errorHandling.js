import mongoose from "mongoose";

export const validateObjectID = (res, id) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid obejctId.");
  }
};

export const checkPostFound = (res, post) => {
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
};

export const checkUserFound = (res, user) => {
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
};

export const checkCommentFound = (res, comment) => {
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }
};
