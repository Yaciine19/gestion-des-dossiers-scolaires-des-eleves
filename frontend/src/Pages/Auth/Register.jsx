import React from "react";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
    <div className="w-130 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.2)] h-auto p-6 bg-white relative overflow-hidden">
      <div className="flex flex-col justify-center items-center space-y-2">
        <h2 className="text-2xl font-poppins uppercase font-medium text-slate-700">Sign up</h2>
      </div>
      <form className="w-full mt-8 space-y-6">
        <div>
          <input
            className="font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary"
            placeholder="First name"
            id="firstName"
            name="firstName"
            type="text"
          />
        </div>
        <div>
          <input
            className="font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary"
            placeholder="Last name"
            id="lastName"
            name="lastName"
            type="text"
          />
        </div>
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
        <div>
          <input
            className="font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary"
            placeholder="Registration number"
            id="registrationNumber"
            name="registrationNumber"
            type="number"
          />
        </div>
        <button
          className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins cursor-pointer"
          id="login"
          name="login"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
    </div>
  );
}

