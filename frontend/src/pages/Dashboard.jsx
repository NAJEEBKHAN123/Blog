import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/posts/getPosts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      // Sort posts by createdAt in descending order (newest first)
      const sortedPosts = res.data.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setPosts(sortedPosts);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading posts...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="dashboard container mx-auto px-14 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        <Link
          to="/create-form"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="post-card border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow hover:translate-y-[-2px]"
            >
              <Link to={`/posts/${post._id}`} className="block">
                {post.image && (
                  <img
                    src={
                      post.image.startsWith("http")
                        ? post.image
                        : `http://localhost:5000${post.image}`
                    }
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Image+Not+Available";
                    }}
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                </div>
              </Link>
              <div className="px-4 pb-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {post.author?.fullName || "Unknown Author"}
                </span>
                <span className="text-xs text-gray-400" title={new Date(post.createdAt).toLocaleString()}>
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              No posts found. Create your first post!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;