import React from "react";

export default function StudentDetailItem({label, value, valueClass = "text-gray-800" }) {
  return (
    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="sm:text-lg font-medium text-gray-500">{label}</dt>
      <dd
        className={`mt-1 sm:text-lg ${valueClass} sm:mt-0 sm:col-span-2`}
      >
        {value}
      </dd>
    </div>
  );
}
