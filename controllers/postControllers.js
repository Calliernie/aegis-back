const Post = require("../models/Post.js");

module.exports.createPost = async (req, res) => {
  // Check that none of the fields are empty at time of submission
  if (!req.body.title) {
    res.status(400).send({ message: "Title cannot be empty" });
    return;
  } else if (!req.body.description) {
    res.status(400).send({ message: "Description cannot be empty" });
    return;
  }
  // Create a post
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save().then((data) => {
      res.send(data);
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "error.",
    });
  }
};

//Get all posts
module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ Date: -1 })
      .then((data) => {
        res.status(200).send({ posts: data });
      }); //sort by date created in desc order
  } catch (error) {
    res.status(500).send({ message: error.message || "error." });
  }
};

//Gets a specific post
module.exports.getSpecificPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(req.params.postId).then((data) => {
      if (!data) {
        res.status(404).send({ message: "Post not found" });
      } else {
        res.status(200).send({ data });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "error.",
    });
  }
};

//Deletes a specific post
module.exports.deleteSpecificPost = async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.postId }).then(
      (data) => {
        if (!data) {
          res.status(404).send({
            message: "No post found with the id " + req.params.postId,
          });
        } else {
          res.status(200).send({ message: "Post deleted successfully" });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ message: error.message || "error." });
  }
};

//Updates a specific post
module.exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      {
        _id: req.params.postId,
      },
      {
        $set: { title: req.body.title },
        $set: { description: req.body.description },
        $set: { date: Date.now },
      }
    ).then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "No post found with the id " + req.params.id });
      } else {
        res.status(200).send({ message: "Post updated successfully" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "error." });
  }
};
