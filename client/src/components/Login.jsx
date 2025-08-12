import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Loading from "./Loading";
const Login = () => {
  const [post, setPost] = useState({
    email: "",
    password: "",
  });
  const { setIsLoggedIn, setUserType } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/login", post, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // 👈 send cookies for session auth
      });
      // setLoading(false)
      if (res.data.success) {
        setIsLoggedIn(true);
        setUserType(res.data.user.userType); // ✅ This is required
        // navigate("/"); // or whatever route
      }
      // setIsLoggedIn(true);
      // console.log("log in ho gaya hai");
      navigate("/");
    } catch (error) {
      console.log("err while login : ", error.response?.data || error.message);
    } finally {
      setLoading(false); // <- reset loading state
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };
  if (loading) return <Loading />;

  return (
    <>
      <main className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login With Details
        </h1>
        <form
          action="/login"
          method="POST"
          className="max-w-md mx-auto"
          onSubmit={HandleOnSubmit}
        >
          {/* <%- include('../partials/err') %> */}

          <input
            type="email"
            name="email"
            placeholder="demo123@gmail.com"
            onChange={handleChange}
            // value="<% oldInput.email ? oldInput.email : '' %>"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="submit"
            value="Log-In"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          />
        </form>
      </main>
    </>
  );
};

export default Login;
