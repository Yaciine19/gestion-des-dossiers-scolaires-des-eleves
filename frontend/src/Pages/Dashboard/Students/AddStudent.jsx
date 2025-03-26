import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { CLASSES, STUDENTS } from "../../../API/API";
import Input from "../../../Components/Input";
import { MdAssignmentAdd } from "react-icons/md";
import DangerAlert from "../../../Components/Dashboard/DangerAlert";
import { useNavigate } from "react-router";

export default function AddStudent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Student",
    isActive: false,
    classId: "",
    registrationNumber: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [classes, setClasses] = useState([]);
  const [showClasses, setShowClasses] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    emailError: false,
    serverError: false,
  });
  const navigate = useNavigate();

  // Fetch Classes
  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await Axios.get(`/${CLASSES}`);
        setClasses(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClasses();
  }, []);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`users/${STUDENTS}`, form);
      setIsLoading(false);

      // تستنى شوي حتى تخلص loading بش تبدا هاذي
      setTimeout(() => {
        navigate("/dashboard/students", {
          state: {
            successMessage: {
              title: "Student added successfully!",
              message:
                "The student has been successfully added to the database.",
            },
          },
        });
      }, 100);
      
    } catch (err) {
      setIsLoading(false);
      setTimeout(() => {
        if (err.response.status === 400) {
          setError((prevError) => ({ ...prevError, emailError: true }));
          setTimeout(() => {
            setError((prevError) => ({ ...prevError, emailError: false }));
          }, 3000);
        } else {
          setError((prevError) => ({ ...prevError, serverError: true }));
          setTimeout(() => {
            setError((prevError) => ({ ...prevError, serverError: false }));
          }, 3000);
        }
      }, 200);
    }
  }

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const isFormValid = Object.values(form).every((value) => value !== "");
    setIsDisabled(!isFormValid);
  }, [form]);

  const handleOnClick = () => {
    setShowClasses(true);
  };

  // Helper function to get the current classId value
  const getCurrentClassId = () => {
    if (!form.classId) return "";
    return typeof form.classId === "object" ? form.classId._id : form.classId;
  };
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Add New Student
      </h1>
      <div className="w-full mb-10 border border-primary rounded-lg">
        <div className="rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          {isLoading ? (
            <isLoading />
          ) : (
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
                  handleChangeForm={handleChangeForm}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Password :
                </label>
                <Input
                  id="password"
                  value={form.password}
                  placeholder={"Password"}
                  name={"password"}
                  type="password"
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
                  <option disabled value="">
                    Select Role
                  </option>
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
                      name="isActive"
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

              <div
                className={`${
                  !form.classId && !showClasses && "flex gap-3 items-center"
                }`}
              >
                <label
                  htmlFor="classId"
                  className={`text-primary font-poppins md:text-lg font-medium block ${
                    form.classId && showClasses && "mb-2"
                  } ml-1`}
                >
                  Class :
                </label>
                {form.classId || showClasses ? (
                  <select
                    name="classId"
                    value={getCurrentClassId()}
                    onChange={handleChangeForm}
                    className="bg-gray-50 border-2 border-gray-300 text-slate-500 font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option disabled value="">
                      Select class
                    </option>
                    {classes.map((classData) => (
                      <option key={classData._id} value={classData._id}>
                        {`${classData.name} - ${classData.level}`}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="capitalize flex gap-3 items-center font-poppins font-medium md:text-lg text-red-500">
                    No class assigned
                    <MdAssignmentAdd
                      className="text-xl text-primary cursor-pointer"
                      onClick={handleOnClick}
                    />
                  </p>
                )}
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

              <DangerAlert
                title={"Be carefull"}
                message={
                  "The student's email and registration number must be unique."
                }
                classValue={
                  error.emailError
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }
              />
              <DangerAlert
                title={"Network error"}
                message={"Please, try later."}
                classValue={
                  error.serverError
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
}
