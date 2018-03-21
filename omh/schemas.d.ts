export interface ISchemaID {
    namespace: string;
    name: string;
    version: ISchemaVersion;
}
export interface ISchemaVersion {
    major: number;
    minor: number;
}
export declare class SchemaVersion implements ISchemaVersion {
    major: number;
    minor: number;
    constructor(major: number, minor: number);
}
export declare class SchemaID implements ISchemaID {
    namespace: string;
    name: string;
    version: ISchemaVersion;
    constructor(namespace: string, name: string, version: ISchemaVersion);
}
