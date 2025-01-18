import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Signup</h1>
      <form className="flex flex-col  gap-4">
        <input
          type="text"
          placeholder="username"
          className=" border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className=" border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className=" border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80 ">
          Sign up
        </button>
      </form>
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
