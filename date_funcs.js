// Note: jquery is required, e.g., http://code.jquery.com/jquery-1.8.3.js

function date_plus_business_days(date_start, num_days_business, holidays) {
    "use strict";
    var ONE_DAY, current_date, num_days_so_far;
    ONE_DAY = 24 * 60 * 60 * 1000;
    current_date = date_start + ONE_DAY;
    num_days_so_far = 0;
    while (num_days_so_far < num_days_business) {
        if (is_business_day(current_date, holidays)) {
            ++num_days_so_far;
        }
        if (num_days_so_far < num_days_business) {
            current_date += ONE_DAY;
        }
    }
    return current_date;
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

function is_holiday(date, holidays, timezone) {
    // Note that {date} is a Date object, but {holidays} is an array of strings,
    // like ["12/25/2014"]
    "use strict";
    var date_no_time, holiday, i;
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
