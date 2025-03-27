import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import axios from "axios";
import { BaseURL, SIGN_OUT } from "../../API/API";
import Cookie from "cookie-universal";

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
  {
    icon: <PiStudentBold />,
    to: "/dashboard/students",
    navigate: "Students",
  },
  {
    icon: <FaChalkboardTeacher />,
    to: "/dashboard/teachers",
    navigate: "Teachers",
  },
  {
    icon: <MdEventAvailable />,
    to: "/dashboard/events",
    navigate: "Events",
  },
];

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const asideRef = useRef(null);

  // Cookie
  const cookie = Cookie();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await axios.post(`${BaseURL}/auth/${SIGN_OUT}`);
      cookie.remove("parent-space");
      window.location.pathname = "/login"
    } catch (error) {
      console.log(error);
    }
  }

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
        <div className="h-full px-3 py-4 overflow-y-auto  bg-gray-800 border">
          <Link
            to={"/dashboard"}
            className="flex items-center py-3  px-2.5 mb-5"
          >
            <span className="self-center text-2xl font-poppins font-semibold whitespace-nowrap dark:text-white">
              Parent's <span className="text-primary">Space</span>
            </span>
          </Link>
          <div className="h-[88%] flex flex-col justify-between">
            <ul className="space-y-2 font-medium">{showNavItems}</ul>

            <div onClick={handleSignOut} className="flex items-center py-2 px-3 rounded-sm text-white hover:bg-gray-700 group cursor-pointer">
              <span className="shrink-0 text-2xl text-red-500 transition duration-75 ">
                <BiLogOut />
              </span>
              <span className="ms-3 font-poppins">Sign Out</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
