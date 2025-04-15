import React from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreatePostForm from "./component/CreatePostFrom";
import PostDetail from "./component/PostDetail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts/:postId" element={<PostDetail />} />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePostForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
