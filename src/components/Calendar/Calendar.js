import React, { useState, memo } from "react";
import {
  format,
  startOfMonth,
  subMonths,
  addMonths,
  subYears,
  addYears,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  isEqual,
  subWeeks,
  addWeeks,
  subDays,
  addDays,
} from "date-fns";
import { chunk } from "lodash";
import CalendarControls from "./CalendarControls";
import { CalendarContext } from "../../context/CalendarContext";

import "./Calendar.css";

// Calendar component
const Calendar = ({ date, handleSelectDate, closeCalendar }) => {
  /* State for the selected date */
  const [selectedDate, setSelectedDate] = useState(new Date(date));
  console.log("The selected date is:", selectedDate);

  /* Function to handle navigations to go to previous day.  */
  const setPreviousDay = () => {
    // Substracts 1 day from the selectedDate and stores it to previousDay
    const previousDay = subDays(selectedDate, 1);
    // Set the state of previousDay to the selectedDate
    setSelectedDate(previousDay);
    console.log("The previous day is:", previousDay);
  };

  /* Function to handle navigations to next day.  */
  const setNextDay = () => {
    // Increments the selectedDate by 1 day
    const nextDay = addDays(selectedDate, 1);
    // Set the state of nextDay to the selectedDate
    setSelectedDate(nextDay);
    console.log("The next day is:", nextDay);
  };

  /* Function to handle navigations to previous week.  */
  const setPreviousWeek = () => {
    // Decrements the selectedDate by 1 week
    const previousWeek = subWeeks(selectedDate, 1);
    // Set the state of previousWeek to the selectedDate
    setSelectedDate(previousWeek);
    console.log("The previous week is:", previousWeek);
  };

  /* Function to handle navigations to next week. */
  const setNextWeek = () => {
    // Increments the selectedDate by 1 week
    const nextWeek = addWeeks(selectedDate, 1);
    // Set the state of nextWeek to the selectedDate
    setSelectedDate(nextWeek);
    console.log("The next week is:", nextWeek);
  };

  /* Function to handle navigations to previous month. */
  const setDatePreviousMonth = () => {
    // Decrements the selectedDate by 1 month
    setSelectedDate(subMonths(selectedDate, 1));
  };

  /* Function to handle navigations to next month.  */
  const setDateNextMonth = () => {
    // Increments the selectedDate by 1 month and sets the selectedDate
    setSelectedDate(addMonths(selectedDate, 1));
  };

  /* Function to handle the state of previous year. */
  const setDatePreviousYear = () => {
    setSelectedDate(subYears(selectedDate, 1));
  };

  /* Function to handle the state of next year. */
  const setDateNextYear = () => {
    setSelectedDate(addYears(selectedDate, 1));
  };

  /* Function to handle the state of month start. */
  const setMonthStart = () => {
    setSelectedDate(startOfMonth(selectedDate));
  };

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
