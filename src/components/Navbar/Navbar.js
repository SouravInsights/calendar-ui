import React, { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import CalendarControls from "../Calendar/CalendarControls";
import { format } from "date-fns";

const Navbar = () => {
  const {
    selectedDate,
    setNextDay,
    setPreviousDay,
    handleKeyPress,
  } = useContext(CalendarContext);

  return (
    <nav className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <CalendarControls
              variant="day"
              nextDay={(e) => handleKeyPress(e, setNextDay)}
              prevDay={(e) => handleKeyPress(e, setPreviousDay)}
              setPrevDay={setPreviousDay}
              setNextDay={setNextDay}
              date={selectedDate}
            />
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button  */}
            <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {/* 
                  Heroicon name: menu
    
                  Menu open: "hidden", Menu closed: "block"
                 */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
