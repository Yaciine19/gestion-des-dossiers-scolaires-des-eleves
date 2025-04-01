import { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import Input from "../../../Components/Input";
import DangerAlert from "../../../Components/Dashboard/DangerAlert";
import { useNavigate } from "react-router";
import Loading from "../../../Components/Loading";

export default function AddAdmin() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Admin",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    emailError: false,
    serverError: false,
  });
  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`/users/admins`, form);
      setIsLoading(false);

      // تستنى شوي حتى تخلص loading بش تبدا هاذي
      setTimeout(() => {
        navigate("/dashboard/users", {
          state: {
            successMessage: {
              title: "Admin added successfully!",
              message: "The admin has been successfully added to the database.",
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
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Add New Admin
      </h1>
      <div className="w-full mb-10 border border-primary rounded-lg">
        <div className="rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          {isLoading ? (
            <Loading />
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
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <button
                className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isDisabled}
              >
                Save
              </button>

              <DangerAlert
                title={"Be carefull"}
                message={"The admin's email must be unique."}
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
