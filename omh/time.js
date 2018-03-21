var EmptyTimeFrame = /** @class */ (function () {
    function EmptyTimeFrame() {
        this.date_time = new Date();
    }
    return EmptyTimeFrame;
}());
export { EmptyTimeFrame };
var CurrentDateTimeFrame = /** @class */ (function () {
    function CurrentDateTimeFrame() {
        this.date_time = new Date();
    }
    return CurrentDateTimeFrame;
}());
export { CurrentDateTimeFrame };
var DateTimeFrame = /** @class */ (function () {
    function DateTimeFrame(date_time) {
        this.date_time = date_time;
    }
    return DateTimeFrame;
}());
export { DateTimeFrame };
var DurationUnitValue = /** @class */ (function () {
    function DurationUnitValue(value, unit) {
        this.value = value;
        this.unit = unit;
    }
    return DurationUnitValue;
}());
export { DurationUnitValue };
var EndDateTimeInterval = /** @class */ (function () {
    function EndDateTimeInterval(date, duration) {
        this.end_date_time = date;
        this.duration = duration;
    }
    return EndDateTimeInterval;
}());
export { EndDateTimeInterval };
export function isEndDateTimeInterval(t) {
    if (t == null)
        return null;
    return t.end_date_time !== undefined && t.duration !== undefined;
}
export function isStartDateTimeInterval(t) {
    if (t == null)
        return null;
    return t.start_date_time !== undefined && t.duration !== undefined;
}
export function isStartAndEndDateTimeInterval(t) {
    if (t == null)
        return null;
    return t.start_date_time !== undefined && t.end_date_time !== undefined;
}
export function isPartOfDayTimeInterval(t) {
    if (t == null)
        return null;
    return t.part_of_day !== undefined;
}
export function durationUnitValueToSeconds(a) {
    switch (a.unit) {
        case "ps":
            return a.value * Math.pow(10, (-12));
        case "ns":
            return a.value * Math.pow(10, (-9));
        case "us":
            return a.value * Math.pow(10, (-6));
        case "ms":
            return a.value * Math.pow(10, (-3));
        case "sec":
            return a.value * 1.0;
        case "min":
            return a.value * 60.0;
        case "h":
            return a.value * 60.0 * 60;
        case "d":
            return a.value * 24 * 60.0 * 60.0;
        case "wk":
            return a.value * 7 * 24 * 60.0 * 60.0;
        default:
            throw "Unknown time unit " + a.unit;
    }
}
export function toDurationInputArg2(unit) {
    switch (unit) {
        case 'ps':
        case 'ns':
        case 'us':
            throw "Time granularity ps/ns/us not supported.";
        case 'ms':
            return 'milliseconds';
        case 'sec':
            return 'seconds';
        case 'min':
            return 'minutes';
        case 'h':
            return 'hours';
        case 'd':
            return 'day';
        case 'wk':
            return 'weeks';
        case 'Mo':
            return 'months';
        case 'yr':
            return 'years';
        default:
            throw "unknown timeunit " + unit;
    }
}
/*
 * Return the end date from a time interval object.
 *
 * Throws an error for part-of-day interval objects.
 */
export function endDateTimeFromTimeInterval(t) {
    if (isEndDateTimeInterval(t)) {
        return t.end_date_time;
    }
    else if (isStartDateTimeInterval(t)) {
        var num = durationUnitValueToSeconds(t.duration);
        var t2 = t.start_date_time;
        t2.setSeconds(t2.getSeconds() + num);
        return t2;
    }
    else if (isStartAndEndDateTimeInterval(t)) {
        return t.end_date_time;
    }
    else if (isPartOfDayTimeInterval(t)) {
        throw "Part-of-Day TimeIntervals are not supported";
    }
    else
        throw "Unsupported time interval type " + t;
}
