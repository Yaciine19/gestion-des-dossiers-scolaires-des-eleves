import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Axios } from "../../../API/axios";
import { ATTENDANCES, STUDENTS } from "../../../API/API";
import StudentDetailItem from "../../../Components/Dashboard/StudentDetailItem";
import LineSkeleton from "../../../Components/Skeleton/LineSkeleton";

export default function StudentDetail() {
  const [student, setStudent] = useState("");
  const [attendance, setAttendance] = useState("");
  const [form, setForm] = useState({
    status: "",
    remark: "",
  });
  const [isFormLoading, setIsFormLoading] = useState(false);

  const navigate = useNavigate();

  const fullName = `${student.firstName} ${student.lastName}`;
  const { id } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await Axios.get(`/users/${STUDENTS}/${id}`);
        setStudent(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStudent();
  }, [id]);

  useEffect(() => {
    async function fetchAttendanceOfStudent() {
      try {
        const res = await Axios.get(`/${ATTENDANCES}/student/${id}`);
        setAttendance(res.data.data[0]);
        setForm(res.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAttendanceOfStudent();
  }, [id]);

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const res = await Axios.put(`/${ATTENDANCES}/${attendance._id}`, form);
      console.log(res);
      setIsFormLoading(false);
      // تستنى شوي حتى تخلص loading بش تبدا هاذي
      setTimeout(() => {
        navigate("/dashboard-teacher/my-class", {
          state: {
            successMessage: {
              title: "Attendance Updated successfully!",
              message:
                "The attendance's data for student has been successfully Udpated.",
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
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-15 mt-3 sm:mt-4 capitalize">
        Student Detail
      </h1>

      <h2 className="text-xl sm:text-3xl font-medium font-poppins text-primary mb-6">
        Personal Information
      </h2>

      <div className="bg-white overflow-hidden shadow rounded-lg border border-primary font-poppins mb-10">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl sm:text-4xl font-medium text-primary capitalize">
            {student === "" ? (
              <LineSkeleton width={"w-[300px]"} height={"h-3"} />
            ) : (
              `${fullName} Profile`
            )}
          </h3>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-500">
            This is some information about the student.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <StudentDetailItem
              label="Full name"
              value={
                student === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${fullName}`
                )
              }
            />
            <StudentDetailItem
              label="Email address"
              value={
                student === "" ? (
                  <LineSkeleton width="w-[300px]" />
                ) : (
                  `${student.email}`
                )
              }
            />
            <StudentDetailItem
              label="Class"
              value={
                student === "" ? (
                  <LineSkeleton width="w-[300px]" />
                ) : student.classId ? (
                  `${student.classId?.name} - ${student.classId?.level}`
                ) : (
                  "No Class has been assigned to this student yet."
                )
              }
              valueClass={student.classId ? "text-gray-800" : "text-red-500"}
            />

            <StudentDetailItem
              label="Registration number"
              value={
                student === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${student.registrationNumber}`
                )
              }
            />
          </dl>
        </div>
      </div>

      <h2 className="text-xl sm:text-3xl font-medium font-poppins text-primary mb-6">
        Attendance Information
      </h2>

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
                  htmlFor="status"
                  className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
                >
                  Status :
                </label>
                <select
                  name="status"
                  value={form.status}
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

              <div>
              <button
                className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                Save
              </button>
              <button
                className="w-full justify-center py-3 bg-red-500 hover:bg-red-400 active:bg-red-700 rounded-md text-white ring-2 font-poppins cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
