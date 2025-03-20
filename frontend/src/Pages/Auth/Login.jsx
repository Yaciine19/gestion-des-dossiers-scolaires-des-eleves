import React from "react";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
    <div className="w-130 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.2)] h-auto p-6 bg-white relative overflow-hidden">
      <div className="flex flex-col justify-center items-center space-y-2">
        <h2 className="text-2xl font-poppins uppercase font-medium text-slate-700">Log in</h2>
      </div>
      <form className="w-full mt-8 space-y-8">
        <div>
          <input
            className="font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
          />
        </div>
        <div>
          <input
            className="font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
          />
        </div>
        <button
          className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins cursor-pointer"
          id="login"
          name="login"
          type="submit"
        >
          Login
        </button>
        <p className="flex justify-center space-x-1 font-poppins">
          <span className="text-slate-700"> Don't have an account? </span>
          <Link className="text-blue-500 hover:underline" to="/register">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
}
