import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Rectangle,
} from "recharts";

const data = [
  { name: "January", attendance: 85, absence: 15 },
  { name: "February", attendance: 90, absence: 10 },
  { name: "March", attendance: 78, absence: 22 },
  { name: "April", attendance: 95, absence: 5 },
  { name: "May", attendance: 88, absence: 12 },
];

const AttendanceChart = () => {
  return (
    <div className="w-full h-96 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">
        Attendance Overview
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="attendance" fill="#2196F3" activeBar={<Rectangle fill="#64B5F6" />} />
          <Bar dataKey="absence" fill="#82ca9d" activeBar={<Rectangle fill="#94d2ab" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
