import React from "react";

export default function Card({ title, description, date, location, audience }) {
  return (
    <div className="block w-full p-6 rounded-lg shadow-sm bg-white border-2 border-primary font-poppins">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <h5 className=" text-2xl font-semibold tracking-tight text-primary">
          {title}
        </h5>
        <p className="text-primary font-semibold">
          Audience :{" "}
          <span className="text-gray-500 font-normal">
            {audience === "Both" ? "Teachers & Students" : audience}
          </span>
        </p>
      </div>
      <p className="font-normal text-gray-500 my-2">{description}</p>
      <p className="text-gray-800 mb-2 font-semibold">
        Date : <span className="text-gray-500 font-normal">{date}</span>
      </p>
      <p className="text-gray-800 font-semibold">
        Location : <span className="text-gray-500 font-normal">{location}</span>
      </p>
    </div>
  );
}
