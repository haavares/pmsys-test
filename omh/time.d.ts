import * as moment from 'moment';
export declare type TimeUnit = 'ps' | 'ns' | 'us' | 'ms' | 'sec' | 'min' | 'h' | 'd' | 'wk' | 'Mo' | 'yr';
export declare type PartOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export interface ITimeFrame {
    date_time?: Date;
    time_interval?: TimeInterval;
}
export declare class EmptyTimeFrame implements ITimeFrame {
    date_time: Date;
}
export declare class CurrentDateTimeFrame implements ITimeFrame {
    date_time: Date;
}
export declare class DateTimeFrame implements ITimeFrame {
    date_time: Date;
    constructor(date_time: Date);
}
export interface IDurationUnitValue {
    value: number;
    unit: TimeUnit;
}
export declare class DurationUnitValue implements IDurationUnitValue {
    value: number;
    unit: TimeUnit;
    constructor(value: number, unit: TimeUnit);
}
export interface IEndDateTimeInterval {
    end_date_time: Date;
    duration: IDurationUnitValue;
}
export declare class EndDateTimeInterval implements IEndDateTimeInterval {
    end_date_time: Date;
    duration: IDurationUnitValue;
    constructor(date: Date, duration: IDurationUnitValue);
}
export interface IStartDateTimeInterval {
    start_date_time: Date;
    duration: IDurationUnitValue;
}
export interface IStartAndEndDateTimeInterval {
    start_date_time: Date;
    end_date_time: Date;
}
export interface IPartOfDayTimeInterval {
    date: Date;
    part_of_day: PartOfDay;
}
export declare type TimeInterval = IEndDateTimeInterval | IStartDateTimeInterval | IStartAndEndDateTimeInterval | IPartOfDayTimeInterval;
export declare function isEndDateTimeInterval(t: TimeInterval): t is IEndDateTimeInterval;
export declare function isStartDateTimeInterval(t: TimeInterval): t is IStartDateTimeInterval;
export declare function isStartAndEndDateTimeInterval(t: TimeInterval): t is IStartAndEndDateTimeInterval;
export declare function isPartOfDayTimeInterval(t: TimeInterval): t is IPartOfDayTimeInterval;
export declare function durationUnitValueToSeconds(a: IDurationUnitValue): number;
export declare function toDurationInputArg2(unit: TimeUnit): moment.DurationInputArg2;
export declare function endDateTimeFromTimeInterval(t: TimeInterval): Date;
