import React, { useState, memo } from "react";
import {
  format,
  startOfMonth,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  isEqual,
} from "date-fns";
import { chunk } from "lodash";
import CalendarControls from "./CalendarControls";
import { CalendarContext } from "../../context/CalendarContext";

import "./Calendar.css";

// Calendar component
const Calendar = ({ handleSelectDate, closeCalendar }) => {
  // Use the state and functions from the CalendarContext
  const {
    selectedDate,
    setNextDay,
    setPreviousDay,
    setNextWeek,
    setPreviousWeek,
    setDateNextMonth,
    setDatePreviousMonth,
    setMonthStart,
    setDateNextYear,
    setDatePreviousYear,
  } = React.useContext(CalendarContext);

  /* Accessibility best practices:
     Hotkeys functionality for the calender component.    
  */
  const handleCalendarKeyPress = (e) => {
    const keyCode = e.keyCode;
    // Check if control key was pressed
    // const control = e.ctrlKey;
    switch (keyCode) {
      case 13: //Enter
        handleSelectDate(format(selectedDate, "yyyy-MM-dd"));
        return console.log("Enter clicked");
      case 27: //Esc
        closeCalendar();
        return console.log("Calender closed by keystoke.");
      case 36: //Home
        setMonthStart();
        return;
      case 37: //Left
        setPreviousDay();
        return;
      case 38: //Up
        setPreviousWeek();
        return;
      case 39: //Right
        setNextDay();
        return;
      case 40: //Down
        setNextWeek();
        return;
      default:
        return;
    }
  };

  const handleDateSelection = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    handleSelectDate(dateString);
  };

  const handleKeyPress = (e, cb) => {
    const charCode = e.charCode;
    if (charCode === 13 || charCode === 32) {
      cb(new Error("handleKeyPress never got executed."));
      console.log("handleKeyPress got executed.");
    }
  };

  return (
    <div className="flex flex-col p-0.5 w-72 rounded-md">
      <CalendarControls
        setPrevYear={setDatePreviousYear}
        setPrevMonth={setDatePreviousMonth}
        setNextMonth={setDateNextMonth}
        setNextYear={setDateNextYear}
        prevYear={(e) => handleKeyPress(e, setDatePreviousYear)}
        prevMonth={(e) => handleKeyPress(e, setDatePreviousMonth)}
        nextMonth={(e) => handleKeyPress(e, setDateNextMonth)}
        nextYear={(e) => handleKeyPress(e, setDateNextYear)}
        date={selectedDate}
      />
      <table
        className="mt-4"
        id="grid"
        tabIndex="0"
        onKeyDown={handleCalendarKeyPress}
        role="grid"
        aria-label="Month"
      >
        <thead>
          <tr role="row">
            <th
              className="h-7 text-xs text-gray-500"
              role="columnheader"
              aria-label="Sunday"
            >
              <abbr className="no-underline">Su</abbr>
            </th>
            <th
              className="h-7 text-xs text-gray-500"
              role="columnheader"
              aria-label="Monday"
            >
              <abbr className="no-underline">Mo</abbr>
            </th>
            <th
              className="h-7 text-xs text-gray-500"
              role="columnheader"
              aria-label="Tuesday"
            >
              <abbr className="no-underline">Tu</abbr>
            </th>
            <th
              className="h-7 text-xs text-gray-500"
              role="columnheader"
              aria-label="Wednesday"
            >
              <abbr className="no-underline">We</abbr>
            </th>
            <th
              className="h-7 text-xs text-gray-500"
              role="columnheader"
              aria-label="Thursday"
            >
              <abbr className="no-underline">Th</abbr>
            </th>
            <th
              className="h-7 text-xs  text-gray-500"
              role="columnheader"
              aria-label="Friday"
            >
              <abbr className="no-underline">Fr</abbr>
            </th>
            <th
              className="h-7 text-xs  text-gray-500"
              role="columnheader"
              aria-label="Saturday"
            >
              <abbr className="no-underline">Sa</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {getDaysOfMonth(selectedDate).map((week, i) => (
            <tr key={`week-${i}`} role="row">
              {week.map((day, i) =>
                day ? (
                  <WeekDay
                    day={day}
                    onClick={() => handleDateSelection(day)}
                    date={selectedDate}
                    key={`day-cell-${i}`}
                    value={getDate(day)}
                  />
                ) : (
                  <td></td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Calendar;

// WeekDay Component

/* Using memo here to save some unnecessary rerenders of the entire component. For example, the whole calender shouldn't rerender if we 
switch days within the same month, only those changed should rerender. */
const WeekDay = memo(({ day, date, onClick, value }) => {
  return (
    <td
      /* The expression inside the placeholder of the template literal string,
        evaluates to be active based on the isEqual condition.
        Cells will only be active either when they are hovered or clicked. 
     */
      className={`border text-center border-solid border-gray-300 p-2 text-sm text-gray-700 hover:text-white hover:bg-blue-400  ${
        isEqual(date, day) ? "bg-blue-500 text-white" : ""
      }`}
      onClick={onClick}
      role="gridcell"
      aria-selected={isEqual(date, day)}
    >
      {value}
    </td>
  );
});

// Function to get days of a month
const getDaysOfMonth = (selectedDate) => {
  // Get the number of days in a month of the given date.
  const daysInMonth = getDaysInMonth(selectedDate);
  // startOfMonth returns the start of a month for the given date
  const startWeekday = getDay(startOfMonth(selectedDate));
  const endWeekday = getDay(endOfMonth(selectedDate));
  const gridDays = chunk(
    [
      ...Array.from({ length: startWeekday }).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) =>
        setDate(selectedDate, i + 1)
      ),
      ...Array.from({ length: 6 - endWeekday }).fill(null),
    ],
    7
  );
  console.log(gridDays);
  return gridDays;
};
