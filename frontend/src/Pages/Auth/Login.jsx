import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import Cookie from "cookie-universal";
import axios from "axios";
import { BaseURL, LOGIN } from "../../API/API";
import Loading from "../../Components/Loading";
import Footer from "../../Components/Website/Footer";
import Input from "../../Components/Input";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);

  const navigation = useNavigate();

  // cookie
  const cookie = Cookie();

  const handleChangeForm = (e) => {
    if (error) {
      setError("");
    }
    if (errors) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (form.email === "") {
      newErrors.email = "Please enter your email";
    }

    if (form.password === "") {
      newErrors.password = "Please enter your password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${BaseURL}/auth/${LOGIN}`, form);
      setIsLoading(false);
      const token = res.data.data.token;
      cookie.set("parent-space", token);
      const role = res.data.data.user.role;
      if (role === "Admin") {
        navigation("/dashboard");
      } else {
        navigation("/");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 404 || error.response.status === 401) {
        setError("Wrong Email or Password");
      } else if (error.response.status === 403) {
        setError(error.response.data.message);
      } else {
        setError("Internal Server error");
      }
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full flex h-[90.1vh] items-center justify-center">
        <div className="w-130 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.2)] h-auto p-6 bg-white relative overflow-hidden">
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-2xl font-poppins uppercase font-medium text-slate-700">
              Log in
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="w-full mt-8 space-y-8">
            <Input
              value={form.email}
              placeholder={"Email"}
              name={"email"}
              type="email"
              error={errors.email}
              handleChangeForm={handleChangeForm}
              ref={emailRef}
            />
            <Input
              value={form.password}
              placeholder={"Password"}
              name={"password"}
              type="password"
              error={errors.password}
              handleChangeForm={handleChangeForm}
            />
            <button
              className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins cursor-pointer"
              id="login"
              name="login"
              type="submit"
            >
              Login
            </button>
            <p className="flex justify-center space-x-1 font-poppins">
              <span className="text-slate-700"> Don't have an account? </span>
              <Link className="text-blue-500 hover:underline" to="/register">
                Sign Up
              </Link>
            </p>

            {error !== "" && (
              <span className="text-red-500 font-poppins text-center block">
                {error}
              </span>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
