import { useEffect, useState } from "react";
import { ATTENDANCES, USER } from "../../../API/API";
import { Axios } from "../../../API/axios";
import { formatDate } from "../../../utils/formatDate";
import CardSkeleton from "../../../Components/Skeleton/CardSkeleton";

export default function MyAttendance() {
  const [student, setStudent] = useState("");
  const [attendances, setAttendances] = useState([]);
  const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await Axios.get(`users/${USER}`);
        setStudent(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (student) {
      setIsAttendanceLoading(true);
      async function fetchAttendances() {
        try {
          const res = await Axios.get(`/${ATTENDANCES}/student/${student._id}`);
          setIsAttendanceLoading(false);
          setAttendances(res.data.data);
        } catch (error) {
          console.log(error);
          setIsAttendanceLoading(false);
        }
      }

      fetchAttendances();
    }
  }, [student]);

  console.log(attendances);

  const numberOfLate = attendances.filter(
    (attendance) => attendance.status === "Absent"
  ).length;

  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-8 mt-3 sm:mt-4">
        Remark & Attendance
      </h1>

      <div className="flex flex-col gap-5 md:flex-row justify-between font-poppins mb-5 sm:mb-10">
        <div className="flex gap-3 border-2 py-3 px-6 text-center rounded-lg border-primary">
          <p className="text-xl md:text-3xl font-medium text-primary">
            Absent :{" "}
            <span className="text-gray-800">
              {isAttendanceLoading ? "Loading..." : numberOfLate}
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-5 mb-8">
        {isAttendanceLoading ? (
          <CardSkeleton />
        ) : attendances.length > 0 ? (
          attendances.map((attendance) => (
            <div
              key={attendance._id}
              className="block w-full p-6 rounded-lg shadow-sm bg-white border-2 border-primary font-poppins"
            >
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                <h5 className=" text-2xl font-semibold tracking-tight text-gray-800 mb-2">
                  {attendance.remark}
                </h5>
                <p className="text-gray-800 font-semibold">
                  Date :{" "}
                  <span className="text-gray-500 font-normal">
                    {formatDate(attendance.date)}
                  </span>
                </p>
              </div>
              <p className="text-primary mb-2 font-semibold">
                State :{" "}
                <span className="text-gray-500 font-normal">
                  {attendance.status}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Recorded By :{" "}
                <span className="text-gray-500 font-normal">{`${attendance.recordedBy.firstName} ${attendance.recordedBy.lastName}`}</span>
              </p>
            </div>
          ))
        ) : (
          <div className="text-xl sm:text-2xl font-poppins text-gray-800">
            There is no remarks for now.
          </div>
        )}
      </div>
    </>
  );
}
