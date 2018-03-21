import { IDataPoint, TimeInterval, IHeader } from '../omh/index';
export declare class EmptyEndDateTimeSessionRPE implements ISessionRPE {
    activity_names: string[];
    time_interval: TimeInterval;
    perceived_exertion: number;
}
export declare function computeSessionRPE(val: IDataPoint<ISessionRPE>): number;
export interface ISessionRPE {
    activity_names: string[];
    time_interval: TimeInterval;
    perceived_exertion: number;
}
export declare class SessionRPE implements ISessionRPE {
    activity_names: string[];
    time_interval: TimeInterval;
    perceived_exertion: number;
    constructor(activity_names: string[], time_interval: TimeInterval, perceived_exertion: number);
    static fromBasicValues(activity_names: string[], end_date_time: Date, durationInMinutes: number, perceived_exertion: number): SessionRPE;
}
export declare function isSessionRPE(t: any): t is ISessionRPE;
export declare class SessionRPEDataPoint implements IDataPoint<ISessionRPE> {
    header: IHeader;
    body: ISessionRPE;
    constructor(user_id: string, body: ISessionRPE);
}
