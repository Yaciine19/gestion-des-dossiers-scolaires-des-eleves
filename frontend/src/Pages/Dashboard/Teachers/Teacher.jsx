import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Axios } from "../../../API/axios";
import { TEACHERS } from "../../../API/API";
import { formatDate } from "../../../utils/formatDate";
import StudentDetailItem from "../../../Components/Dashboard/StudentDetailItem";
import LineSkeleton from "../../../Components/Skeleton/LineSkeleton";

export default function Teacher() {
  const [teacher, setTeacher] = useState("");

  const fullName = `${teacher.firstName} ${teacher.lastName}`;
  const { id } = useParams();

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const res = await Axios.get(`/users/${TEACHERS}/${id}`);
        setTeacher(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTeacher();
  }, [id]);
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Teacher Profile
      </h1>

      <div className="bg-white overflow-hidden shadow rounded-lg border border-primary font-poppins mb-10">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl sm:text-4xl font-medium text-primary capitalize">
            {teacher === "" ? "Loading..." : `${fullName} Profile`}
          </h3>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-500">
            This is some information about the teacher.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <StudentDetailItem
              label="Full name"
              value={
                teacher === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${fullName}`
                )
              }
            />
            <StudentDetailItem
              label="Email address"
              value={
                teacher === "" ? (
                  <LineSkeleton width="w-[300px]" />
                ) : (
                  `${teacher.email}`
                )
              }
            />

            <StudentDetailItem
              label="Role"
              value={
                teacher === "" ? (
                  <LineSkeleton width="w-[150px]" />
                ) : (
                  `${teacher.role}`
                )
              }
            />
            <StudentDetailItem
              label="Account Status"
              value={
                teacher === "" ? (
                  <LineSkeleton width="w-[100px]" />
                ) : (
                  `${teacher.status}`
                )
              }
              valueClass={teacher.isActive ? "text-green-400" : "text-red-500"}
            />
            <StudentDetailItem
              label="Subject"
              value={
                teacher === "" ? (
                  <LineSkeleton width="w-[100px]" />
                ) : teacher.subject ? (
                  `${teacher.subject?.name}`
                ) : "No Subject has been assigned to this teacher yet."
              }
              valueClass={teacher.subject ? "text-gray-800" : "text-red-500"}
            />
            <StudentDetailItem
              label="Class"
              value={
                teacher === "" ? (
                  <LineSkeleton width="w-[300px]" />
                ) : teacher.classId ? (
                  `${teacher.classId?.name} - ${teacher.classId?.level}`
                ) : (
                  "No Class has been assigned to this teacher yet."
                )
              }
              valueClass={teacher.classId ? "text-gray-800" : "text-red-500"}
            />
            <StudentDetailItem
              label="Created at"
              value={
                teacher === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${formatDate(teacher.createdAt)}`
                )
              }
            />
            <StudentDetailItem
              label="Updated at"
              value={
                teacher === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${formatDate(teacher.updatedAt)}`
                )
              }
            />
          </dl>
        </div>
      </div>
    </>
  );
}
