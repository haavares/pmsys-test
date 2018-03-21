import moment from 'moment';
import { UUID } from 'angular2-uuid';
import { EndDateTimeInterval, DurationUnitValue, isStartAndEndDateTimeInterval, isEndDateTimeInterval, isStartDateTimeInterval, isPartOfDayTimeInterval, durationUnitValueToSeconds, SchemaID, SchemaVersion, PMSYS_2_0_PROVENANCE } from '../omh/index';
var SESSION_RPE_1_0_SCHEMA = new SchemaID("corporesano", "srpe", new SchemaVersion(1, 0));
var PMSYSRPEHeader = /** @class */ (function () {
    function PMSYSRPEHeader(user_id) {
        this.user_id = user_id;
        this.id = UUID.UUID();
        this.creation_date_time = moment.tz(moment.tz.guess()).toDate();
        this.schema_id = SESSION_RPE_1_0_SCHEMA;
        this.acuisition_provenance = PMSYS_2_0_PROVENANCE;
    }
    ;
    return PMSYSRPEHeader;
}());
var EmptyEndDateTimeSessionRPE = /** @class */ (function () {
    function EmptyEndDateTimeSessionRPE() {
        this.activity_names = [];
        this.time_interval = new EndDateTimeInterval(new Date(), new DurationUnitValue(0, 'min'));
        this.perceived_exertion = 0;
    }
    return EmptyEndDateTimeSessionRPE;
}());
export { EmptyEndDateTimeSessionRPE };
/*
 * Compute session RPE value from datapoint.
 *
 * If recorded time interval is part of day, an error will be returned.
 */
export function computeSessionRPE(val) {
    var ti = val.body.time_interval;
    if (isStartDateTimeInterval(ti)) {
        return val.body.perceived_exertion * durationUnitValueToSeconds(ti.duration) / 60;
    }
    else if (isEndDateTimeInterval(ti)) {
        return val.body.perceived_exertion * durationUnitValueToSeconds(ti.duration) / 60;
    }
    else if (isStartAndEndDateTimeInterval(ti)) {
        var m = moment(ti.end_date_time);
        return val.body.perceived_exertion * m.diff(moment(ti.start_date_time), 'seconds', true) / 60; // true = floating point                
    }
    else if (isPartOfDayTimeInterval(ti)) {
        throw "Part-of-Day time intervals are not supported for session RPE computations";
    }
    else {
        throw "Not supported time interval type";
    }
}
var SessionRPE = /** @class */ (function () {
    function SessionRPE(activity_names, time_interval, perceived_exertion) {
        this.activity_names = activity_names;
        this.time_interval = time_interval;
        this.perceived_exertion = perceived_exertion;
    }
    ;
    SessionRPE.fromBasicValues = function (activity_names, end_date_time, durationInMinutes, perceived_exertion) {
        return new SessionRPE(activity_names, new EndDateTimeInterval(end_date_time, new DurationUnitValue(durationInMinutes, 'min')), perceived_exertion);
    };
    return SessionRPE;
}());
export { SessionRPE };
export function isSessionRPE(t) {
    var i = t;
    if (i.activity_names === undefined)
        return false;
    if (i.time_interval === undefined)
        return false;
    if (i.perceived_exertion === undefined)
        return false;
    return true;
}
var SessionRPEDataPoint = /** @class */ (function () {
    function SessionRPEDataPoint(user_id, body) {
        this.header = new PMSYSRPEHeader(user_id);
        this.body = body;
    }
    ;
    return SessionRPEDataPoint;
}());
export { SessionRPEDataPoint };
