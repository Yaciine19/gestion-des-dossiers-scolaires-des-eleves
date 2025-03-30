import { FaHome } from "react-icons/fa";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";

export const NavLinksStudent = [
    {
      icon: <FaHome />,
      to: "/dashboard-student",
      navigate: "Home",
    },
    {
      icon: <FaSchoolCircleCheck />,
      to: "/dashboard-student/attendance",
      navigate: "My Attendance",
    },
    {
      icon: <FaUserGraduate />,
      to: "/dashboard-student/bulletin",
      navigate: "My Bulletin",
    },
  ];