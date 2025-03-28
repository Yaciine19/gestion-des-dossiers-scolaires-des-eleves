import React from "react";

export default function UserListItem({ fullName, email, extraData }) {
  return (
    <li className="p-3 sm:p-4">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="shrink-0">
          <img className="w-10 h-10" src="/user.jpg" alt="user" />
        </div>
        <div className="flex-1 min-w-0">
          <p className=" font-semibold text-gray-800 truncate">
            {fullName}
          </p>
          <p className="text-sm text-gray-500 truncate">{email}</p>
        </div>
        <div className="inline-flex items-center font-medium text-primary">
          {extraData}
        </div>
      </div>
    </li>
  );
}
