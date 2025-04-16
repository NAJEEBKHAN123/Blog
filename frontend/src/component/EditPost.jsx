import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // ✅ Fetch post function (can be reused after update)
  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/getPost/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPost(res.data.data);
    } catch (err) {
      setError('Failed to load post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Initial fetch
  useEffect(() => {
    fetchPost();
  }, [id]);

  // 🔄 Input change handlers
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // ✅ Handle submit with update and refetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.put(
        `http://localhost:5000/api/posts/update/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Update response:', response.data);

      if (response.data && response.data.success) {
        // ✅ Refetch updated post to sync with server
        await fetchPost();

        alert('Post updated successfully!');
        setTimeout(() => navigate('/'), 500);
      } else {
        setError('Update failed - no data returned');
      }
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  // UI rendering
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded min-h-[200px]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
          {post.image && !imageFile && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Current Image:</p>
              <img
                src={post.image.startsWith('http') ? post.image : `http://localhost:5000${post.image}`}
                alt="Current"
                className="mt-1 h-32 object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
