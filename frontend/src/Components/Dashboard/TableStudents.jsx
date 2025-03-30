
import { Link } from "react-router";
import { TfiWrite } from "react-icons/tfi";
import Loading from "../Loading";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { BiSolidUserDetail } from "react-icons/bi";

export default function TableStudents({
  header,
  data,
  isLoading,
}) {

  // Show Header
  const showHeader = header.map((item, index) => (
    <th key={index} scope="col" className="p-6 text-center">
      {item.name}
    </th>
  ));

  // Show Data
  const showData = data.map((item, index) => (
    <tr
      key={index}
      className="bg-[#E3F2FD]/30 border-b last:border-none border-[#0D47A1] hover:bg-[#E3F2FD]"
    >
      <td className="p-6 text-center font-medium font-poppins text-blue-950 border-r border-[#0D47A1]">
        {index + 1}
      </td>
      {header.map((item2, index2) => (
        <td
          className={`p-6 text-center font-medium font-poppins relative text-blue-950`}
          key={index2}
        >
          { item[item2.key]}
        </td>
      ))}
      <td className="p-6 border-l border-[#0D47A1]">
      <div className="flex items-center justify-around w-full gap-3 ">
        
        <Link to={`student/detail/${item._id}`}>
          <BiSolidUserDetail className="text-gray-800 text-2xl" />
        </Link>

        <Link to={`attendance-student/${item._id}`}>
          <TfiWrite className="text-primary text-xl" />
        </Link>

        <Link to={`note-student/${item._id}`}>
          <LiaNotesMedicalSolid className="text-primary text-2xl" />
        </Link>
      </div>
    </td>
    </tr>
  ));

  return (
    <div className="relative overflow-x-auto shadow border border-[#1565C0] sm:rounded-lg mb-10">
      <table className="w-full text-left">
        <thead className="text-white font-poppins uppercase bg-[#1565C0]">
          <tr>
            <th scope="col" className="p-6 text-center">
              ID
            </th>
            {showHeader}
            <th scope="col" className="p-6 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="text-center" colSpan={9}>
                <Loading />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                className="text-center p-6 font-poppins font-medium text-lg text-gray-800"
                colSpan={9}
              >
                No data available
              </td>
            </tr>
          ) : (
            showData
          )}
        </tbody>
      </table>
    </div>
  );
}
