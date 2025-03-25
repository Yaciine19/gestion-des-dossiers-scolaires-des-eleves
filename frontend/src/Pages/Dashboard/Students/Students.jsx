import { useEffect, useState } from "react";
import Table from "../../../Components/Dashboard/Table";
import { Axios } from "../../../API/axios";
import { STUDENTS } from "../../../API/API";
import { TiUserAdd } from "react-icons/ti";
import { Link } from "react-router";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      key: "role",
      name: "Role",
    },
    {
      key: "status",
      name: "Status",
    },
    {
      key: "registrationNumber",
      name: "Registration number",
    },
  ];

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const res = await Axios.get(`/users/${STUDENTS}`);
        // console.log(res);
        setStudents(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/users/${STUDENTS}/${id}`);
      setStudents((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4">
        Students Page
      </h1>

      <div className="flex flex-col">
      <Link
      to='add'
        className="w-[90%] self-end mb-5 flex gap-2 items-center max-w-50 justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins font-medium cursor-pointer"
        
      >
        Add Student <TiUserAdd className="text-2xl" />
      </Link>
      <Table
        header={header}
        data={students}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
      </div>
    </>
  );
}
