import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Axios } from "../../../API/axios";
import { CLASSES } from "../../../API/API";
import { formatDate } from "../../../utils/formatDate";
import StudentDetailItem from "../../../Components/Dashboard/StudentDetailItem";
import LineSkeleton from "../../../Components/Skeleton/LineSkeleton";
import UsersList from "../../../Components/Dashboard/UsersList";
import ListSkeleton from "../../../Components/Skeleton/ListSkeleton";

export default function Class() {
  const [classData, setClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchClass() {
      setIsLoading(true);
      try {
        const res = await Axios.get(`/${CLASSES}/${id}`);
        setClass(res.data.data);
        setIsLoading(false);
        console.log(res.data.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    fetchClass();
  }, [id]);
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-20 mt-3 sm:mt-4 capitalize">
        Class details
      </h1>

      <div className="bg-white overflow-hidden shadow rounded-lg border border-primary font-poppins mb-10">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl sm:text-4xl font-medium text-primary capitalize">
            {classData === "" ? (
              <LineSkeleton width={"300px"} height={"h-3"} />
            ) : (
              `${classData.name} class`
            )}
          </h3>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-500">
            This is some information about the class.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <StudentDetailItem
              label="Name"
              value={
                classData === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${classData.name}`
                )
              }
            />
            <StudentDetailItem
              label="Level"
              value={
                classData === "" ? (
                  <LineSkeleton width="w-[300px]" />
                ) : (
                  `${classData.level}`
                )
              }
            />

            <StudentDetailItem
              label="Created at"
              value={
                classData === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${formatDate(classData.createdAt)}`
                )
              }
            />

            <StudentDetailItem
              label="Updated at"
              value={
                classData === "" ? (
                  <LineSkeleton width="w-[200px]" />
                ) : (
                  `${formatDate(classData.updatedAt)}`
                )
              }
            />
          </dl>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="w-full">
          <h1 className="text-lg md:text-xl font-medium font-poppins text-primary mb-3 ">
            Teachers assigned to this class :
          </h1>
          {isLoading ? (
          <ListSkeleton />
        ) : (
          <UsersList
            users={classData.teachers}
            isLoading={isLoading}
            type="Teachers"
          />
        )}
        </div>
        <div className="w-full">
        <h1 className="text-lg md:text-xl font-medium font-poppins text-primary mb-3 ">
            Students assigned to this class :
          </h1>
        {isLoading ? (
          <ListSkeleton />
        ) : (
          <UsersList
            users={classData.students}
            isLoading={isLoading}
            type="students"
          />
        )}
        </div>
      </div>
    </>
  );
}
