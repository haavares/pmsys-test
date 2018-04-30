import { IDataPoint, ITimeFrame, IHeader } from '../omh/index';
export declare const ValidBodyParts: string[];
export declare const ValidSeverities: string[];
export interface IInjury {
    effective_time_frame: ITimeFrame;
    injuries: {
        [body_part: string]: string;
    };
    comment: string;
}
export declare class Injury implements IInjury {
    effective_time_frame: ITimeFrame;
    injuries: {};
    comment: string;
    static fromBasicValues(injuries: {}, comment: string): Injury;
    constructor(effective_time_frame: ITimeFrame, injuries: {}, comment: string);
}
export declare function isInjury(t: any): t is IInjury;
export declare class InjuryDataPoint implements IDataPoint<IInjury> {
    header: IHeader;
    body: IInjury;
    constructor(user_id: string, body: IInjury);
}
