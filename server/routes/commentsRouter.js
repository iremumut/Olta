import express from "express";

const router = express.Router();

router.get("/:commentid", (req, res) => {
  res.json({ message: "get /comments/:commentid" });
});

router.post("/:postid", (req, res) => {
  res.json({ message: "post /comments/:postid" });
});

router.put("/:commentid", (req, res) => {
  res.json({ message: "put /comments/:commentid" });
});

router.delete("/:commentid", (req, res) => {
  res.json({ message: "delete /comments/:commentid" });
});

export default router;
