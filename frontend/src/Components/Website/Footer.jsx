import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-primary shadow-sm w-full md:px-16">
      <div className="py-6 flex items-center justify-center">
        <span className="text-white">
          © 2025{" "}
          <Link to="/" className="font-poppins font-medium tracking-wide">
            Parent's Space
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
