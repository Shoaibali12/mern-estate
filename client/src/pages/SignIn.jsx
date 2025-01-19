import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the updated formData
      });

      if (!res.ok) {
        const errorData = await res.json();

        setError(errorData.message || "An error occurred. Please try again.");
      } else {
        const data = await res.json();

        setFormData({ email: "", password: "" });
        setTimeout(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          Sign in
        </button>
      </form>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-600 text-sm mt-2">{successMessage}</p>
      )}
      <div className="mt-5 flex gap-2">
        <p>Dont have an account</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
