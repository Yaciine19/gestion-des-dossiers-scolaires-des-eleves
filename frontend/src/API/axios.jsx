import Cookie from "cookie-universal";
import axios from "axios";
import { BaseURL } from "./API";

const cookie = Cookie();

const token = cookie.get("parent-space");
export const Axios = axios.create({
  baseURL: BaseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
