import { useEffect, useState } from "react";
import Table from "../../../Components/Dashboard/Table";
import { Axios } from "../../../API/axios";
import { EVENTS, EXAMS } from "../../../API/API";
import { Link, useLocation } from "react-router";
import { RiAddCircleLine } from "react-icons/ri";
import SuccessAlert from "../../../Components/Dashboard/SuccessAlert";

export default function Exams() {
  const [exams, setExams] = useState([]);
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
      key: "subject",
      name: "Subject",
    },
    {
      key: "class",
      name: "Class",
    },
    {
      key: "date",
      name: "Date",
    },
    {
      key: "duration",
      name: "Duration",
    },
    {
      key: "term",
      name: "Term",
    },
  ];

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      try {
        const res = await Axios.get(`/${EXAMS}`);
        setExams(res.data.data);
        console.log(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/${EXAMS}/${id}`);
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4">
        Exams Page
      </h1>

      <div className="flex flex-col">
        <Link
          to="add"
          className="w-[90%] self-end mb-5 flex gap-2 items-center max-w-50 justify-center py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 font-poppins font-medium cursor-pointer"
        >
          Add Exams <RiAddCircleLine className="text-2xl" />
        </Link>

        <Table
          header={header}
          data={exams}
          handleDelete={handleDelete}
          isLoading={isLoading}
          notUsers={true}
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

