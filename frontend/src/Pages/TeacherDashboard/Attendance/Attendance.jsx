import { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { ATTENDANCES, STUDENTS } from "../../../API/API";
import { useNavigate, useParams } from "react-router";
import { PiStudent } from "react-icons/pi";
import Loading from "../../../Components/Loading";

export default function Attendance() {
  const [student, setStudent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [form, setForm] = useState({
    status: "Present",
    remark: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

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
      await Axios.post(`/${ATTENDANCES}/${id}`, form);
      setIsFormLoading(false);
      // تستنى شوي حتى تخلص loading بش تبدا هاذي
      setTimeout(() => {
        navigate("/dashboard-teacher/my-class", {
          state: {
            successMessage: {
              title: "Attendance added successfully!",
              message:
                "The attendance's data for student has been successfully added.",
            },
          },
        });
      }, 100);
    } catch (error) {
      console.log(error);
      setIsFormLoading(false);
    }
  }

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4">
        Manage absences and delays Students
      </h1>

      <div className="flex items-center gap-3 border-2 py-3 max-w-lg px-6 rounded-lg border-primary font-poppins mb-8 md:mb-10">
        <PiStudent className="text-primary text-xl md:text-3xl" />
        <p className="text-xl md:text-3xl font-medium text-primary ">
          Student :{" "}
          {isLoading ? (
            <span className="text-gray-800">Loading...</span>
          ) : (
            <span className="text-gray-800">{`${student.firstName} ${student.lastName}`}</span>
          )}
        </p>
      </div>

      <div className="w-full mb-10 border border-primary rounded-lg">
        <div className="rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          {isFormLoading ? (
            <Loading />
          ) : (
            <form onSubmit={handleOnSubmit} className="w-full mt-8 space-y-6">
              <div className="flex-1">
                <label
                  htmlFor="remark"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Remark :
                </label>

                <textarea
                  className={`font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary`}
                  name="remark"
                  value={form.remark}
                  id="remark"
                  onChange={handleChangeForm}
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Status :
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChangeForm}
                  className="bg-gray-50 border-2 border-gray-300 text-slate-500 font-poppins  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option disabled value="">
                    Select status
                  </option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </div>

              <button
                className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                id="login"
                name="login"
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
