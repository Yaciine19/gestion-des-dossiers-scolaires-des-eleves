import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Axios } from "../../../API/axios";
import { STUDENTS } from "../../../API/API";
import Input from "../../../Components/Input";
import { MdAssignmentAdd } from "react-icons/md";

export default function EditStudent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    isActive: "",
    classId: "",
    registrationNumber: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await Axios.get(`/users/${STUDENTS}/${id}`);
        setForm(res.data.data);
        setIsDisabled(false);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStudent();
  }, [id]);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await Axios.put(`users/${STUDENTS}/${id}`, form);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const isFormValid = Object.values(form).every((value) => value !== "");
    setIsDisabled(!isFormValid);
  }, [form]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Student Profile
      </h1>
      <>
        {/* {isLoading && <Loading />} */}
        <div className="w-full mb-10">
          <div className="rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.2)] h-auto p-6 bg-white relative overflow-hidden">
            <form onSubmit={handleOnSubmit} className="w-full mt-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                  >
                    First name :
                  </label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    placeholder={"First name"}
                    name={"firstName"}
                    //   error={errors.firstName}
                    handleChangeForm={handleChangeForm}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                  >
                    Last name :
                  </label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    placeholder={"Last name"}
                    name={"lastName"}
                    //   error={errors.lastName}
                    handleChangeForm={handleChangeForm}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Email :
                </label>
                <Input
                  id="email"
                  value={form.email}
                  placeholder={"Email"}
                  name={"email"}
                  type="email"
                  //   error={errors.email}
                  handleChangeForm={handleChangeForm}
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Role :
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChangeForm}
                  className="bg-gray-50 border-2 border-gray-300 text-slate-500 font-poppins  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="Admin">Admin</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                </select>
              </div>

              <div className=" flex gap-5 border-gray-200">
                <p className="text-primary font-poppins md:text-lg font-medium ml-1 ">
                  Account State :
                </p>
                <div className="flex gap-5">
                  <p
                    className={`capitalize font-poppins font-medium md:text-lg ${
                      form.isActive ? "text-green-500" : "text-red-500"
                    } `}
                  >
                    {form.isActive ? "active" : "inactive"}
                  </p>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm({ ...form, isActive: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6  peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>
              <div className=" flex gap-5 border-gray-200">
                <p className="text-primary font-poppins md:text-lg font-medium ml-1 ">
                  Class :
                </p>
                <div className="flex gap-5">
                  <p
                    className={`capitalize flex gap-3 items-center font-poppins font-medium md:text-lg text-gray-800 ${
                      form.classId ? "text-gray-800" : "text-red-500"
                    }  `}
                  >
                    {(form.classId &&
                      `${form.classId?.name} - ${form.classId?.level}`) ||
                      "No class assigned"}
                    <Link
                      to={`/students/assign-class/${id}`}
                      className="text-primary text-2xl"
                    >
                      <MdAssignmentAdd />
                    </Link>
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="registrationNumber"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Registration Number :
                </label>
                <Input
                  id="registrationNumber"
                  value={form.registrationNumber}
                  placeholder={"Registration Number"}
                  name={"registrationNumber"}
                  //   error={errors.registrationNumber}
                  handleChangeForm={handleChangeForm}
                />
              </div>

              <button
                className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                id="login"
                name="login"
                type="submit"
                disabled={isDisabled}
              >
                Save
              </button>
              <div
                className={`fixed bottom-5 right-5 z-50 flex items-center font-poppins p-4 text-sm 
                 text-green-600 border border-green-300 rounded-lg bg-green-50
                transition-opacity duration-500 ease-in-out ${
                  isSuccess ? "opacity-100" : "opacity-0"
                }`}
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div>
                  <span className="font-medium">Update Successful!</span> The
                  student's data has been successfully updated.
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
}
