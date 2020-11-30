import "./App.css";
import React, { useState } from "react";
import { format } from "date-fns";

import Calendar from "./components/Calendar/Calendar";
/* import CalendarControls from "./components/Calendar/CalendarControls"; */

function App() {
  const [showDatepicker, setShowDatePicker] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dddd"));
  const toggleCalendar = (e) => {
    setShowDatePicker(false);
    setShowCalendar(true);
  };
  const handleSelectDate = (date) => {
    setDate(date);
    setShowDatePicker(true);
    setShowCalendar(false);
  };
  const closeCalendar = () => {
    setShowDatePicker(true);
    setShowCalendar(false);
  };

  return (
    <>
      <Calendar
        date={date}
        handleSelectDate={handleSelectDate}
        closeCalendar={closeCalendar}
      />
    </>
  );
}

export default App;
