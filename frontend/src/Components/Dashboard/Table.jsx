import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import { BiSolidUserDetail } from "react-icons/bi";
import Loading from "../Loading";

export default function Table({ header, data, user, handleDelete, isLoading }) {
  const currentUser = user || {
    _id: "",
  };

  // Show Header
  const showHeader = header.map((item, index) => (
    <th key={index} scope="col" className="p-6 text-center">
      {item.name}
    </th>
  ));

  // Show Data
  const showData = data.map((item, index) => (
    <tr
      key={index}
      className="bg-[#E3F2FD]/50 border-b last:border-none border-[#0D47A1] hover:bg-[#E3F2FD]"
    >
      <td className="p-6 text-center font-medium font-poppins text-blue-950 border-r border-[#0D47A1]">
        {index + 1}
      </td>
      {header.map((item2, index2) => (
        <td
          className={`p-6 text-center font-medium font-poppins ${
            item2.key === "status"
              ? item[item2.key] === "active"
                ? "text-green-400 capitalize"
                : "text-red-500 capitalize"
              : "text-blue-950"
          }`}
          key={index2}
        >
          {item[item2.key]}
        </td>
      ))}
      <td className="p-6 border-l border-[#0D47A1]">
        <div className="flex items-center justify-around w-full gap-3 ">
          {item.role === "Student" && (
            <Link to={item._id}>
              <BiSolidUserDetail className="text-gray-800 text-2xl" />
            </Link>
          )}
          <Link to={item._id}>
            <FaEdit className="text-primary text-2xl" />
          </Link>
          {currentUser._id !== item._id && (
            <MdDelete
              onClick={() => handleDelete(item._id)}
              className="text-red-500 text-2xl cursor-pointer"
            />
          )}
        </div>
      </td>
    </tr>
  ));
  return (
    <div className="relative overflow-x-auto shadow border border-[#1565C0] sm:rounded-lg mb-10">
      <table className="w-full text-left">
        <thead className="text-white font-poppins uppercase bg-[#1565C0]">
          <tr>
            <th scope="col" className="p-6 text-center">
              ID
            </th>
            {showHeader}
            <th scope="col" className="p-6 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className=" text-center" colSpan={9}>
                <Loading />
              </td>
            </tr>
          ) : (
            showData
          )}
        </tbody>
      </table>
    </div>
  );
}
