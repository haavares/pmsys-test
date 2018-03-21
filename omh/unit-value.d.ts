export interface IUnitValue {
    value: number;
    unit: string;
}
export declare class UnitValue implements IUnitValue {
    value: number;
    unit: string;
    constructor(value: number, unit: string);
}
