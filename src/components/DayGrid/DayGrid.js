import React, { memo, useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import {
  startOfMonth,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  isEqual,
} from "date-fns";
import { chunk } from "lodash";

const DayGrid = () => {
  const {
    selectedDate,
    handleCalendarKeyPress,
    handleDateSelection,
  } = useContext(CalendarContext);
  return (
    <div className="grid">
      <table
        className="focus:outline-none"
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
                  <GridDay
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

export default DayGrid;

const GridDay = memo(({ day, date, onClick, value }) => {
  return (
    <td
      /* The expression inside the placeholder of the template literal string,
          evaluates to be active based on the isEqual condition.
          Cells will only be active either when they are hovered or clicked. 
       */
      className={`border text-center border-solid border-gray-300 py-14 text-sm text-gray-700 hover:text-white hover:bg-blue-400  ${
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
