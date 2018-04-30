import moment from 'moment';
import { UUID } from 'angular2-uuid';
import { CurrentDateTimeFrame, SchemaID, SchemaVersion, PMSYS_2_0_PROVENANCE } from '../omh/index';
export var ValidBodyParts = [
    'head_neck',
    'chest',
    'stomach_back',
    'groin_hip',
    'left_shoulder',
    'left_upper_arm',
    'left_elbow',
    'left_forearm',
    'left_hand',
    'left_thigh',
    'left_knee',
    'left_leg',
    'left_foot',
    'right_shoulder',
    'right_upper_arm',
    'right_elbow',
    'right_forearm',
    'right_hand',
    'right_thigh',
    'right_knee',
    'right_leg',
    'right_foot',
];
export var ValidSeverities = [
    'normal',
    'minor',
    'major',
];
var INJURY_1_0_SCHEMA = new SchemaID("corporesano", "injury", new SchemaVersion(1, 0));
var PMSYSInjuryHeader = /** @class */ (function () {
    function PMSYSInjuryHeader(user_id) {
        this.user_id = user_id;
        this.id = UUID.UUID();
        this.creation_date_time = moment.tz(moment.tz.guess()).toDate();
        this.schema_id = INJURY_1_0_SCHEMA;
        this.acuisition_provenance = PMSYS_2_0_PROVENANCE;
    }
    ;
    return PMSYSInjuryHeader;
}());
var Injury = /** @class */ (function () {
    function Injury(effective_time_frame, injuries, comment) {
        this.effective_time_frame = effective_time_frame;
        this.injuries = injuries;
        this.comment = comment;
    }
    Injury.fromBasicValues = function (injuries, comment) {
        return new Injury(new CurrentDateTimeFrame(), injuries, comment);
    };
    ;
    return Injury;
}());
export { Injury };
export function isInjury(t) {
    var i = t;
    if (i.effective_time_frame === undefined) {
        return false;
    }
    if (i.injuries === undefined) {
        return false;
    }
    if (i.comment === undefined) {
        return false;
    }
    return true;
}
var InjuryHeader = /** @class */ (function () {
    function InjuryHeader(user_id) {
        this.user_id = user_id;
        this.id = UUID.UUID();
        this.creation_date_time = moment.tz(moment.tz.guess()).toDate();
        this.schema_id = INJURY_1_0_SCHEMA;
        this.acuisition_provenance = PMSYS_2_0_PROVENANCE;
    }
    ;
    return InjuryHeader;
}());
var InjuryDataPoint = /** @class */ (function () {
    function InjuryDataPoint(user_id, body) {
        this.header = new InjuryHeader(user_id);
        this.body = body;
    }
    ;
    return InjuryDataPoint;
}());
export { InjuryDataPoint };
