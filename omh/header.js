import * as moment from 'moment';
import "moment-timezone";
;
var AcquisitionProvenance = /** @class */ (function () {
    function AcquisitionProvenance(source_name, source_creation_date_time, modality) {
        this.source_name = source_name;
        this.source_creation_date_time = source_creation_date_time;
        this.modality = modality;
    }
    ;
    return AcquisitionProvenance;
}());
export { AcquisitionProvenance };
export var PMSYS_2_0_PROVENANCE = new AcquisitionProvenance("PMSYS-2-0", moment.tz(moment.tz.guess()).toDate(), "self-reported");
