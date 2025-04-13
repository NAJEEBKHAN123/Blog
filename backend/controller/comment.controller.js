
const Post = require('../model/post.model')
const Comment = require('../model/comment.model');
const { default: mongoose } = require('mongoose');


const addComment = async(req, res) =>{

    const {postId} = req.params;
    const {content} = req.body;
    
    const userId = req.user._id;

    try {
        const existsPost = await Post.findById(postId)
        if(!existsPost){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        const newComment = await Comment.create({
            content,
            user: userId,
            post: postId
        })

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: newComment
        })
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ success: false, message: "Failed to add comment" })
    }
}

const getCommentsByPost = async(req, res) =>{
    const {postId} = req.params;

    try {
      
        const comment = await Comment.find({post: postId})
        .populate('user', 'fullName email').sort({createdAt: -1})

        res.status(201).json({
            success: true,
            message: "Fetched comments successfully.",
            data: comment
        })
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Failed to fetch comments." });
    }

}

const deleteComments = async(req, res) =>{
    const {id} = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(id);
        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })

        }

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        })
    } catch (error) {
        console.error("Error deleting comments:", error);
        res.status(500).json({ success: false, message: "Failed to delete comments." });
    }

}


module.exports = {addComment, getCommentsByPost, deleteComments}