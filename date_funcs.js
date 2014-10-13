// Note: jquery is required, e.g., http://code.jquery.com/jquery-1.8.3.js

function is_holiday(date, holidays, timezone) {
    // Note that {date} is a Date object, but {holidays} is an array of strings,
    // like ["12/25/2014"]
    "use strict";
    var i, holiday;
    if (timezone === undefined) {
        timezone = 'PST';
    }
    date_no_time = new Date(date.getTime());
    date_no_time.setHours(0, 0, 0, 0);
    for (i = 0; i < holidays.length; i += 1) {
        holiday = new Date(Date.parse(holidays[i]));
        holiday.setHours(0, 0, 0, 0);
        if (date_no_time.getTime() === holiday.getTime()) {
            return true;
        }
    }
    return false;
}

function is_business_day(date, holidays) {
    "use strict";
    if (date.getDay() === 0 || date.getDay() === 6) {
        // ASSERT: day is Sunday or Saturday
        return false;
    }
    if (is_holiday(date, holidays)) {
        return false;
    }
    return true;
}
