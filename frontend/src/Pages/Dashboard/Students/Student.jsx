import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Axios } from "../../../API/axios";
import { BULLETINS, STUDENTS } from "../../../API/API";
import { formatDate } from "../../../utils/formatDate";
import StudentDetailItem from "../../../Components/Dashboard/StudentDetailItem";
import LineSkeleton from "../../../Components/Skeleton/LineSkeleton";

export default function Student() {
  const [student, setStudent] = useState("");

  const fullName = `${student.firstName} ${student.lastName}`;
  const { id } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await Axios.get(`/users/${STUDENTS}/${id}`);
        setStudent(res.data.data);
        // console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStudent();
  }, [id]);

  async function handleCalculateAnnual() {
    try {
      await Axios.get(`${BULLETINS}/annual/${id}`);
      alert("Annual average calculated successfully");
    } catch (error) {
      if (error.response.status === 400) {
        alert("Annual average can only be calculated after 3 terms.");
      }
    }
  }
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Student Profile
      </h1>

      <div className="bg-white overflow-hidden shadow rounded-lg border border-primary font-poppins mb-10">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between">
            <h3 className="text-xl sm:text-4xl font-medium text-primary capitalize">
              {student === "" ? (
                <LineSkeleton width={"w-[300px]"} height={"h-3"} />
              ) : (
                `${fullName} Profile`
              )}
            </h3>

            <div
              onClick={handleCalculateAnnual}
              className="text-center bg-blue-600 text-white w-[30%] py-2 rounded-lg cursor-pointer hover:bg-blue-500"
            >
              Calculate annual average
            </div>
          </div>
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
              label="Role"
              value={
                student === "" ? (
                  <LineSkeleton width="w-[150px]" />
                ) : (
                  `${student.role}`
                )
              }
            />
            <StudentDetailItem
              label="Account Status"
              value={
                student === "" ? (
                  <LineSkeleton width="w-[100px]" />
                ) : (
                  `${student.status}`
                )
              }
              valueClass={student.isActive ? "text-green-400" : "text-red-500"}
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
            <StudentDetailItem
              label="Created at"
              value={
                student === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${formatDate(student.createdAt)}`
                )
              }
            />
            <StudentDetailItem
              label="Updated at"
              value={
                student === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${formatDate(student.updatedAt)}`
                )
              }
            />
          </dl>
        </div>
      </div>
    </>
  );
}
