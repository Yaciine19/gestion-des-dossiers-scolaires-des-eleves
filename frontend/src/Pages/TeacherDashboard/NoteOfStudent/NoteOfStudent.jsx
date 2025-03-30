import { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { BULLETINS, STUDENTS } from "../../../API/API";
import Loading from "../../../Components/Loading";
import { useParams } from "react-router";

export default function NoteOfStudent() {
  const [student, setStudent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    termNumber: 1,
    testScore: 0,
    continuousAssessment: 0,
    examScore: 0,
  });

  //   Student ID
  const { id } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      setIsLoading(true);
      try {
        const res = await Axios.get(`/users/${STUDENTS}/${id}`);
        setIsLoading(false);
        setStudent(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudent();
  }, [id]);

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await Axios.put(`/${BULLETINS}/update/${id}`, form);
      alert('Updated grade of subject successfully');
      window.location.pathname = "/dashboard-teacher/my-class"
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "testScore" ||
        name === "continuousAssessment" ||
        name === "examScore"
          ? Number(value)
          : value,
    });
  };

  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4">
        {student === ""
          ? "Loading..."
          : `Student evaluation of ${student.firstName} ${student.lastName}`}
      </h1>

      <h2 className="text-xl sm:text-3xl font-medium font-poppins text-primary mb-6">
        Add Note :
      </h2>

      <div className="w-full mb-10 border border-primary rounded-lg">
        <div className="rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          {isLoading ? (
            <Loading />
          ) : (
            <form onSubmit={handleOnSubmit} className="w-full space-y-6">
              <div>
                <label
                  htmlFor="termNumber"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Term :
                </label>
                <select
                  name="termNumber"
                  value={form.termNumber}
                  onChange={handleChangeForm}
                  className="bg-gray-50 border-2 border-gray-300 text-slate-500 font-poppins  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option disabled value="">
                    Select Term
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="continuousAssessment"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Continuous assessment :
                </label>
                <input
                  id="continuousAssessment"
                  className={`font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary`}
                  value={form.continuousAssessment}
                  placeholder={"Continuous assessment"}
                  name={"continuousAssessment"}
                  type="number"
                  max={20}
                  min={0}
                  onChange={handleChangeForm}
                />
              </div>

              <div>
                <label
                  htmlFor="testScore"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Test score :
                </label>
                <input
                  id="testScore"
                  className={`font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary`}
                  value={form.testScore}
                  placeholder={"Test score"}
                  name={"testScore"}
                  type="number"
                  max={20}
                  min={0}
                  onChange={handleChangeForm}
                />
              </div>

              <div>
                <label
                  htmlFor="examScore"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Exam score :
                </label>
                <input
                  id="examScore"
                  className={`font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary`}
                  value={form.examScore}
                  placeholder={"Exam score"}
                  name={"examScore"}
                  type="number"
                  max={20}
                  min={0}
                  onChange={handleChangeForm}
                />
              </div>

              <button
                className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
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
