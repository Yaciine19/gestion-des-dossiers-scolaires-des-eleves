import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { TEACHER_STUDENTS } from "../../../API/API";
import LineSkeleton from "../../../Components/Skeleton/LineSkeleton";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudent } from "react-icons/pi";
import { GiBookmarklet } from "react-icons/gi";
import Table from "../../../Components/Dashboard/Table";

export default function MyClass() {
  const [teacher, setTeacher] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTeacher() {
      setIsLoading(true);
      try {
        const res = await Axios.get(`/users/${TEACHER_STUDENTS}`);
        setIsLoading(false);
        setTeacher(res.data.teacher);
        console.log(res.data.teacher);
        setStudents(res.data.students);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTeacher();
  }, []);

  const header = [
    {
      key: "firstName",
      name: "First name",
    },
    {
      key: "lastName",
      name: "Last name",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "registrationNumber",
      name: "Registration number",
    },
  ];

  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-8 mt-3 sm:mt-4">
        {isLoading ? (
          <div className="mt-5 sm:mt-6">
            <LineSkeleton width={"w-2/5"} height={"h-4"} />
          </div>
        ) : (
          `Hello, ${teacher.firstName} ${teacher.lastName}`
        )}
      </h1>

      <div className="flex flex-col gap-5 md:flex-row justify-between font-poppins mb-10 sm:mb-15">
        <div className="flex items-center gap-3 border-2 py-3 px-6 text-center rounded-lg border-primary">
          <SiGoogleclassroom className="text-primary text-xl md:text-3xl" />
          <p className="text-xl md:text-3xl font-medium text-primary ">
            Class:{" "}
            <span className="text-gray-800">{ isLoading ? "Loading..." : `${teacher.classId?.name} - ${teacher.classId?.level}`}</span>
          </p>
        </div>
        <div className="flex gap-3 border-2 py-3 px-6 text-center rounded-lg border-primary">
          <PiStudent className="text-primary text-xl md:text-3xl" />
          <p className="text-xl md:text-3xl font-medium text-primary">
            Students : <span className="text-gray-800">{isLoading ? "Loading..." : students.length}</span>
          </p>
        </div>
        <div className="flex gap-3 border-2 py-3 px-6 text-center rounded-lg border-primary">
          <GiBookmarklet className="text-primary text-xl md:text-3xl" />
          <p className="text-xl md:text-3xl font-medium text-primary">
            Subject : <span className="text-gray-800">{isLoading ? "Loading..." : teacher.subject?.name}</span>
          </p>
        </div>
      </div>

      <h2 className="text-xl sm:text-3xl font-medium font-poppins text-primary mb-6">
        My studnets :
      </h2>
      <Table
        header={header}
        data={students}
        isLoading={isLoading}
        notUsers={true}
      />
    </>
  );
}
