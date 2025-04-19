import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FaEdit, FaTrash, FaComment } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";
import { ClipLoader } from 'react-spinners';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { searchQuery } = useSearch();
   

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/posts/getPosts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const sortedPosts = res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (err) {
      setError("Failed to load posts. Please try again later.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {  
      fetchPosts();
  }, [location]);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      alert("Failed to delete the post.",);
      console.log("error", error)
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color={"#3B82F6"} loading={true} size={50} />
      </div>
    );
  }
  
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="dashboard container mx-auto px-6 lg:px-40 py-24">
      <div className="flex justify-between items-center mb-8">
       
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        <Link
          to="/create-form"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post._id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <Link to={`/posts/${post._id}`}>
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
                      e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available";
                    }}
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold line-clamp-2">{post.title}</h2>
                  <p className="text-gray-700 mt-2 line-clamp-3">{post.content}</p>
                </div>
              </Link>
              <div className="px-4 pb-2 flex justify-between text-sm text-gray-500">
                <span>Author: {post.author?.fullName || "Unknown"}</span>
                <span title={new Date(post.createdAt).toLocaleString()}>
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
              <div className="px-4 pb-4 flex gap-4 mt-2">
                <Link to={`/edit-post/${post._id}`} className="text-blue-500">
                  <FaEdit />
                </Link>
                <button onClick={() => handleDelete(post._id)} className="text-red-500">
                  <FaTrash />
                </button>
                <Link to={`/posts/${post._id}`} className="text-gray-500 hover:text-blue-500">
                  <FaComment />
                </Link>
              </div>
            </div>
            
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No posts found. Try a different search!
          </div>
        )}
        
      </div>
       
  
    </div>
 
  );
}

export default Dashboard;
