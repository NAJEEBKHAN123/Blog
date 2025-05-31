import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle, FaFacebook } from 'react-icons/fa';


function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  
  const navigate = useNavigate()

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      
      console.log(response.data);
      alert(response.data.message);
      
      setFormData({ email: "", password: "" });
  
      // Store token correctly
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard')

      
    } catch (error) {
      console.log("Login Error:", error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 pt-24 ">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
      <h1 className="text-2xl font-bold text-center mb-4">Log in</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          Log In
        </button>
      </form>

      <p className="mt-4 text-gray-600 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
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
  )
}

export default Signin