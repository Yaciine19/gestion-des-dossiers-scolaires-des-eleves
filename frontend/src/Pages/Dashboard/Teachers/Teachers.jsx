import { useEffect, useState } from "react";
import Table from "../../../Components/Dashboard/Table";
import { Axios } from "../../../API/axios";
import { TEACHERS } from "../../../API/API";
import { Link, useLocation } from "react-router";
import { TiUserAdd } from "react-icons/ti";
import SuccessAlert from "../../../Components/Dashboard/SuccessAlert";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();

  const successMessage = location.state?.successMessage || null;

  useEffect(()=> {
    if(successMessage) {
      setIsSuccess(true);
      setTitle(successMessage.title);
      setMessage(successMessage.message);

      // إعادة تعيين `location.state` لمنع التكرار
      window.history.replaceState({}, "");

      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  },[successMessage])

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
  ];

  useEffect(() => {
    async function fetchTeachers() {
      setIsLoading(true);
      try {
        const res = await Axios.get(`/users/${TEACHERS}`);
        setTeachers(res.data.data);
        console.log(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/users/${TEACHERS}/${id}`);
      setTeachers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4">
        Teachers Page
      </h1>

      <div className="flex flex-col">
        <Link
          to="add"
          className="w-[90%] self-end mb-5 flex gap-2 items-center max-w-50 justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins font-medium cursor-pointer"
        >
          Add Teacher <TiUserAdd className="text-2xl" />
        </Link>

        <Table
          header={header}
          data={teachers}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>
      <SuccessAlert
        title={title}
        message={message}
        classValue={isSuccess ? "opacity-100" : "opacity-0 pointer-events-none"}
      />
    </>
  );
}
