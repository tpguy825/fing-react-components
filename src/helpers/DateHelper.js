/*
 * Copyright (c) Fing. All rights reserved.
 */

import intl from 'react-intl-universal';
import {getCurrentLocale} from "./LocaleHelper";

export const DATE_FORMAT_RECENT = "recent";
export const DATE_FORMAT_SHORT = "short";
export const DATE_FORMAT_LONG = "long";
export const DATE_FORMAT_SMART = "smart";

export const MS_ONE_MINUTE = 60000;
export const MS_ONE_HOUR = MS_ONE_MINUTE * 60;
export const MS_ONE_DAY = MS_ONE_HOUR * 24;
export const MS_ONE_WEEK = MS_ONE_DAY * 7;
export const MS_ONE_MONTH = MS_ONE_DAY * 30;
export const MS_FIVE_WEEK = MS_ONE_WEEK * 5;
export const MS_ONE_YEAR = 365 * MS_ONE_DAY;

export const TIME_DISTANCE_TODAY = "TODAY";
export const TIME_DISTANCE_YESTERDAY = "YESTERDAY";
export const TIME_DISTANCE_7D = "7D";
export const TIME_DISTANCE_14D = "14D";
export const TIME_DISTANCE_21D = "32D";
export const TIME_DISTANCE_OLDER = "OLDER";

/**
 * Formats the given amount as a duration.
 *
 * @param timeInMillis The amount of time elapsed, in millis. Can be a string or a number
 * @param size The size, either DATE_FORMAT_SHORT or DATE_FORMAT_LONG
 * @param approx A boolean to flag if the amount should be rounded
 * @return {string} The formatted string
 */
export function formatDuration(timeInMillis, size, approx) {
    if (typeof timeInMillis === 'string') {
        timeInMillis = parseInt(timeInMillis, 10);
    } else if (typeof timeInMillis !== 'number') {
        return "NaN";
    }

    let secs = Math.floor(timeInMillis / 1000);
    let days = Math.floor(secs / 86400);
    secs -= (days * 86400);
    let hours = Math.floor(secs / 3600);
    secs -= (hours * 3600);
    let minutes = Math.floor(secs / 60);

    if (approx) {
        if (minutes > 45) {
            ++hours;
            minutes = 0;
        } else if ((days > 0 || hours > 0) && minutes < 15) {
            minutes = 0;
        }
        if (days > 0) {
            minutes = 0;
            if (hours <= 3) {
                hours = 0;
            } else if (hours >= 18) {
                hours = 0;
                ++days;
            }
        }
        if (hours >= 24) {
            days += hours / 24;
            hours = hours % 24;
        }
    }

    if (size === DATE_FORMAT_SHORT) {
        let elements = [];
        if (days > 0) {
            elements.push(intl.get("duration_day_short", { amount: days }));
        }

        if ((hours > 0) /*|| (days > 0)*/) {
            elements.push(intl.get("duration_hour_short", { amount: hours }));
        }

        if (minutes > 0 || elements.length === 0) {
            elements.push(intl.get("duration_min_short", { amount: minutes }));
        }
        return elements.join(" ");
    } else {
        let elements = [];
        if (days > 0) {
            elements.push(intl.get("duration_day_long", { amount: days }));
        }

        if ((hours > 0) /*|| (days > 0)*/) {
            elements.push(intl.get("duration_hour_long", { amount: hours }));
        }

        if (minutes > 0 || elements.length === 0) {
            if (elements.length > 0) {
                elements.push(intl.get('duration_min_long', { amount: minutes }));
            } else {
                elements.push(intl.get('duration_minute_long', { amount: minutes }));
            }
        }
        return elements.join(", ");
    }

}

/**
 * Formats an absolute time.
 *
 * @param timestamp The amount of time. Can be a string, a number or a Date
 * @param size The size, either DATE_FORMAT_SHORT, DATE_FORMAT_LONG or DATE_FORMAT_SMART
 * @return {string}
 */
