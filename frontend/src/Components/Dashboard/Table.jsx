import React from "react";

export default function Table() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-gray-400">
        <thead className="text-gray-400 uppercase bg-gray-700">
          <tr>
            <th scope="col" className="p-6">
              Product name
            </th>
            <th scope="col" className="p-6">
              Color
            </th>
            <th scope="col" className="p-6">
              Category
            </th>
            <th scope="col" className="p-6">
              Price
            </th>
            <th scope="col" className="p-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="p-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="p-6">Silver</td>
            <td className="p-6">Laptop</td>
            <td className="p-6">$2999</td>
            <td className="p-6 text-right">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="p-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td className="p-6">White</td>
            <td className="p-6">Laptop PC</td>
            <td className="p-6">$1999</td>
            <td className="p-6 text-right">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="p-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td className="p-6">Black</td>
            <td className="p-6">Accessories</td>
            <td className="p-6">$99</td>
            <td className="p-6 text-right">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
