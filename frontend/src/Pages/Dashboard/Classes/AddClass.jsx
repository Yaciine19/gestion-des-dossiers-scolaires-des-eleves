import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { CLASSES } from "../../../API/API";
import Input from "../../../Components/Input";
import { useNavigate } from "react-router";

export default function AddClass() {
  const [form, setForm] = useState({
    name: '',
    level: ''
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`/${CLASSES}`, form);
      setIsLoading(false);
    console.log(res)
      // تستنى شوي حتى تخلص loading بش تبدا هاذي
      setTimeout(() => {
        navigate("/dashboard/classes", {
          state: {
            successMessage: {
              title: "Class added successfully!",
              message:
                "The Class's data has been successfully added to the database.",
            },
          },
        });
      }, 100);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
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
        Add New class
      </h1>
      <div className="w-full mb-10 border border-primary rounded-lg">
        <div className="rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          {isLoading ? (
            <isLoading />
          ) : (
            <form onSubmit={handleOnSubmit} className="w-full mt-8 space-y-6">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Name of class :
                </label>
                <Input
                  id="name"
                  value={form.name}
                  placeholder={"name"}
                  name={"name"}
                  handleChangeForm={handleChangeForm}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="level"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Level :
                </label>

                <Input
                  id="level"
                  value={form.level}
                  placeholder={"level"}
                  name={"level"}
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
            </form>
          )}
        </div>
      </div>
    </>
  );
}

