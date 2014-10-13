// Note: jquery is required, e.g., http://code.jquery.com/jquery-1.8.3.js

function is_holiday(date, holidays, timezone) {
    // Note that {date} is a Date object, but {holidays} is an array of strings,
    // like ["12/25/2014"]
    "use strict";
    var i, holiday;
    if (timezone === undefined) {
        timezone = 'PST';
    }
    for (i = 0; i < holidays.length; i += 1) {
        holiday = new Date(holidays[i] + " 00:00:00 " + timezone);
        if (date.getTime() === holiday.getTime()) {
            return true;
        }
    }
    return false;
}

function is_business_day(date, holidays) {
    "use strict";
    var dateIgnoreTime;
    if (date.getDay() === 0 || date.getDay() === 6) {
        // ASSERT: day is Sunday or Saturday
        return false;
    }
    // Make a copy of {date} and set it to midnight
    var dateIgnoreTime = new Date(date.getTime());
    dateIgnoreTime.setHours(0, 0, 0, 0);
    if (is_holiday(dateIgnoreTime, holidays)) {
        return false;
    }
    return true;
}
