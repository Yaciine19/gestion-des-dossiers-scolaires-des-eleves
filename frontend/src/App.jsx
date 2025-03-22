import { Routes, Route } from "react-router";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireBack from "./Pages/Auth/RequireBack";
import Users from "./Pages/Dashboard/Users/Users";
import DashboardHome from "./Pages/Dashboard/Home/DashboardHome";
import RequireAuth from "./Pages/Auth/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<RequireBack />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<RequireAuth allowedRole={["Admin", "Teacher"]} />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}
