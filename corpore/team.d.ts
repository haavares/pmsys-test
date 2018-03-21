import { IDataPointQuery } from '../omh';
export interface ITeamQueryInput {
    id: string;
}
export interface ITeamShort {
    name: string;
    id: string;
}
export interface ITeam extends ITeamShort {
    email: string;
    description: string;
    players: Array<string>;
    coaches: Array<string>;
}
export declare function isTeamShort(t: any): t is ITeamShort;
export declare function isTeam(t: any): t is ITeam;
export interface ITeamDataQuery extends IDataPointQuery {
    teamId: string;
}
