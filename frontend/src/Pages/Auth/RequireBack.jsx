import Cookie from "cookie-universal";
import { Outlet } from "react-router";

export default function RequireBack() {
  const cookie = Cookie();
  const token = cookie.get("parent-space");
  return token ? window.history.back() : <Outlet />;
}
