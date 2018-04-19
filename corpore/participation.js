import moment from 'moment';
import { UUID } from 'angular2-uuid';
import { CurrentDateTimeFrame, SchemaID, SchemaVersion, PMSYS_2_0_PROVENANCE } from '../omh/index';
var PARTICIPATION_1_0_SCHEMA = new SchemaID("corporesano", "participation", new SchemaVersion(1, 0));
var PMSYSParticipationHeader = /** @class */ (function () {
    function PMSYSParticipationHeader(user_id) {
        this.user_id = user_id;
        this.id = UUID.UUID();
        this.creation_date_time = moment.tz(moment.tz.guess()).toDate();
        this.schema_id = PARTICIPATION_1_0_SCHEMA;
        this.acuisition_provenance = PMSYS_2_0_PROVENANCE;
    }
    ;
    return PMSYSParticipationHeader;
}());
var Participation = /** @class */ (function () {
    function Participation(effective_time_frame, going, comment) {
        this.effective_time_frame = effective_time_frame;
        this.going = going;
        this.comment = comment;
    }
    Participation.fromBasicValues = function (going, comment) {
        return new Participation(new CurrentDateTimeFrame(), going, comment);
    };
    ;
    return Participation;
}());
export { Participation };
export function isParticipation(t) {
    var i = t;
    if (i.effective_time_frame === undefined) {
        return false;
    }
    if (i.going === undefined) {
        return false;
    }
    if (i.comment === undefined) {
        return false;
    }
    return true;
}
var ParticipationHeader = /** @class */ (function () {
    function ParticipationHeader(user_id) {
        this.user_id = user_id;
        this.id = UUID.UUID();
        this.creation_date_time = moment.tz(moment.tz.guess()).toDate();
        this.schema_id = PARTICIPATION_1_0_SCHEMA;
        this.acuisition_provenance = PMSYS_2_0_PROVENANCE;
    }
    ;
    return ParticipationHeader;
}());
var ParticipationDataPoint = /** @class */ (function () {
    function ParticipationDataPoint(user_id, body) {
        this.header = new ParticipationHeader(user_id);
        this.body = body;
    }
    ;
    return ParticipationDataPoint;
}());
export { ParticipationDataPoint };
