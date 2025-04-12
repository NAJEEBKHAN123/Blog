const e = require("express");
const Post = require("../model/post.model");

const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    // Use req.user.id instead of req.user._id
    const newPost = new Post({ title, content, image, author: req.user._id });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "fullName, email");
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Fetch all posts",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
    console.log("failed to fetch posts", error);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author", "fullName, email");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Failed to fetch post",
      });
    }

    res.status(201).json({
      success: true,
      message: "Fetch post successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch post" });
    console.log("failed to fetch post", error);
  }
};

const updatePosts = async (req, res) => {
  const { id } = req.params;
  try {
    const updatePost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatePost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "post update successfully",
      data: updatePost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update post" });
    console.log("failed to update post", error);
  }
};

const deletePosts = async (req, res) => {
  const { id } = req.params;

  try {
    const deletePost = await Post.findByIdAndDelete(id);
    if (!deletePost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Post delete successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete post" });
    console.log("failed to delete post", error);
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePosts, deletePosts };
