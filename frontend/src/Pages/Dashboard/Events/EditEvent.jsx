import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { EVENTS } from "../../../API/API";
import Input from "../../../Components/Input";
import { useNavigate, useParams } from "react-router";

export default function EditEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    audience: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  // Fetch Event
    useEffect(() => {
      async function fetchEvent() {
        try {
          const res = await Axios.get(`/${EVENTS}/${id}`);
          const eventData = res.data.data;

          const formatedDate = eventData.date
          ? new Date(eventData.date).toISOString().split("T")[0]
          : "";

          console.log(formatedDate)

          setForm({...eventData, date: formatedDate});
          setIsDisabled(false);
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchEvent();
    }, [id]);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.put(`/${EVENTS}/${id}`, form);
      setIsLoading(false);
    console.log(res)
      // تستنى شوي حتى تخلص loading بش تبدا هاذي
      setTimeout(() => {
        navigate("/dashboard/events", {
          state: {
            successMessage: {
              title: "Event Udpated successfully!",
              message:
                "The Event's data has been successfully updated.",
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
        Edit Event
      </h1>
      <div className="w-full mb-10 border border-primary rounded-lg">
        <div className="rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          {isLoading ? (
            <isLoading />
          ) : (
            <form onSubmit={handleOnSubmit} className="w-full mt-8 space-y-6">
              <div className="flex-1">
                <label
                  htmlFor="title"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Title :
                </label>
                <Input
                  id="title"
                  value={form.title}
                  placeholder={"title"}
                  name={"title"}
                  handleChangeForm={handleChangeForm}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="description"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Description :
                </label>

                <textarea className={`font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary`}
                  name="description"
                  value={form.description}
                  id="description"
                  onChange={handleChangeForm}
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Date:
                </label>
                <Input
                  id="date"
                  value={form.date}
                  placeholder={"Date"}
                  name={"date"}
                  type="date"
                  handleChangeForm={handleChangeForm}
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Location :
                </label>
                <Input
                  id="location"
                  value={form.location}
                  placeholder={"Location"}
                  name={"location"}
                  handleChangeForm={handleChangeForm}
                />
              </div>

              <div>
                <label
                  htmlFor="audience"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Audience :
                </label>
                <select
                id="audience"
                  name="audience"
                  value={form.audience}
                  onChange={handleChangeForm}
                  className="bg-gray-50 border-2 border-gray-300 text-slate-500 font-poppins  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option disabled value="">
                    Select Audience
                  </option>
                  <option value="Students">Students</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Both">Both</option>
                </select>
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
