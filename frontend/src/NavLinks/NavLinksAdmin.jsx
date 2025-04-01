import { MdSpaceDashboard } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { GiBookmarklet } from "react-icons/gi";

export const NavLinksAdmin = [
  {
    icon: <MdSpaceDashboard />,
    to: "/dashboard",
    navigate: "Dashboard",
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
    icon: <SiGoogleclassroom />,
    to: "/dashboard/classes",
    navigate: "Classes",
  },
  {
    icon: <GiBookmarklet />,
    to: "/dashboard/subjects",
    navigate: "Subjects",
  },
  {
    icon: <MdEventAvailable />,
    to: "/dashboard/events",
    navigate: "Events",
  },
  {
    icon: <PiExam />,
    to: "/dashboard/exams",
    navigate: "Exams",
  },
];
