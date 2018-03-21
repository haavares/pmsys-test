import { DurationUnitValue, CurrentDateTimeFrame, SchemaID, SchemaVersion, PMSYS_2_0_PROVENANCE } from '../omh';
import { UUID } from 'angular2-uuid';
import moment from 'moment';
var EmptySleep = /** @class */ (function () {
    function EmptySleep() {
        this.duration = new DurationUnitValue(0, 'min');
        this.quality = 0;
    }
    return EmptySleep;
}());
export { EmptySleep };
var Sleep = /** @class */ (function () {
    function Sleep(duration, quality) {
        this.duration = duration;
        this.quality = quality;
    }
    Sleep.fromBasicValues = function (durationInMinutes, quality) {
        return new Sleep(new DurationUnitValue(durationInMinutes, 'min'), quality);
    };
    return Sleep;
}());
export { Sleep };
export var WELLNESS_1_0_SCHEMA = new SchemaID('corporesano', 'wellness', new SchemaVersion(1, 0));
export var WELLNESS_1_1_SCHEMA = new SchemaID('corporesano', 'wellness', new SchemaVersion(1, 1));
var Wellness = /** @class */ (function () {
    function Wellness(effective_time_frame, readiness, fatigue, sleep, soreness, soreness_area, stress, mood) {
        this.effective_time_frame = effective_time_frame;
        this.readiness = readiness;
        this.fatigue = fatigue;
        this.sleep = sleep;
        this.soreness = soreness;
        this.soreness_area = soreness_area;
        this.stress = stress;
        this.mood = mood;
    }
    ;
    Wellness.fromBasicValues = function (date, readiness, fatigue, sleepQuality, sleepMinutes, soreness, soreness_area, stress, mood) {
        return new Wellness(new CurrentDateTimeFrame(), readiness, fatigue, Sleep.fromBasicValues(sleepMinutes, sleepQuality), soreness, soreness_area, stress, mood);
    };
    return Wellness;
}());
export { Wellness };
export function isWellness(t) {
    var i = t;
    if (i.effective_time_frame === undefined)
        return false;
    if (i.readiness === undefined)
        return false;
    if (i.fatigue === undefined)
        return false;
    if (i.sleep === undefined)
        return false;
    if (i.soreness === undefined)
        return false;
    if (i.stress === undefined)
        return false;
    if (i.mood === undefined)
        return false;
    return true;
}
var WellnessHeader = /** @class */ (function () {
    function WellnessHeader(user_id) {
        this.user_id = user_id;
        this.id = UUID.UUID();
        this.creation_date_time = moment.tz(moment.tz.guess()).toDate();
        this.schema_id = WELLNESS_1_0_SCHEMA;
        this.acuisition_provenance = PMSYS_2_0_PROVENANCE;
    }
    ;
    return WellnessHeader;
}());
var WellnessDataPoint = /** @class */ (function () {
    function WellnessDataPoint(user_id, body) {
        this.header = new WellnessHeader(user_id);
        this.body = body;
    }
    return WellnessDataPoint;
}());
export { WellnessDataPoint };
