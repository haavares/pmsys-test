import { IDurationUnitValue, DurationUnitValue, ITimeFrame, SchemaID, IHeader, IDataPoint } from '../omh';
export interface ISleep {
    duration: IDurationUnitValue;
    quality: number;
}
export declare class EmptySleep implements ISleep {
    duration: DurationUnitValue;
    quality: number;
}
export declare class Sleep implements ISleep {
    duration: DurationUnitValue;
    quality: number;
    constructor(duration: DurationUnitValue, quality: number);
    static fromBasicValues(durationInMinutes: number, quality: number): Sleep;
}
export declare const WELLNESS_1_0_SCHEMA: SchemaID;
export declare const WELLNESS_1_1_SCHEMA: SchemaID;
export interface IWellness_1_0 {
    effective_time_frame: ITimeFrame;
    readiness: number;
    fatigue: number;
    sleep: ISleep;
    soreness: number;
    stress: number;
    mood: number;
}
export interface IWellness_1_1 {
    effective_time_frame: ITimeFrame;
    readiness: number;
    fatigue: number;
    sleep: ISleep;
    soreness: number;
    soreness_area: number[];
    stress: number;
    mood: number;
}
export interface IWellness {
    effective_time_frame: ITimeFrame;
    readiness: number;
    fatigue: number;
    sleep: ISleep;
    soreness: number;
    soreness_area: number[];
    stress: number;
    mood: number;
}
export declare class Wellness implements IWellness {
    effective_time_frame: ITimeFrame;
    readiness: number;
    fatigue: number;
    sleep: ISleep;
    soreness: number;
    soreness_area: number[];
    stress: number;
    mood: number;
    constructor(effective_time_frame: ITimeFrame, readiness: number, fatigue: number, sleep: ISleep, soreness: number, soreness_area: number[], stress: number, mood: number);
    static fromBasicValues(date: Date, readiness: number, fatigue: number, sleepQuality: number, sleepMinutes: number, soreness: number, soreness_area: number[], stress: number, mood: number): Wellness;
}
export declare function isWellness(t: any): t is IWellness;
export declare class WellnessDataPoint implements IDataPoint<IWellness> {
    header: IHeader;
    body: IWellness;
    constructor(user_id: string, body: IWellness);
}
