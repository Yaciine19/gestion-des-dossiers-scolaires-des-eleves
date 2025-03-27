import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import { BiSolidUserDetail } from "react-icons/bi";
import Loading from "../Loading";
import { formatDate } from "../../utils/formatDate";
import { stringSlice } from "../../utils/StringSlice";
import { BiDetail } from "react-icons/bi";

export default function Table({
  header,
  data,
  user,
  handleDelete,
  isLoading,
  tableOf,
}) {
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
      className="bg-[#E3F2FD]/30 border-b last:border-none border-[#0D47A1] hover:bg-[#E3F2FD]"
    >
      <td className="p-6 text-center font-medium font-poppins text-blue-950 border-r border-[#0D47A1]">
        {index + 1}
      </td>
      {header.map((item2, index2) => (
        <td
          className={`p-6 text-center font-medium font-poppins relative ${
            item2.key === "status"
              ? item[item2.key] === "active"
                ? "text-green-500 capitalize"
                : "text-red-500 capitalize"
              : "text-blue-950"
          }`}
          key={index2}
        >
          {item2.key === "date"
            ? formatDate(item[item2.key])
            : item2.key === "title" ||
              item2.key === "description" ||
              item2.key === "location"
            ? stringSlice(item[item2.key], 20)
            : item[item2.key]}
        </td>
      ))}
      <td className="p-6 border-l border-[#0D47A1]">
        <div className="flex items-center justify-around w-full gap-3 ">
          <Link to={`detail/${item._id}`}>
            {tableOf ? (
              <BiDetail className="text-gray-800 text-2xl" s />
            ) : (
              <BiSolidUserDetail className="text-gray-800 text-2xl" />
            )}
          </Link>

          <Link to={`edit/${item._id}`}>
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
              <td className="text-center" colSpan={9}>
                <Loading />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                className="text-center p-6 font-poppins font-medium text-lg text-gray-800"
                colSpan={9}
              >
                No data available
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
