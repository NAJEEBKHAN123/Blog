import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch comments for the post
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/comments/${postId}`);
      setComments(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/comments/${postId}`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComments([response.data.data, ...comments]);
      setNewComment('');
      setSuccess('Comment added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
      console.error('Error adding comment:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:5000/api/comments/delete/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComments(comments.filter(comment => comment._id !== commentId));
      
      setSuccess('Comment deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
      console.error('Error deleting comment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
      
      {/* Success message */}
      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Comment form */}
      <form onSubmit={handleAddComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          disabled={loading}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading || !newComment.trim()}
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments list */}
      {loading && comments.length === 0 ? (
        <div className="text-center py-4">Loading comments...</div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">
                      {comment.user?.fullName || 'Anonymous'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-800">{comment.content}</p>
                </div>
                
                {/* Delete button (only show if user owns the comment) */}
                {comment.user?._id === JSON.parse(localStorage.getItem('user'))?._id && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={loading}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentSection;