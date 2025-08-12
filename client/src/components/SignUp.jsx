import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "guest",
  });
  const HandleSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/Signup", post, {
        withCredentials: true,
      });
      if (res.data.success) {
        alert("Sign up successful!");
        navigate("/login");
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors && errors.length > 0) {
        alert("Signup failed:\n" + errors.join("\n"));
      } else {
        console.error("Unexpected error:", err);
      }
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <>
      <main className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign-up With Details
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleSignUp();
          }}
          className="max-w-md mx-auto"
        >
          <input
            type="text"
            name="FirstName"
            value={post.FirstName}
            onChange={(e) => setPost({ ...post, FirstName: e.target.value })}
            placeholder="Enter FirstName"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="LastName"
            value={post.LastName}
            onChange={(e) => setPost({ ...post, LastName: e.target.value })}
            placeholder="Enter LastName"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            value={post.email}
            onChange={(e) => setPost({ ...post, email: e.target.value })}
            placeholder="Enter email"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            value={post.password}
            onChange={(e) => setPost({ ...post, password: e.target.value })}
            placeholder="Enter password"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={post.confirmPassword}
            onChange={(e) =>
              setPost({ ...post, confirmPassword: e.target.value })
            }
            placeholder="Enter confirm password"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Radio buttons */}
          <div className="mb-6">
            <p className="mb-2 text-gray-700 font-medium">Select User Type</p>
            <div className="flex items-center gap-6">
              <label
                htmlFor="guest"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  value="guest"
                  name="userType"
                  id="guest"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={post.userType === "guest"}
                  onChange={(e) =>
                    setPost({ ...post, userType: e.target.value })
                  }
                />
                <span className="ml-2 text-gray-800">Guest</span>
              </label>

              <label
                htmlFor="host"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  value="host"
                  name="userType"
                  id="host"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={post.userType === "host"}
                  onChange={(e) =>
                    setPost({ ...post, userType: e.target.value })
                  }
                />
                <span className="ml-2 text-gray-800">Host</span>
              </label>
            </div>
          </div>

          {/* Terms Checkbox (Optional controlled field) */}
          {/* You can create a new boolean in post state like `agreedToTerms: false` if you want */}
          <div className="mb-6 flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="form-checkbox h-4 w-4 text-blue-600"
              // Optional: use another state if you want to validate it
            />
            <label htmlFor="terms" className="text-gray-700">
              I agree to the{" "}
              <span className="text-blue-600 underline">
                terms and conditions
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </main>
    </>
  );
};

export default SignIn;
