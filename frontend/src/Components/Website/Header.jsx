import { Link } from "react-router";

export default function Header() {
  return (
    <header
      className="shadow-primary h-[13vh] text-white bg-primary flex justify-between items-center w-full px-5 md:px-16 fixed top-0 z-50"
    >
      <Link to="/"><h1 className="font-poppins font-bold text-xl sm:text-2xl tracking-wide">Parent's Space</h1></Link>
      <nav>
        <Link to="/login" className="border py-2 sm:py-3 px-8 sm:px-15 font-medium font-poppins transition-colors duration-200 hover:bg-white hover:text-primary ease-in">Log in</Link>
      </nav>
    </header>
  );
}

