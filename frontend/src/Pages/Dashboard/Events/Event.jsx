import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Axios } from "../../../API/axios";
import { EVENTS } from "../../../API/API";
import { formatDate } from "../../../utils/formatDate";
import StudentDetailItem from "../../../Components/Dashboard/StudentDetailItem";
import LineSkeleton from "../../../Components/Skeleton/LineSkeleton";

export default function Event() {
  const [event, setEvent] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await Axios.get(`/${EVENTS}/${id}`);
        setEvent(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvent();
  }, [id]);
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Event details
      </h1>

      <div className="bg-white overflow-hidden shadow rounded-lg border border-primary font-poppins mb-10">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl sm:text-4xl font-medium text-primary capitalize">
            {event === "" ? (
              <LineSkeleton width={"300px"} height={"h-3"} />
            ) : (
              `${event.title} event`
            )}
          </h3>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-500">
            This is some information about the event.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <StudentDetailItem
              label="Title"
              value={
                event === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${event.title}`
                )
              }
            />
            <StudentDetailItem
              label="Description"
              value={
                event === "" ? (
                  <LineSkeleton width="w-[300px]" />
                ) : (
                  `${event.description}`
                )
              }
            />

            <StudentDetailItem
              label="Date"
              value={
                event === "" ? (
                  <LineSkeleton width="w-[150px]" />
                ) : (
                  formatDate(event.date)
                )
              }
            />
            
            <StudentDetailItem
              label="Location"
              value={
                event === "" ? (
                  <LineSkeleton width="w-[300px]" />
                ) : (
                  `${event.location}`
                )
              }
            />
            
            <StudentDetailItem
              label="Created at"
              value={
                event === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${formatDate(event.createdAt)}`
                )
              }
            />
            <StudentDetailItem
              label="Created By"
              value={
                event === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${event.createdBy?.firstName} ${event.createdBy?.lastName} (${event.createdBy?.role})`
                )
              }
            />
          </dl>
        </div>
      </div>
    </>
  );
}
