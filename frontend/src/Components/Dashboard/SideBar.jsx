import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, Outlet } from "react-router";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const NavItems = [
  {
    icon: <MdSpaceDashboard />,
    to: "/dashboard",
    navigate: "Dashboard",
  },
  {
    icon: <FaUsers />,
    to: "/dashboard/users",
    navigate: "Users",
  },
];

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const asideRef = useRef(null);

  const handleClick = () => {
    setIsOpen(true);
  };
  
  const showNavItems = NavItems.map((item, index) => (
    <li key={index}>
      <Link
        to={item.to}
        className="flex items-center py-2 px-3 rounded-sm text-white hover:bg-gray-700 group"
      >
        <span className="shrink-0 text-2xl text-gray-400 transition duration-75 group-hover:text-white">
          {item.icon}
        </span>
        <span className="ms-3 font-poppins">{item.navigate}</span>
      </Link>
    </li>
  ));

  useEffect(() => {
    function handleClickOutside(e) {
      if (asideRef.current && !asideRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
      >
        <IoMenu className="text-4xl text-primary" />
      </button>

      <aside
        ref={asideRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <Link
            to={"/dashboard"}
            className="flex items-center py-3  px-2.5 mb-5"
          >
            <span className="self-center text-2xl font-poppins font-semibold whitespace-nowrap dark:text-white">
              Parent's <span className="text-primary">Space</span>
            </span>
          </Link>
          <ul className="space-y-2 font-medium">{showNavItems}</ul>
        </div>
      </aside>
    </>
  );
}
