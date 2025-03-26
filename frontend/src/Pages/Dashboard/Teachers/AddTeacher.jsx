import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { CLASSES, SUBJECTS, TEACHERS } from "../../../API/API";
import Input from "../../../Components/Input";
import { MdAssignmentAdd } from "react-icons/md";
import SuccessAlert from "../../../Components/Dashboard/SuccessAlert";
import DangerAlert from "../../../Components/Dashboard/DangerAlert";
import Loading from "../../../Components/Loading";

export default function AddTeacher() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Teacher",
    classId: "",
    subject: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showClasses, setShowClasses] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [error, setError] = useState({
    emailError: false,
    serverError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await Axios.get(`${SUBJECTS}`);
        setSubjects(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSubjects();
  }, []);

  async function handleOnSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Axios.post(`users/${TEACHERS}`, form);
      setIsLoading(false);
      setTimeout(() => {
        setIsSuccess(true);
      }, 200);
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

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleOnClickClass = () => {
    setShowClasses(true);
  };

  const handleOnClickSubject = () => {
    setShowSubjects(true);
  };

  // Helper function to get the current classId value
  const getCurrentClassId = () => {
    if (!form.classId) return "";
    return typeof form.classId === "object" ? form.classId._id : form.classId;
  };

  const getCurrentSubject = () => {
    if (!form.subject) return "";
    return typeof form.subject === "object" ? form.subject._id : form.subject;
  };
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Add New Teacher
      </h1>
      <div className="w-full mb-10 border border-primary rounded-lg">
        <div className="rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          {isLoading ? <Loading /> : <form onSubmit={handleOnSubmit} className="w-full mt-8 space-y-6">
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
                <option value="Teacher">Teacher</option>
              </select>
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
                    onClick={handleOnClickClass}
                  />
                </p>
              )}
            </div>

            <div
              className={`${
                !form.subject && !showSubjects && "flex gap-3 items-center"
              }`}
            >
              <label
                htmlFor="subject"
                className={`text-primary font-poppins md:text-lg font-medium block ${
                  form.subject && showSubjects && "mb-2"
                } ml-1`}
              >
                Subject :
              </label>
              {form.subject || showSubjects ? (
                <select
                  name="subject"
                  value={getCurrentSubject()}
                  onChange={handleChangeForm}
                  className="bg-gray-50 border-2 border-gray-300 text-slate-500 font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option disabled value="">
                    Select Subject
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="capitalize flex gap-3 items-center font-poppins font-medium md:text-lg text-red-500">
                  No subject assigned
                  <MdAssignmentAdd
                    className="text-xl text-primary cursor-pointer"
                    onClick={handleOnClickSubject}
                  />
                </p>
              )}
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

            <SuccessAlert
              title={"Created Successful!"}
              message={"The Teacher's data has been successfully created."}
              classValue={
                isSuccess ? "opacity-100" : "opacity-0 pointer-events-none"
              }
            />

            <DangerAlert
              title={"Be carful"}
              message={
                "The Teacher's email is already exist try another email."
              }
              classValue={
                error.emailError
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }
            />

            <DangerAlert
              title={"Network Eror"}
              message={"Try again later"}
              classValue={
                error.serverError
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }
            />
          </form>}
        </div>
      </div>
    </>
  );
}
