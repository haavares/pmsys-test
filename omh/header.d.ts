import { ISchemaID } from './schemas';
import "moment-timezone";
export declare type Modality = 'sensed' | 'self-reported';
export interface IAcquisitionProvenance {
    source_name: string;
    source_creation_date_time: Date;
    modality: Modality;
}
export declare class AcquisitionProvenance implements IAcquisitionProvenance {
    source_name: string;
    source_creation_date_time: Date;
    modality: Modality;
    constructor(source_name: string, source_creation_date_time: Date, modality: Modality);
}
export declare const PMSYS_2_0_PROVENANCE: AcquisitionProvenance;
export interface IHeader {
    id: string;
    creation_date_time: Date;
    schema_id: ISchemaID;
    acuisition_provenance?: IAcquisitionProvenance;
    user_id: string;
}
