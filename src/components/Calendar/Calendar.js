import React, { useState } from "react";
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
  addDays
} from "date-fns";
import { chunk } from "lodash";
import CalendarControls from "./CalendarControls";

// Function to generate months of a given date.
const generateMonth = (selectedDate) => {
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
      ...Array.from({ length: 6 - endWeekday }).fill(null)
    ],
    7
  );
  console.log(gridDays);
  return gridDays;
};

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

  /* Function to handle the state of month end. */
  const setMonthEnd = () => {
    setSelectedDate(endOfMonth(selectedDate));
  };

  /* Function to handle the keystroke events for calender navigation. */
  const handleTableKeyPress = (e) => {
    const keyCode = e.keyCode;
    // Check if control key was pressed
    // const control = e.ctrlKey;
    // Use shift key to prevent browser shortcut conflicts
    const control = e.shiftKey;
    switch (keyCode) {
      case 13: //Enter
        handleSelectDate(format(selectedDate, "yyyy-MM-dd"));
        return console.log("Enter clicked");
      case 27: //Esc
        closeCalendar();
        return console.log("Calender closed by keystoke.");
      case 32: //Space
        handleSelectDate(format(selectedDate, "yyyy-MM-dd"));
        return;
      case 33: //Page Up
        control ? setDatePreviousYear() : setDatePreviousMonth();
        return;
      case 34: //Page Down
        control ? setDateNextYear() : setDateNextMonth();
        return;
      case 35: //End
        setMonthEnd();
        return;
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
    <div className="flex flex-col border-black border-solid border p-0.5 w-72">
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
        className="table-auto"
        id="grid"
        tabIndex="0"
        onKeyDown={handleTableKeyPress}
        role="grid"
        aria-label="Month"
      >
        <thead>
          <tr role="row">
            <th className="h-7" role="columnheader" aria-label="Sunday">
              <abbr title="Sunday">Su</abbr>
            </th>
            <th className="h-7" role="columnheader" aria-label="Monday">
              <abbr title="Monday">Mo</abbr>
            </th>
            <th className="h-7" role="columnheader" aria-label="Tuesday">
              <abbr title="Tuesday">Tu</abbr>
            </th>
            <th className="h-7" role="columnheader" aria-label="Wednesday">
              <abbr title="Wednesday">We</abbr>
            </th>
            <th className="h-7" role="columnheader" aria-label="Thursday">
              <abbr title="Thursday">Th</abbr>
            </th>
            <th className="h-7" role="columnheader" aria-label="Friday">
              <abbr title="Friday">Fr</abbr>
            </th>
            <th className="h-7" role="columnheader" aria-label="Saturday">
              <abbr title="Saturday">Sa</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {generateMonth(selectedDate).map((week, i) => (
            <tr key={`week-${i}`} role="row">
              {week.map((day, i) =>
                day ? (
                  <td
                    className={`cell${
                      isEqual(selectedDate, day) ? " active" : ""
                    }`}
                    key={`day-cell-${i}`}
                    onClick={() => handleDateSelection(day)}
                    role="gridcell"
                    aria-selected={isEqual(selectedDate, day)}
                  >
                    {getDate(day)}
                  </td>
                ) : (
                  <td className="empty" key={`day-cell-${i}`}>
                    &nbsp;
                  </td>
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
