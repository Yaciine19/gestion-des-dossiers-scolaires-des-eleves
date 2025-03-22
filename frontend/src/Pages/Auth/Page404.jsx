import { Link } from "react-router";

export default function Page404() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-800">
      <h1 className="text-9xl font-extrabold text-white tracking-widest font-poppins">
        404
      </h1>
      <div className="bg-primary text-white font-poppins px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5 font-poppins">
        <Link
          to={"/"}
          className="relative inline-block text-sm font-medium text-primary group active:text-blue-600 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary "></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current transition-transform hover:translate-x-0.5 hover:translate-y-0.5">
            Go Home
          </span>
        </Link>
      </button>
    </main>
  );
}