export function formatAbsoluteDate(timestamp, size) {
    if (!timestamp) return "";

    if (timestamp instanceof Date) {
        timestamp = fixTimestampMillis(timestamp.getTime());
    } else if (typeof timestamp === 'string') {
        timestamp = fixTimestampMillis(parseInt(timestamp, 10));
    } else if (typeof timestamp === 'number') {
        timestamp = fixTimestampMillis(timestamp);
    } else {
        return "NaN";
    }

    const startDate = new Date(timestamp);
    const locale = getCurrentLocale();

    let options = {month: 'short', year: 'numeric'};
    if (size === DATE_FORMAT_RECENT) {
        options = {month: 'short', day: 'numeric'};
    } else if (size === DATE_FORMAT_SHORT) {
        options = {month: 'short', year: 'numeric'};
    } else if (size === DATE_FORMAT_LONG) {
        options = { day: "numeric", month: 'short', year: 'numeric' };
    } else if (size === DATE_FORMAT_SMART) {
        let nowDate = new Date();
        let within180d = nowDate.getFullYear() === startDate.getFullYear();
        let within30d = within180d && nowDate.getMonth() === startDate.getMonth();
        let within24h = within30d && nowDate.getDate() === startDate.getDate();

        // Just print the time if it's too close
        if (within24h) {
            return startDate.toLocaleTimeString(locale, {hour: 'numeric', minute: 'numeric'});
        }

        options = within30d ? {weekday: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'} :
            within180d ? {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'} :
                {month: 'short', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    }

    return startDate.toLocaleDateString(locale, options);
}
export function formatSmartAbsoluteDate(timestamp) {
    let nowDate = new Date();
    if (typeof timestamp === 'string') {
        timestamp = parseInt(timestamp, 10);
    }
    let startDate = new Date(timestamp);

    let within180d = nowDate.getFullYear() == startDate.getFullYear();
    let within30d = within180d && nowDate.getMonth() == startDate.getMonth();
    let within24h = within30d && nowDate.getDate() == startDate.getDate();

    const options = within24h ? { hour: 'numeric', minute: 'numeric' } :
        within30d ? { weekday: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' } :
            within180d ? { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' } :
                { month: 'short', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const locale = intl.getInitOptions().currentLocale === "pseudo.locale" || !intl.getInitOptions().currentLocale ? "en-US" : intl.getInitOptions().currentLocale; 

    return within24h ? startDate.toLocaleTimeString(locale, options) : startDate.toLocaleDateString(locale, options);
}

export function formatRelativeDate(timestamp, size) {
    if (!timestamp) return "";

    if (timestamp instanceof Date) {
        timestamp = fixTimestampMillis(timestamp.getTime());
    } else if (typeof timestamp === 'string') {
        timestamp = fixTimestampMillis(parseInt(timestamp, 10));
    } else if (typeof timestamp === 'number') {
        timestamp = fixTimestampMillis(timestamp);
    } else {
        return "NaN";
    }

    const locale = getCurrentLocale();

    const now = new Date().getTime();
    const oneMinAgo = now - MS_ONE_MINUTE;
    const oneHourAgo = now - MS_ONE_HOUR;
    const oneDayAgo = now - MS_ONE_DAY;
    const oneWeekAgo = now - MS_ONE_WEEK;
    const oneMonthAgo = now - MS_ONE_MONTH;
    const oneYearAgo = now - MS_ONE_YEAR;
    const fiveWeekAgo = now - MS_FIVE_WEEK;

    if (size === DATE_FORMAT_SHORT) {
        if (timestamp <= 0)
            return "";
        if (timestamp > oneMinAgo)
            return intl.get('relative_now');
        if (timestamp > oneHourAgo) {
            const v = Math.floor((now - timestamp) / MS_ONE_MINUTE + 0.5);
            return intl.get('duration_min_short', { amount: v });
        }
        if (timestamp > oneDayAgo) {
            const v = Math.floor((now - timestamp) / MS_ONE_HOUR + 0.5);
            return intl.get('duration_hour_short', { amount: v });
        }
        if (timestamp > oneMonthAgo) {
            const v = Math.floor((now - timestamp) / MS_ONE_DAY + 0.5);
            return intl.get('duration_day_short', { amount: v });
        }

        // Print the localized name of the month, e.g. "Jan"
        return new Date(timestamp).toLocaleString(locale, {month: "short"});
    } else {
        if (timestamp > oneMinAgo) {
            return intl.get("relative_now");

        } else if (timestamp > oneHourAgo) {
            const v = Math.floor((now - timestamp) / MS_ONE_MINUTE + 0.5);
            return intl.get("relative_minute_long", { amount: v });

        } else if (timestamp > oneDayAgo) {
            const v = Math.floor((now - timestamp) / MS_ONE_HOUR + 0.5);
            return intl.get("relative_hour_long", { amount: v });

        } else if (timestamp > oneWeekAgo) {
            const v = Math.floor((now - timestamp) / MS_ONE_DAY + 0.5);
            return intl.get("relative_day_long", { amount: v });

        } else if (timestamp > fiveWeekAgo) {
            const v = Math.floor((now - timestamp) / MS_ONE_WEEK + 0.5);
            return intl.get("relative_week_long", { amount: v });

        } else if (timestamp > oneYearAgo) {
            const v = Math.floor((now - timestamp) / MS_ONE_MONTH + 0.5);
            return intl.get("relative_month_long", { amount: v });

        } else {
            const v = Math.floor((now - timestamp) / MS_ONE_YEAR + 0.5);
            return intl.get("relative_year_long", { amount: v });
        }
    }
}

/**
 * Checks if the given timestamp is within a given number of days
 * from the reference date.
 * The function checks in ranges of 24h from midnight, therefore:
 * days=0: timestamp is within [Day,Day]
 * days=1: timestamp is within [Day, Day-1]
 * days=7: timestamp is within [Day, Day-7]
 *
 * @param {number} timestamp A timestamp to check
 * @param {number} reference A reference timestamp to check against
 * @param {number} days The distance from the reference date
 * @return {boolean} TRUE if timestamp is in the specified range
 */
export function isWithinDays(timestamp, reference, days) {
    const refDate = new Date(reference);
    const endMillis = refDate.setHours(0, 0, 0, 0) + 24*3600*1000;
    const startMillis = refDate.setHours(-days*24, 0, 0, 0);
    return timestamp >= startMillis && timestamp < endMillis;
}

/**
 * Returns the standard time distance enum, based on the distance between the
 * timestamp and the reference date.
 *
 * @param {number} timestamp The timestamp to map
 * @param {number} reference The timestamp of the reference time (usually, now)
 */
export function standardTimeDistance(timestamp, reference) {
    if (isWithinDays(timestamp, reference, 0)) {
        return TIME_DISTANCE_TODAY;
    } else if (isWithinDays(timestamp, reference, 1)) {
        return TIME_DISTANCE_YESTERDAY;
    } else if (isWithinDays(timestamp, reference, 7)) {
        return TIME_DISTANCE_7D;
    } else if (isWithinDays(timestamp, reference, 14)) {
        return TIME_DISTANCE_14D;
    } else if (isWithinDays(timestamp, reference, 21)) {
        return TIME_DISTANCE_21D;
    } else {
        return TIME_DISTANCE_OLDER;
    }
}
export function standardTimeDistanceForNotification(timestamp, reference) {
    if (isWithinDays(timestamp, reference, 0)) {
        return TIME_DISTANCE_TODAY;
    } else if (isWithinDays(timestamp, reference, 1)) {
        return TIME_DISTANCE_YESTERDAY;
    } else {
        return TIME_DISTANCE_OLDER;
    }
}

function fixTimestampMillis(ts) {
    if (Math.abs(Date.now() - ts) > (15 * MS_ONE_YEAR)) ts *= 1000;
    return ts;
}
/**
 * Returns the number of difference's days from startDate to endDate.
 *
 * @param {Date} startDate The initial date
 * @param {Date} endDate The end date
 */
export function daysDifferenceBetween(startDate, endDate){
    return Math.floor((endDate.getTime() - startDate.getTime()) / 86400000);
}
export function daysDifferenceBetweenUsingTime(endTime, startTime){
    return Math.floor((endTime - startTime) / 86400000);
}

export function daysDifferenceFromNow(difference){
    return ((new Date()).getTime()) - difference * 24 * 3600 * 1000
}


export function formatShortAbsoluteDate(timestamp) {
    let nowDate = new Date();
    if (typeof timestamp === 'string') {
        timestamp = parseInt(timestamp,10);
    }
    let startDate = new Date(timestamp);

    const options = { month: 'short', year: 'numeric' };

    const locale = intl.getInitOptions().currentLocale === "pseudo.locale" || !intl.getInitOptions().currentLocale ? "en-US" : intl.getInitOptions().currentLocale;
    return startDate.toLocaleDateString(locale, options);
}

export function formatHourShort(date) {
    const locale = intl.getInitOptions().currentLocale === "pseudo.locale" || !intl.getInitOptions().currentLocale ? "en-US" : intl.getInitOptions().currentLocale;
    return  date.toLocaleTimeString(locale, { hour: 'numeric' });
}

export function getDayName(date, locale) {
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

export function isWithinDaysString(timestamp, days) {
    const now = new Date().getTime();
    const xAgo = now - (days * MS_ONE_DAY);

    if (typeof timestamp === 'string') {
        timestamp = parseInt(timestamp,10);
    }
    return timestamp > xAgo;
}

export function isInTodayOrYesterday(inputTs, isYesterday) {
    var now = new Date();
    var today = new Date().setHours(0, 0, 0, 0);
    var yesterday = new Date(now.getTime()-86400000).setHours(0,0,0,0); // is the only way
    var inputDate = new Date(parseInt(inputTs,10)).setHours(0, 0, 0, 0);

    if (isYesterday) {
        if (yesterday === inputDate) return true;
    } else if (today === inputDate) {
        return true;
    }

    return false;
}

/**
 * Groups events by time, extracting the timestamp of each event using the extraction function.
 *
 * @param events The Array of events
 * @param extractionFn A function (event)=>(number)
 * @returns {*}
 */
export function groupEventsByTimeDistance(events, extractionFn) {
    const now = new Date().getTime();
    return events.reduce((acc, evt) => {
        let timeGroup = standardTimeDistance(extractionFn(evt), now);
        let list = acc[timeGroup];
        if (!list) {
            list = [];
            acc[timeGroup] = list;
        }
        list.push(evt);
        return acc;
    }, {});
}

export function groupOldNotificationsByTimeDistance(events, extractionFn) {
    const now = new Date().getTime();
    return events.reduce((acc, evt) => {
        let timeGroup = standardTimeDistanceForNotification(extractionFn(evt), now);
        let list = acc[timeGroup];
        if (!list) {
            list = [];
            acc[timeGroup] = list;
        }
        list.push(evt);
        return acc;
    }, {});
}
