import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarProvider } from "../context/CalendarContext";
import Calendar from "../components/Calendar/Calendar";
import Navbar from "../components/Navbar/Navbar";
/* import CalendarControls from "../components/Calendar/CalendarControls"; */

function Home() {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dddd"));
  const handleSelectDate = (date) => {
    setDate(date);
  };

  return (
    <CalendarProvider date={date}>
      <Navbar />
      <div className="flex justify-center pt-12">
        <Calendar handleSelectDate={handleSelectDate} />
      </div>
    </CalendarProvider>
  );
}

export default Home;
