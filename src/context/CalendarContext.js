import React, { createContext, useState } from "react";
import {
  format,
  startOfMonth,
  subMonths,
  addMonths,
  subYears,
  addYears,
  subWeeks,
  addWeeks,
  subDays,
  addDays,
} from "date-fns";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  /* State for the selected date */
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        setNextDay,
        setPreviousDay,
        setNextWeek,
        setPreviousWeek,
        setDateNextMonth,
        setDatePreviousMonth,
        setMonthStart,
        setDateNextYear,
        setDatePreviousYear,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
