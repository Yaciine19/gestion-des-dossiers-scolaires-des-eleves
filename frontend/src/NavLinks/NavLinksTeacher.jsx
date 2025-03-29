import { FaHome } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";

export const NavLinksTeacher = [
    {
      icon: <FaHome />,
      to: "/dashboard-teacher",
      navigate: "Home",
    },
    {
      icon: <SiGoogleclassroom />,
      to: "/dashboard-teacher/my-class",
      navigate: "My Class",
    },
  ];