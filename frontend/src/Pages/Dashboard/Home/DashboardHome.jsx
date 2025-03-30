import { useEffect, useState } from "react";
import AttendanceChart from "../../../Components/Dashboard/AttendanceChart";
import { STUDENTS, TEACHERS } from "../../../API/API";
import { Axios } from "../../../API/axios";
import Table from "../../../Components/Dashboard/Table";
import { TiUserAdd } from "react-icons/ti";
import { Link } from "react-router";

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
];

export default function DashboardHome() {
  const [students, setStudents] = useState([]);
  const [isStudentsLoading, setIsStudentsLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [isTeachersLoading, setIsTeachersLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      setIsStudentsLoading(true);
      try {
        const res = await Axios.get(`/users/${STUDENTS}`);
        // console.log(res);
        setStudents(res.data.data);
        setIsStudentsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    async function fetchTeachers() {
      setIsTeachersLoading(true);
      try {
        const res = await Axios.get(`/users/${TEACHERS}`);
        setTeachers(res.data.data);
        console.log(res.data.data);
        setIsTeachersLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeachers();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      setIsUsersLoading(true);
      try {
        const res = await Axios.get("/users");
        setUsers(res.data.data);
        setIsUsersLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-5 sm:mb-10 mt-3 sm:mt-4">
        Dashboard Home
      </h1>

      <main className="space-y-6">
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-primary bg-blue-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {isStudentsLoading ? "0" : students.length}
              </span>
              <span className="block text-gray-500">Students</span>
            </div>
          </div>

          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-emerald-500 bg-emerald-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {isTeachersLoading ? "0" : teachers.length}
              </span>
              <span className="block text-gray-500">Teachers</span>
            </div>
          </div>

          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-indigo-500 bg-indigo-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {isStudentsLoading ? "0" : students.length}
              </span>
              <span className="block text-gray-500">Parents</span>
            </div>
          </div>

          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-orange-400 bg-orange-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {isUsersLoading ? "0" : users.length}
              </span>
              <span className="block text-gray-500">Users</span>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
            <div className="p-4 flex-grow">
              <div className="flex items-center justify-center h-full p-8 text-gray-400 font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                <AttendanceChart />
              </div>
            </div>
          </div>

          <div className="row-span-3 md:col-span-2 shadow rounded-lg">
            <div className="flex flex-col">
              <Link
                to="users/add"
                className="w-[90%] self-end mb-5 flex gap-2 items-center max-w-50 justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins font-medium cursor-pointer"
              >
                Add Admin <TiUserAdd className="text-2xl" />
              </Link>
              <Table
                header={header}
                data={users}
                handleDelete={handleDelete}
                isLoading={isUsersLoading}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
