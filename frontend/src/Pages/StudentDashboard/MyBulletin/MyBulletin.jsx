import { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import StudentDetailItem from "../../../Components/Dashboard/StudentDetailItem";
import { BULLETINS } from "../../../API/API";

export default function MyBulletin() {
  const [bulletins, setBulletins] = useState([]);
  useEffect(() => {
    async function fetchAcademicRecord() {
      try {
        const res = await Axios.get(`${BULLETINS}/student/academic-record`);
        setBulletins(res.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAcademicRecord();
  }, []);
  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-10 sm:mb-15 mt-3 sm:mt-4 capitalize">
        My bulletin
      </h1>

      <div className="space-y-10">
        {bulletins.length > 0 ? (
          bulletins.map((bulletin) => (
            <div key={bulletin._id}>
              <div className="flex flex-col gap-5 items-center sm:flex-row sm:justify-between mb-5">
                <h2 className="text-xl sm:text-3xl font-medium font-poppins text-primary">
                  Term :{" "}
                  <span className="text-gray-800">{bulletin.termNumber}</span>
                </h2>
                <p className="text-md sm:text-xl font-medium font-poppins text-primary">
                  Moyen:{" "}
                  <span className="text-gray-800">
                    {bulletin.termAverage.toFixed(2)}
                  </span>
                </p>
              </div>

              <div className="relative overflow-x-auto shadow border border-[#1565C0] sm:rounded-lg mb-5">
                <table className="w-full text-left">
                  <thead className="text-white font-poppins uppercase bg-[#1565C0]">
                    <tr>
                      <th className="p-6 text-center">Subject</th>
                      <th className="p-6 text-center">Continuous assessment</th>
                      <th className="p-6 text-center">Test Score</th>
                      <th className="p-6 text-center">ExamScore</th>
                      <th className="p-6 text-center">Moyen of Subject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulletin.subjects.map((subject, index) => (
                      <tr
                        key={index}
                        className="bg-[#E3F2FD]/30 border-b last:border-none border-[#0D47A1] hover:bg-[#E3F2FD]"
                      >
                        <td className="p-6 text-center font-medium font-poppins text-blue-950 border-r border-[#0D47A1]">
                          {subject?.subject?.name}
                        </td>
                        <td className="p-6 text-center font-medium font-poppins text-blue-950 border-r border-[#0D47A1]">
                          {subject?.continuousAssessment}
                        </td>
                        <td className="p-6 text-center font-medium font-poppins text-blue-950 border-r border-[#0D47A1]">
                          {subject?.testScore}
                        </td>
                        <td className="p-6 text-center font-medium font-poppins text-blue-950 border-r border-[#0D47A1]">
                          {subject?.examScore}
                        </td>
                        <td className="p-6 text-center font-medium font-poppins text-blue-950 border-r border-[#0D47A1]">
                          {subject?.finalScore.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bulletin.termNumber == 3 && <div className="text-xl sm:text-2xl font-medium font-poppins mb-10 text-primary">
                annualAverage : <span className="text-gray-800">{bulletin.annualAverage.toFixed(2)}</span>
              </div>}
            </div>
          ))
        ) : (
          <div className="text-xl sm:text-2xl font-poppins text-gray-800">
            There is no bulletin for now.
          </div>
        )}
      </div>
    </>
  );
}
