const e = require("express");
const Post = require("../model/post.model");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/images/${req.file.filename}` : ""; // Get the image path

    console.log("Uploaded Image Path:", image); // Log to verify the uploaded file path

    // Create a new post with the image path
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
    const posts = await Post.find().populate("author", "fullName email");
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
    const post = await Post.findById(id).populate("author", "fullName email");
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
    const { title, content } = req.body;
    let image;

    if (req.file) {
      image = `/uploads/images/${req.file.filename}`;
    }

    const updateFields = {
      title,
      content,
    };

    if (image) {
      updateFields.image = image;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Failed to update post:", error);
    res.status(500).json({ success: false, message: "Failed to update post" });
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
const SearchPostByTitle = async (req, res) => {
  // Check for title in query parameter (GET request)
  let { title } = req.query;

  // If title is not found in query, check the request body (POST request)
  if (!title && req.body && req.body.title) {
    title = req.body.title;
  }

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title query parameter is required",
    });
  }

  try {
    const postsTitle = await Post.find({
      title: { $regex: new RegExp(title, "i") }, // Case-insensitive search
    });

    if (postsTitle.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found with that title",
      });
    }

    res.status(200).json({
      success: true,
      message: "Posts found",
      data: postsTitle,
    });
  } catch (err) {
    console.error("Error searching posts:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePosts,
  deletePosts,
  SearchPostByTitle,
};
