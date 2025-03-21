import React from "react";

export default function Input({
  placeholder,
  name,
  value,
  type = "text",
  handleChangeForm,
  error,
  ref
}) {
  return (
    <div>
      <input
        className={`font-poppins outline-none border-2 rounded-md px-4 py-3 ${
          error ? "border-red-500 text-red-500 bg-red-50" : "text-slate-500"
        } w-full focus:border-primary`}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        type={type}
        onChange={handleChangeForm}
        ref={ref}
      />
      {error && (
        <span className="text-red-500 font-poppins text-sm ml-2">{error}</span>
      )}
    </div>
  );
}
