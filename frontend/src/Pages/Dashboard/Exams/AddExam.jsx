import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { CLASSES, EXAMS, SUBJECTS } from "../../../API/API";
import Input from "../../../Components/Input";
import { useNavigate } from "react-router";

export default function AddExam() {
  const [form, setForm] = useState({
    subject: "",
    class: "",
    date: "",
    duration: "",
    term: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  //   fetch Classes
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

  //   fetch Subjects
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await Axios.get(`/${SUBJECTS}`);
        setSubjects(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSubjects();
  }, []);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`/${EXAMS}`, form);
      setIsLoading(false);
      console.log(res);
      // تستنى شوي حتى تخلص loading بش تبدا هاذي
      setTimeout(() => {
        navigate("/dashboard/exams", {
          state: {
            successMessage: {
              title: "Exam added successfully!",
              message: "The exam's data has been successfully added in database.",
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

  const getCurrentClassId = () => {
    if (!form.class) return "";
    return typeof form.class === "object" ? form.class._id : form.class;
  };

  const getCurrentSubjectId = () => {
    if (!form.subject) return "";
    return typeof form.subject === "object" ? form.subject._id : form.subject;
  };

  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Add new exam
      </h1>
      <div className="w-full mb-10 border border-primary rounded-lg">
        <div className="rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          {isLoading ? (
            <isLoading />
          ) : (
            <form onSubmit={handleOnSubmit} className="w-full mt-8 space-y-6">
              <div className="flex-1">
                <label
                  htmlFor="subject"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Subject :
                </label>
                <select
                  name="subject"
                  value={getCurrentSubjectId()}
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
              </div>

              <div className="flex-1">
                <label
                  htmlFor="subject"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Class :
                </label>
                <select
                  name="class"
                  value={getCurrentClassId()}
                  onChange={handleChangeForm}
                  className="bg-gray-50 border-2 border-gray-300 text-slate-500 font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option disabled value="">
                    Select Class
                  </option>
                  {classes.map((classData) => (
                    <option key={classData._id} value={classData._id}>
                      {`${classData.name} - ${classData.level}`}
                    </option>
                  ))}
                </select>
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
                  htmlFor="duration"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Duration (minutes):
                </label>
                <Input
                  id="duration"
                  value={form.duration}
                  placeholder={"Duration"}
                  name={"duration"}
                  type="number"
                  handleChangeForm={handleChangeForm}
                />
              </div>

              <div>
                <label
                  htmlFor="term"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Term:
                </label>
                <input
                  className={`font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500"
                   w-full focus:border-primary`}
                  id="term"
                  value={form.term}
                  placeholder={"Term"}
                  name={"term"}
                  type="number"
                  onChange={handleChangeForm}
                  max={3}
                  min={1}
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

