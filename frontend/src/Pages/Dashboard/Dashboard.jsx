import { Outlet } from "react-router";
import SideBar from "../../Components/Dashboard/SideBar";

export default function Dashboard() {
  return (
    <>
      <SideBar />
      <div className="px-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
}
