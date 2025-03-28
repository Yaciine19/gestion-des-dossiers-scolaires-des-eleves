import React from "react";

export default function ListSkeleton() {
  return (
    <div
      className="w-full space-y-4 border border-primary divide-y divide-gray-200 rounded-lg shadow-sm animate-pulse"
    >
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex space-x-3 items-center">
          <svg
            className="w-10 h-10 text-gray-200 s"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex space-x-3 items-center">
          <svg
            className="w-10 h-10 text-gray-200 s"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex space-x-3 items-center">
          <svg
            className="w-10 h-10 text-gray-200 s"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
    </div>
  );
}
