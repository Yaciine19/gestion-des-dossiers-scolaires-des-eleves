import React from "react";

export default function Card({ title, description, date, location, audience }) {
  return (
    <div className="block w-full p-6 border rounded-lg shadow-sm bg-gray-800 border-gray-700 hover:bg-gray-700 font-poppins">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <h5 className=" text-2xl font-semibold tracking-tight text-white">
          {title}
        </h5>
        <p className="text-white">
          Audience :{" "}
          <span className="text-gray-400">
            {audience === "Both" ? "Teachers & Students" : audience}
          </span>
        </p>
      </div>
      <p className="font-normal text-gray-400 my-2">{description}</p>
      <p className="text-white mb-2">
        Date : <span className="text-gray-400">{date}</span>
      </p>
      <p className="text-white">
        Location : <span className="text-gray-400">{location}</span>
      </p>
    </div>
  );
}
