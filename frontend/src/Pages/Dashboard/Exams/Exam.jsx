import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Axios } from "../../../API/axios";
import { EVENTS, EXAMS } from "../../../API/API";
import { formatDate } from "../../../utils/formatDate";
import StudentDetailItem from "../../../Components/Dashboard/StudentDetailItem";
import LineSkeleton from "../../../Components/Skeleton/LineSkeleton";

export default function Exam() {
  const [exam, setExam] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await Axios.get(`/${EXAMS}/${id}`);
        setExam(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchExam();
  }, [id]);
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Exam details
      </h1>

      <div className="bg-white overflow-hidden shadow rounded-lg border border-primary font-poppins mb-10">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl sm:text-4xl font-medium text-primary capitalize">
            Exam details
          </h3>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-500">
            This is some information about the exam.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <StudentDetailItem
              label="Subject"
              value={
                exam === "" ? (
                  <LineSkeleton width="w-[100px]" />
                ) : (
                  `${exam.subject?.name}`
                )
              }
            />
            <StudentDetailItem
              label="Class"
              value={
                exam === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${exam.class.name} ${exam.class.level}`
                )
              }
            />

            <StudentDetailItem
              label="Date"
              value={
                exam === "" ? (
                  <LineSkeleton width="w-[150px]" />
                ) : (
                  formatDate(exam.date)
                )
              }
            />
            
            <StudentDetailItem
              label="Duration"
              value={
                exam === "" ? (
                  <LineSkeleton width="w-[30px]" />
                ) : (
                  `${exam.duration} minutes`
                )
              }
            />

            <StudentDetailItem
              label="Term"
              value={
                exam === "" ? (
                  <LineSkeleton width="w-[30px]" />
                ) : (
                  `${exam.term}`
                )
              }
            />
            
            <StudentDetailItem
              label="Created at"
              value={
                exam === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${formatDate(exam.createdAt)}`
                )
              }
            />
            <StudentDetailItem
              label="Created By"
              value={
                exam === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${exam.createdBy?.firstName} ${exam.createdBy?.lastName} (${exam.createdBy?.role})`
                )
              }
            />
          </dl>
        </div>
      </div>
    </>
  );
}
