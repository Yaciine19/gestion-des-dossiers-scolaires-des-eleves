import { Routes, Route } from "react-router";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireBack from "./Pages/Auth/RequireBack";
import Users from "./Pages/Dashboard/Users/Users";
import DashboardHome from "./Pages/Dashboard/Home/DashboardHome";
import RequireAuth from "./Pages/Auth/RequireAuth";
import Page404 from "./Pages/Auth/Page404";
import StudentHome from "./Pages/Dashboard/Home/StudentHome";
import Students from "./Pages/Dashboard/Students/Students";
import StudentDetail from "./Pages/Dashboard/Students/Student";
import Teachers from "./Pages/Dashboard/Teachers/Teachers";
import EditStudent from "./Pages/Dashboard/Students/EditStudent";
import AddStudent from "./Pages/Dashboard/Students/AddStudent";
import Teacher from "./Pages/Dashboard/Teachers/Teacher";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<Page404 />} />
      <Route element={<RequireBack />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        element={<RequireAuth allowedRole={["Admin", "Teacher", "Student"]} />}
      >
        
        {/* Admin and Teacher */}
        <Route element={<RequireAuth allowedRole={["Admin", "Teacher"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="students" element={<Students />} />
            <Route path="students/detail/:id" element={<StudentDetail />} />
            <Route path="students/edit/:id" element={<EditStudent />} />
            <Route path="students/add" element={<AddStudent />} />

            {/* Teachers */}
            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/detail/:id" element={<Teacher />} />
          </Route>
        </Route>

        {/* Student */}
        <Route element={<RequireAuth allowedRole={["Student"]} />}>
          <Route path="/home" element={<StudentHome />} />
        </Route>
      </Route>
    </Routes>
  );
}
