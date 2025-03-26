import React from "react";

export default function SuccessAlert({ title, message, classValue }) {
  return (
    <div
      className={`fixed w-[80%] md:w-auto bottom-5 right-1/2 translate-x-1/2 md:right-5 md:translate-x-0 z-50 flex items-center font-poppins p-4 text-sm 
         text-green-600 border border-green-300 rounded-lg bg-green-50 transition-opacity duration-500 ease-in-out ${classValue}`}
      role="alert"
    >
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div>
        <span className="font-medium">{title}</span> {message}
      </div>
    </div>
  );
}
