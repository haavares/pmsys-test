import { IDataPoint, ITimeFrame, IHeader } from '../omh/index';
export declare const BodyParts: string[];
export declare const Severity: string[];
export declare const IllnessTypes: string[];
export interface IInjury {
    effective_time_frame: ITimeFrame;
    injuries: {
        [body_part: string]: string;
    };
    illness: string;
}
export declare class Injury implements IInjury {
    effective_time_frame: ITimeFrame;
    injuries: {};
    illness: string;
    static fromBasicValues(injuries: {}, illness: string): Injury;
    constructor(effective_time_frame: ITimeFrame, injuries: {}, illness: string);
}
export declare function isInjury(t: any): t is IInjury;
export declare class InjuryDataPoint implements IDataPoint<IInjury> {
    header: IHeader;
    body: IInjury;
    constructor(user_id: string, body: IInjury);
}
