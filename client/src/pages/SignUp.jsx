import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // State to store error messages
  const [successMessage, setSuccessMessage] = useState(null); // State to store success messages
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    setFormData({
      ...formData, // Correctly spread the existing state
      [e.target.id]: e.target.value, // Update the field by its ID
    });
    setError(null); // Clear error when user starts typing
    setSuccessMessage(null); // Clear success message when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the updated formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error:", errorData);
        setError(errorData.message || "An error occurred. Please try again.");
      } else {
        const data = await res.json();
        console.log("Success:", data);
        setSuccessMessage("Signup successful! Redirecting to login...");
        setFormData({ username: "", email: "", password: "" });
        setTimeout(() => {
          navigate("/sign-in"); // Redirect after showing the success message
        }, 2000); // Optional delay for UX
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          value={formData.username} // Ensure controlled input
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email} // Ensure controlled input
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password} // Ensure controlled input
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign up
        </button>
      </form>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-600 text-sm mt-2">{successMessage}</p>
      )}
      <div className="mt-5 flex gap-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
