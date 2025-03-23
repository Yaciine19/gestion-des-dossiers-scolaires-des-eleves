import axios from "axios";
import { useState } from "react";
import { BaseURL, REGISTER } from "../../API/API";
import Loading from "../../Components/Loading";
import Footer from "../../Components/Website/Footer";
import Input from "../../Components/Input";
import { Link } from "react-router";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    registrationNumber: "",
    role: "Student",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    registrationNumber: "",
    server: "",
  });

  const handleChangeForm = (e) => {
    if (errors) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (form.firstName === "") {
      newErrors.firstName = "Please enter a first name";
    }

    if (form.lastName === "") {
      newErrors.lastName = "Please enter a last name";
    }

    if (form.email === "") {
      newErrors.email = "Please enter an email";
    }

    if (form.password === "") {
      newErrors.password = "Please enter a password";
    }

    if (form.registrationNumber === "") {
      newErrors.registrationNumber = "Please enter a registration number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${BaseURL}/auth/${REGISTER}`, form);
      setIsLoading(false);
      setTimeout(() => {
        const isConfirmed = confirm(
          "Your account has been successfully created! Please wait for the administrator's approval before you can log in to the platform."
        );
        if (isConfirmed) {
          window.location.pathname = "/";
        }
      }, 300);
    } catch (error) {
      setIsLoading(false);
      if (
        error.response.status === 409 &&
        error.response.data.message.includes("User already exists")
      ) {
        setErrors({ ...errors, email: "Email is already been taken" });
      } else if (
        error.response.data.message.includes(
          "Registration number already exists"
        )
      ) {
        setErrors({
          ...errors,
          registrationNumber: "Registration number already exists",
        });
      } else {
        setErrors({ ...errors, server: "Internal Server error" });
      }
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full h-[90.1vh] flex items-center justify-center">
        <div className="w-130 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.2)] h-auto p-6 bg-white relative overflow-hidden">
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-2xl font-poppins uppercase font-medium text-slate-700">
              Sign up
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="w-full mt-8 space-y-6">
            <Input
              value={form.firstName}
              placeholder={"First name"}
              name={"firstName"}
              error={errors.firstName}
              handleChangeForm={handleChangeForm}
            />
            <Input
              value={form.lastName}
              placeholder={"Last name"}
              name={"lastName"}
              error={errors.lastName}
              handleChangeForm={handleChangeForm}
            />
            <Input
              value={form.email}
              placeholder={"Email"}
              name={"email"}
              type="email"
              error={errors.email}
              handleChangeForm={handleChangeForm}
            />
            <Input
              value={form.password}
              placeholder={"Password"}
              name={"password"}
              type="password"
              error={errors.password}
              handleChangeForm={handleChangeForm}
            />

            <Input
              value={form.registrationNumber}
              placeholder={"Registration Number"}
              name={"registrationNumber"}
              type="number"
              error={errors.registrationNumber}
              handleChangeForm={handleChangeForm}
            />
            <button
              className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins cursor-pointer"
              id="login"
              name="login"
              type="submit"
            >
              Sign up
            </button>
            <p className="flex justify-center space-x-1 font-poppins">
              <span className="text-slate-700"> Don't have an account? </span>
              <Link className="text-blue-500 hover:underline" to="/login">
                Log In
              </Link>
            </p>
            {errors.server && (
              <span className="text-red-500 font-poppins text-center block">
                {errors.server}
              </span>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
