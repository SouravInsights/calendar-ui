import React from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";

const CalendarControls = ({
  setPrevYear,
  setPrevMonth,
  setNextYear,
  setNextMonth,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  date
}) => {
  return (
    <div className="flex flex-row justify-between text-base bg-blue-600 text-white border border-black border-solid">
      <div className="flex flex-row">
        <button
          className="px-2.5"
          tabIndex="0"
          onClick={setPrevYear}
          onKeyPress={prevYear}
          aria-label="Previous year"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>
        <button
          className="px-2.5"
          tabIndex="0"
          onClick={setPrevMonth}
          onKeyPress={prevMonth}
          aria-label="Previous month"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      </div>
      <div className="px-4" role="heading">
        <b>{format(date, "MMMM yyyy")}</b>
      </div>
      <div className="flex flex-row">
        <button
          className="px-2.5"
          tabIndex="0"
          onClick={setNextMonth}
          onKeyPress={nextMonth}
          aria-label="Next year"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          className="px-2.5"
          tabIndex="0"
          onClick={setNextYear}
          onKeyPress={nextYear}
          aria-label="Next year"
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>
    </div>
  );
};

export default CalendarControls;
