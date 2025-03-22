import { Link } from "react-router";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../../API/axios";
import { USER } from "../../API/API";

export default function Header() {
  const [user, setUser] = useState("");

  const cookie = Cookie();

  const token = cookie.get("parent-space");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await Axios.get(`/users/${USER}`);
        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);
  return (
    <header className="shadow-primary h-[13vh] text-white bg-primary flex justify-between items-center w-full px-5 md:px-16 fixed top-0 z-50">
      <Link to="/">
        <h1 className="font-poppins font-bold text-xl sm:text-2xl tracking-wide">
          Parent's Space
        </h1>
      </Link>
      {token ? (
        user === "" ? (
          <nav>
            <div className="border py-2 sm:py-3 px-8 sm:px-15 font-medium font-poppins transition-colors duration-200 hover:bg-white hover:text-primary ease-in">
              Loading...
            </div>
          </nav>
        ) : user.role === "Admin" || user.role === "Teacher" ? (
          <nav>
            <Link
              to="/dashboard"
              className="border py-2 sm:py-3 px-8 sm:px-15 font-medium font-poppins transition-colors duration-200 hover:bg-white hover:text-primary ease-in"
            >
              Go To Dashboard
            </Link>
          </nav>
        ) : (
          <nav>
            <Link
              to="/home"
              className="border py-2 sm:py-3 px-8 sm:px-15 font-medium font-poppins transition-colors duration-200 hover:bg-white hover:text-primary ease-in"
            >
              Home
            </Link>
          </nav>
        )
      ) : (
        <nav>
          <Link
            to="/login"
            className="border py-2 sm:py-3 px-8 sm:px-15 font-medium font-poppins transition-colors duration-200 hover:bg-white hover:text-primary ease-in"
          >
            Log in
          </Link>
        </nav>
      )}
    </header>
  );
}
