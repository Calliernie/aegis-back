const express = require("express");
const postRouter = express.Router();

postRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

const {
  createPost,
  getAllPosts,
  getSpecificPost,
  deleteSpecificPost,
  updatePost,
} = require("../controllers/postControllers");

postRouter.post("/create", createPost);
postRouter.get("/get-all-posts", getAllPosts);
postRouter.get("/get-specific-post/:id", getSpecificPost);
postRouter.put("/update-post/:id", updatePost);
postRouter.delete("/delete-post/:id", deleteSpecificPost);

module.exports = postRouter;
