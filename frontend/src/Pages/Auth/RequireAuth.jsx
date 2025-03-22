import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../../API/axios";
import { USER } from "../../API/API";
import { Navigate, Outlet, useNavigate } from "react-router";
import Loading from "../../Components/Loading";
import Page403 from "./Page403";

export default function RequireAuth({ allowedRole }) {
  const [user, setUser] = useState("");

  const cookie = Cookie();

  const token = cookie.get("parent-space");
  
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await Axios.get(`/users/${USER}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setUser(res.data.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { replace: true });
      }
    }

    fetchUser();
  }, []);

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Page403 />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
  
}
