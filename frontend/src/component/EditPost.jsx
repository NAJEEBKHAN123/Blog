import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "", // This will be image path or URL
  });

  const [previewImage, setPreviewImage] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/getPost/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = res.data.data;
        setPost({
          title: data.title,
          content: data.content,
          image: data.image,
        });
        setPreviewImage(data.image.startsWith("http") ? data.image : `http://localhost:5000${data.image}`);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post:", err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);

      if (newImageFile) {
        formData.append("image", newImageFile);
      }

      const res = await axios.put(
        `http://localhost:5000/api/posts/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("Post updated successfully!");
        console.log("updated data", res.data.data)
        navigate("/");
      } else {
        alert("Something went wrong while updating the post.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update the post.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading post...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            rows={5}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image</label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-52 object-cover rounded mb-2"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
