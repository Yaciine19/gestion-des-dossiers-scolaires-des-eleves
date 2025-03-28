import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { CLASSES, SUBJECTS } from "../../../API/API";
import Input from "../../../Components/Input";
import { useNavigate, useParams } from "react-router";

export default function EditSubject() {
  const [form, setForm] = useState({
    name: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  // Fetch Event
  useEffect(() => {
    async function fetchSubject() {
      try {
        const res = await Axios.get(`/${SUBJECTS}/${id}`);
        setForm(res.data.data);
        setIsDisabled(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSubject();
  }, [id]);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await Axios.put(`/${SUBJECTS}/${id}`, form);
      setIsLoading(false);
      // تستنى شوي حتى تخلص loading بش تبدا هاذي
      setTimeout(() => {
        navigate("/dashboard/subjects", {
          state: {
            successMessage: {
              title: "Subject Udpated successfully!",
              message: "The Subject's data has been successfully updated.",
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
        Edit subject
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
