import { Outlet } from "react-router";
import SideBar from "../../Components/Dashboard/SideBar";

export default function StudentDashboard() {
  return (
    <>
      <SideBar role={"Student"} />
      <div className="px-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
}