import { IDataPoint, ITimeFrame, IHeader } from '../omh/index';
export interface IParticipation {
    effective_time_frame: ITimeFrame;
    going: string;
    comment: string;
}
export declare class Participation implements IParticipation {
    effective_time_frame: ITimeFrame;
    going: string;
    comment: string;
    static fromBasicValues(going: string, comment: string): Participation;
    constructor(effective_time_frame: ITimeFrame, going: string, comment: string);
}
export declare function isParticipation(t: any): t is IParticipation;
export declare class ParticipationDataPoint implements IDataPoint<IParticipation> {
    header: IHeader;
    body: IParticipation;
    constructor(user_id: string, body: IParticipation);
}
