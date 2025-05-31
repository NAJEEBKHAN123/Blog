import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate,  } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";

function Signup() {

  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      console.log(res.data);
      alert(res.data.message);
      setFormData({ fullName: "", email: "", password: "" });
      navigate('/')

    } catch (error) {
      console.log("Signup Error:", error.res?.data);
      alert(error.res?.data?.message || "Something went wrong");
    }
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 pt-24">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4">SignUp</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Signup
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <button className="flex justify-center items-center gap-2 w-full py-2 border rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
          <FaFacebook /> Login with Facebook
        </button>
        <button className="flex justify-center items-center gap-5 w-full py-2 border rounded-md mt-2 hover:bg-gray-100 transition">
          <FaGoogle className="text-red-500" /> Login with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
