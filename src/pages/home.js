import React from "react";
import { CalendarProvider } from "../context/CalendarContext";
import Calendar from "../components/Calendar/Calendar";
import Navbar from "../components/Navbar/Navbar";
import DayGrid from "../components/DayGrid/DayGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <CalendarProvider>
      <Navbar />
      <div className="grid grid-cols-5">
        <div className="h-screen border-r-2 border-gray-300">
          <button className="flex flex-row  items-center mx-auto my-6 px-9 py-3 border-2 text-blue-800 font-semibold rounded-md border-blue-800 hover:bg-blue-800  hover:text-white focus:outline-none focus:ring-2 focus:border-blue-300 focus:bg-blue-800 focus:text-white">
            <FontAwesomeIcon className="blue-800 mx-3" icon={faPlus} />
            Create Event
          </button>
          <Calendar />
        </div>
        <div className="col-span-4 h-screen ">
          <DayGrid />
        </div>
      </div>
    </CalendarProvider>
  );
}

export default Home;
