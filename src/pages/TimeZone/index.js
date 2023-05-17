import React, { useState } from "react";
import styles from "./index.css";
import moment from "moment-timezone";

const TimezonePage = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC-0");
  var [weekStart, setweekStartDate] = useState(
    moment().clone().startOf("isoWeek")
  );
  const [selectedDate, setSelectedDate] = useState(weekStart);

  const handlePreviousWeek = () => {
    const previousWeekDate = moment(selectedDate).subtract(1, "week");
    setweekStartDate(previousWeekDate);
    setSelectedDate(previousWeekDate);
  };

  const handleNextWeek = () => {
    const nextWeekDate = moment(selectedDate).add(1, "week");
    setweekStartDate(nextWeekDate);
    setSelectedDate(nextWeekDate);
  };

  const handleTimezoneChange = (e) => {
    moment.tz.setDefault(e.target.value);
    setSelectedTimezone(e.target.value);
    setweekStartDate(moment().clone().startOf("isoWeek"));
    setSelectedDate(moment().clone().startOf("isoWeek"));
  };

  const renderWorkingDays = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var workingHours = [];

    for (var i = 0; i <= 15; i++) {
      const amPm = i + 8 >= 12 ? "PM" : "AM";
      workingHours.push(`${i + 8}: 00 ${amPm}`);
      workingHours.push(`${i + 8}: 30 ${amPm}`);
    }

    return (
      <div className="working-days">
        {days.map((day, index) => (
          <div key={day} className="day">
            <div>
              <div className="day-name">{day}</div>
              <p>{moment(weekStart).add(index, "days").format("M /DD")}</p>
            </div>
            <div className="hour-container">
              {moment(moment(weekStart).add(index, "days")).isBefore(
                moment()
              ) &&
              !moment(moment(weekStart).add(index, "days")).isSame(
                moment(),
                "day"
              )
                ? "Past"
                : workingHours.map((hour) => (
                    <div key={hour} className="hour">
                      <input type="checkbox" id={`${day}-${hour}`} />
                      <label
                        htmlFor={`${day}-${hour}`}
                        style={{ border: "1px" }}
                      >
                        {hour}
                      </label>
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="timezone-page">
      
      <div className="swipe-buttons">
        <button onClick={handlePreviousWeek}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />{" "}
          </svg>
          Previous Week
        </button>
        <div className="date">{moment().format("MMMM Do, YYYY hh:mm:ss")}</div>
        <button onClick={handleNextWeek}>
          Next Week
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-right-fill"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />{" "}
          </svg>
        </button>
      </div>
      <h3>Timezone</h3>
      <div className="timezone-select">
        <select value={selectedTimezone} onChange={handleTimezoneChange}>
          <option value="UTC-0">UTC-0</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Pacific/Auckland">New Zealand (NZDT)</option>
        </select>
      </div>
      <div className="working-hours">{renderWorkingDays()}</div>
    </div>
  );
};

export default TimezonePage;
