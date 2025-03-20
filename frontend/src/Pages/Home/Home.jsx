import React from "react";
import Header from "../../Components/Website/Header";
import Footer from "../../Components/Website/Footer";

const OffersItems = [
  {
    id: "offer-1",
    imgSrc: "/pexels-andy-barbour-6684360.jpg",
    alt: "Consultation notes",
    title: "Consultation of school notes and reports.",
    content:
      "Access your child's grades and report cards online, anytime. Track their progress with ease.",
  },
  {
    id: "offer-2",
    imgSrc: "/college-4126481_1920.jpg",
    alt: "college",
    title: "Access to the exam and school events calendar.",
    content:
      "Easily access the exam and school events calendar to track key dates, anticipate deadlines and efficiently organize your child's school career.",
  },
  {
    id: "offer-3",
    imgSrc: "/classroom-2787754_1920.jpg",
    alt: "board",
    title: "Monitoring absences and teacher comments.",
    content:
      "Track your child's absences in real time and view teacher comments to better support their academic progress and progress in class.",
  },
];

export default function Home() {
  const showOffers = OffersItems.map((item) => (
    <div key={item.id}>
      <div className="h-50 md:h-70 overflow-hidden rounded-md mb-4">
        <img
          src={item.imgSrc}
          alt={item.alt}
          className="h-full w-full object-cover"
        />
      </div>
      <h2 className="text-[1.2rem] sm:text-2xl font-poppins font-medium text-primary mb-2">
        {item.title}
      </h2>
      <p className="font-poppins text-gray-600 text-[.95rem] sm:text-lg">
        {item.content}
      </p>
    </div>
  ));
  return (
    <>
      <Header />
      <main className=" mt-[15vh] sm:mt-[20vh] px-5 md:px-16">
        <h1 className="text-[1.4rem] sm:text-4xl font-poppins font-bold text-primary text-center pt-6">
          Welcome to Parent's Space
        </h1>
        <p className="text-center mt-1 sm:mt-2 text-gray-400 font-poppins text-sm sm:text-lg">
          Our site offers you the possibility of
        </p>

        <div className="flex flex-col w-full mt-12 mb-23 space-y-16">
          {showOffers}
        </div>
      </main>
      <Footer />
    </>
  );
}
