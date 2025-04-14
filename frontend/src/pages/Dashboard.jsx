import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts/getPosts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPosts(res.data.data);
      console.log(res.data.data)
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <button onClick={() => window.location.href = '/create-post'}>Create Post</button>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* <img src={post.image} alt="Post" style={{ width: '200px' }} /> */}
            <p>By: {post.author.fullName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
