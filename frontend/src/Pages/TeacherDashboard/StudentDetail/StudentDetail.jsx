import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Axios } from "../../../API/axios";
import { ATTENDANCES, BULLETINS, STUDENTS } from "../../../API/API";
import StudentDetailItem from "../../../Components/Dashboard/StudentDetailItem";
import LineSkeleton from "../../../Components/Skeleton/LineSkeleton";

export default function StudentDetail() {
  const [student, setStudent] = useState("");
  const [attendances, setAttendances] = useState("");
  const [bulletinSubjects, setBulletinSubjects] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(false);

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

  const handleChangeTerm = (e) => {
    async function fetchBulletinOfStudent() {
      try {
        const res = await Axios.get(
          `/${BULLETINS}/${id}/term/${e.target.value}`
        );
        setBulletinSubjects(res.data.data.subjects);
      } catch (error) {
        if(error.response.status === 404) {
          setSelectedTerm(false);
        }
      }
    }
    setSelectedTerm(true);
    fetchBulletinOfStudent();
  };

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
        setAttendances(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAttendanceOfStudent();
  }, [id]);

  const handleChange = (index, e) => {
    const updatedAttendances = [...attendances];
    updatedAttendances[index] = {
      ...updatedAttendances[index],
      [e.target.name]: e.target.value,
    };
    setAttendances(updatedAttendances);
  };

  const handleUpdate = async (index) => {
    try {
      const attendance = attendances[index];
      await Axios.put(`/${ATTENDANCES}/${attendance._id}`, attendance);
      alert("Updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (attendanceId) => {
    try {
      const res = await Axios.delete(`/${ATTENDANCES}/${attendanceId}`);
      console.log(res);
      setAttendances((prevAttendance) =>
        prevAttendance.filter((a) => a._id !== attendanceId)
      );
    } catch (error) {
      console.log(error);
    }
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
        Attendances
      </h2>

      {attendances.length > 0 ? (
        attendances.map((attendance, index) => (
          <div
            key={attendance._id}
            className="border border-primary rounded-lg p-6 mb-4"
          >
            <label className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1">
              Remark:
            </label>
            <textarea
              className={`font-poppins outline-none border-2 rounded-md px-4 py-3 text-slate-500 w-full focus:border-primary`}
              name="remark"
              value={attendance.remark}
              onChange={(e) => handleChange(index, e)}
            ></textarea>

            <label className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1">
              Status:
            </label>
            <select
              name="status"
              value={attendance.status}
              onChange={(e) => handleChange(index, e)}
              className="bg-gray-50 border-2 border-gray-300 text-slate-500 font-poppins  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>

            <div className="flex flex-col md:flex-row justify-between mt-4 gap-2">
              <button
                className="w-full justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white font-poppins cursor-pointer"
                onClick={() => handleUpdate(index)}
              >
                Update
              </button>
              <button
                className="w-full justify-center py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-md text-white font-poppins cursor-pointer"
                onClick={() => handleDelete(attendance._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="border border-primary rounded-lg p-6 text-lg mb-10">
          No attendance records found.
        </div>
      )}

      <h2 className="text-xl sm:text-3xl font-medium font-poppins text-primary mb-6">
        {student === ""
          ? "Loading..."
          : `Student evaluation of ${student.firstName} ${student.lastName}`}
      </h2>

      <div>
        <label
          htmlFor="termNumber"
          className="text-primary font-poppins md:text-lg font-medium block mb-2 ml-1"
        >
          Term :
        </label>
        <select
          name="termNumber"
          defaultValue={""}
          onChange={handleChangeTerm}
          className="bg-gray-50 border-2 max-w-2xs border-gray-300 text-slate-500 font-poppins  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option disabled value="">
            Select Term
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      {selectedTerm &&
        bulletinSubjects.length > 0 ? (
          bulletinSubjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg border border-primary font-poppins mb-10 mt-5"
            >
              <div className=" px-4 py-5 sm:p-0">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-xl sm:text-4xl font-medium text-primary capitalize">
                    {`Subject : ${subject.subject?.name}`}
                  </h3>
                </div>
                <dl className="sm:divide-y sm:divide-gray-200">
                  <StudentDetailItem
                    label="Continuous assessment"
                    value={subject.continuousAssessment}
                  />

                  <StudentDetailItem
                    label="Test score"
                    value={subject.testScore}
                  />
                  <StudentDetailItem
                    label="Exam score"
                    value={subject.examScore}
                  />
                </dl>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white overflow-hidden shadow rounded-lg border border-primary font-poppins p-6 text-lg mb-10 mt-5">
            there is no bulletin for this student for now.
          </div>
        )
      }
    </>
  );
}
