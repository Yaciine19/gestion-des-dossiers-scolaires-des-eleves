import React, { useEffect, useState } from "react";
import Card from "../../../Components/Dashboard/Card";
import { EVENTS, EXAMS, USER } from "../../../API/API";
import { Axios } from "../../../API/axios";
import Table from "../../../Components/Dashboard/Table";
import { formatDate } from "../../../utils/formatDate";
import CardSkeleton from "../../../Components/Skeleton/CardSkeleton";

export default function HomeTeachers() {
  const [exams, setExams] = useState([]);
  const [events, setEvents] = useState([]);
  const [isEventsLoading, setIsEventsLoading] = useState(false);
  const [isExamsLoading, setIsExamsLoading] = useState(false);

// Fetch Events
useEffect(() => {
  async function fetchEvents() {
    setIsEventsLoading(true);
    try {
      const res = await Axios.get(`/${EVENTS}`);
      setEvents(res.data.data);
      setIsEventsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  fetchEvents();
}, []);

// Fetch Exams
  useEffect(() => {
    async function fetchExams() {
      setIsExamsLoading(true);
      try {
        const res = await Axios.get(`/${EXAMS}`);
        setExams(res.data.data);
        setIsExamsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExams();
  }, []);

    // Header's table of Exam
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
      name: "Duration ( minutes )",
    },
    {
      key: "term",
      name: "Term",
    },
  ];

  return (
    <>
      <h1 className="text-2xl sm:text-5xl font-semibold font-poppins text-primary mb-8 mt-3 sm:mt-4">
        Home Page of Teachers
      </h1>

      <h2 className="text-xl sm:text-3xl font-medium font-poppins text-primary mb-6">
        Events
      </h2>

      <div className="space-y-5 mb-8">
        {isEventsLoading ? <CardSkeleton /> : events.map((event) => <Card key={event._id} title={event.title} description={event.description} date={formatDate(event.date)} location={event.location} audience={event.audience} />)}
      </div>

      <h2 className="text-xl sm:text-3xl font-medium font-poppins text-primary mb-6">
        Exams
      </h2>

      <Table
        header={header}
        data={exams}
        isLoading={isExamsLoading}
        notUsers={true}
      />
    </>
  );
}
