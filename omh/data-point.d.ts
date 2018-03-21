import { IHeader } from './header';
export interface IDataPointShort {
    header: IHeader;
}
export interface IDataPoint<T> extends IDataPointShort {
    body: T;
}
export interface IDataPointQuery {
    schema_namespace?: string;
    schema_name?: string;
    schema_version?: string;
    created_on_or_after?: Date;
    created_before?: Date;
    skip?: number;
    limit?: number;
}
export declare class DataPoint<T> implements IDataPoint<T> {
    header: IHeader;
    body: T;
    constructor(header: IHeader, body: T);
}
