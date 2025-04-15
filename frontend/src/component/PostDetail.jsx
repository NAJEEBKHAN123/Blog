// components/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/getPost/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPost(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div className="text-center py-8">Loading post...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pt-24">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          src={post.image.startsWith('http') ? post.image : `http://localhost:5000${post.image}`}
          alt={post.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-6">{post.content}</p>
          
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Author:</span>
              <span className="font-medium">{post.author?.fullName || 'Unknown'}</span>
              <span className='pl-10 font-bold'>Date:</span>
              <span className="text-xs text-gray-400 pl-4">
             {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
             })}
      </span>
            </div>
            <Link 
              to="/"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;