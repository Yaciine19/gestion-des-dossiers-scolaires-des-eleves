import { Routes, Route } from "react-router";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireBack from "./Pages/Auth/RequireBack";
import Users from "./Pages/Dashboard/Users/Users";
import DashboardHome from "./Pages/Dashboard/Home/DashboardHome";
import RequireAuth from "./Pages/Auth/RequireAuth";
import Page404 from "./Pages/Auth/Page404";
import StudentHome from "./Pages/StudentDashboard/Home/StudentHome";
import Students from "./Pages/Dashboard/Students/Students";
import Teachers from "./Pages/Dashboard/Teachers/Teachers";
import EditStudent from "./Pages/Dashboard/Students/EditStudent";
import AddStudent from "./Pages/Dashboard/Students/AddStudent";
import Teacher from "./Pages/Dashboard/Teachers/Teacher";
import AddTeacher from "./Pages/Dashboard/Teachers/AddTeacher";
import EditTeacher from "./Pages/Dashboard/Teachers/EditTeacher";
import Events from "./Pages/Dashboard/Events/Events";
import Event from "./Pages/Dashboard/Events/Event";
import AddEvent from "./Pages/Dashboard/Events/AddEvent";
import EditEvent from "./Pages/Dashboard/Events/EditEvent";
import Exams from "./Pages/Dashboard/Exams/Exams";
import Exam from "./Pages/Dashboard/Exams/Exam";
import EditExam from "./Pages/Dashboard/Exams/EditExam";
import AddExam from "./Pages/Dashboard/Exams/AddExam";
import Classes from "./Pages/Dashboard/Classes/Classes";
import Class from "./Pages/Dashboard/Classes/Class";
import AddClass from "./Pages/Dashboard/Classes/AddClass";
import EditClass from "./Pages/Dashboard/Classes/EditClass";
import Subjects from "./Pages/Dashboard/Subjects/Subjects";
import Subject from "./Pages/Dashboard/Subjects/Subject";
import AddSubject from "./Pages/Dashboard/Subjects/AddSubject";
import EditSubject from "./Pages/Dashboard/Subjects/EditSubject";
import TeacherDashboard from "./Pages/TeacherDashboard/TeacherDashboard";
import HomeTeachers from "./Pages/TeacherDashboard/Home/HomeTeachers";
import MyClass from "./Pages/TeacherDashboard/MyClass/MyClass";
import Attendance from "./Pages/TeacherDashboard/Attendance/Attendance";
import Student from "./Pages/Dashboard/Students/Student";
import StudentDetail from "./Pages/TeacherDashboard/StudentDetail/StudentDetail";
import NoteOfStudent from "./Pages/TeacherDashboard/NoteOfStudent/NoteOfStudent";
import StudentDashboard from "./Pages/StudentDashboard/StudentDashboard";
import MyAttendance from "./Pages/StudentDashboard/MyAttendance/MyAttendance";
import MyBulletin from "./Pages/StudentDashboard/MyBulletin/MyBulletin";
import AddAdmin from "./Pages/Dashboard/Users/AddUser";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<Page404 />} />
      <Route element={<RequireBack />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        element={<RequireAuth allowedRole={["Admin", "Teacher", "Student"]} />}
      >
        
        {/* Admin */}
        <Route element={<RequireAuth allowedRole={["Admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<AddAdmin />} />

            {/* Students */}
            <Route path="students" element={<Students />} />
            <Route path="students/detail/:id" element={<Student />} />
            <Route path="students/edit/:id" element={<EditStudent />} />
            <Route path="students/add" element={<AddStudent />} />

            {/* Teachers */}
            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/detail/:id" element={<Teacher />} />
            <Route path="teachers/edit/:id" element={<EditTeacher />} />
            <Route path="teachers/add" element={<AddTeacher />} />

            {/* Classes */}
            <Route path="classes" element={<Classes />} />
            <Route path="classes/detail/:id" element={<Class />} />
            <Route path="classes/edit/:id" element={<EditClass />} />
            <Route path="classes/add" element={<AddClass />} />

            {/* Subjects */}
            <Route path="subjects" element={<Subjects />} />
            <Route path="subjects/detail/:id" element={<Subject />} />
            <Route path="subjects/edit/:id" element={<EditSubject />} />
            <Route path="subjects/add" element={<AddSubject />} />

            {/* Events */}
            <Route path="events" element={<Events />} />
            <Route path="events/detail/:id" element={<Event />} />
            <Route path="events/edit/:id" element={<EditEvent />} />
            <Route path="events/add" element={<AddEvent />} />
            
            {/* Exams */}
            <Route path="exams" element={<Exams />} />
            <Route path="exams/detail/:id" element={<Exam />} />
            <Route path="exams/edit/:id" element={<EditExam />} />
            <Route path="exams/add" element={<AddExam />} /> 
          </Route>
        </Route>

        {/* Teacher */}
        <Route element={<RequireAuth allowedRole={["Teacher"]} />}>
          <Route path="/dashboard-teacher" element={<TeacherDashboard />}>
            <Route index element={<HomeTeachers />} />
            <Route path="my-class" element={<MyClass />} />
            <Route path="my-class/attendance-student/:id" element={<Attendance />} />
            <Route path="my-class/student/detail/:id" element={<StudentDetail />} />
            <Route path="my-class/note-student/:id" element={<NoteOfStudent />} />
          </Route>
        </Route>

        {/* Student */}
        <Route element={<RequireAuth allowedRole={["Student"]} />}>
          <Route path="/dashboard-student" element={<StudentDashboard />} >
            <Route index element={<StudentHome />} />
            <Route path="attendance" element={<MyAttendance />} />
            <Route path="bulletin" element={<MyBulletin />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
