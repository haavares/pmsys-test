import { durationUnitValueToSeconds } from '../omh';
import { isWellness } from './wellness';
import { isSessionRPE } from './session-rpe';
import { computeSessionRPE } from './session-rpe';
import moment from 'moment';
import * as _ from 'lodash';
import { isParticipation } from './participation';
import { isInjury } from './injury';
export function dateCmp(a, b) {
    return (a > b ? 1 : a < b ? -1 : 0);
}
/*
 * Class for computing individual statistics from datapoints.
 */
var UserStatistics = /** @class */ (function () {
    function UserStatistics() {
        this.currentScoreValidityDays = 1;
        this.srpeXData = [];
        this.srpeYData = [];
        this.exertion = [];
        this.mood = [];
        this.moodX = [];
        this.readiness = [];
        this.readinessX = [];
        this.stress = [];
        this.stressX = [];
        this.soreness = [];
        this.sorenessX = [];
        this.fatigue = [];
        this.fatigueX = [];
        this.sleepDuration = [];
        this.sleepQuality = [];
        this.sleepX = [];
        this.generalReadiness = -1;
        this.localReadiness = -1;
        this.injuryReadiness = -1;
        this.currentFatigueScore = -1;
        this.currentMoodScore = -1;
        this.currentSleepQualityScore = -1;
        this.currentSleepAmountScore = -1;
        this.currentSorenessScore = -1;
        this.currentStressScore = -1;
        this.currentInjuryScore = -1;
        this.currentLoadScore = -1;
        this.currentStrainScore = -1;
        this.currentTrendScore = null;
        this.participateX = [];
        this.participateGoing = [];
        this.participateComment = [];
        this.injuryX = [];
        this.injuryInjuries = [];
        this.injuryIllness = [];
        /* Latest seen datapoints for different datatypes */
        this.latestReport = {};
        /* Earliest seen datapoints for different datatypes */
        this.earliestReport = {};
        /* storeas raw datapoints */
        this.srpeData = [];
        this.wellnessData = [];
        this.participationData = [];
        this.injuryData = [];
        /* Indicates that a recompute is needed */
        this._dirty = false;
    }
    UserStatistics.prototype.getLatest = function (name) {
        return this.latestReport[name];
    };
    /*
     * Adds raw OMH datapoints to this user.
     *
     * recompute() must be called after new datapoints are inserted.
     */
    UserStatistics.prototype.addDataPoint = function (value) {
        if (value == null)
            return;
        if (isSessionRPE(value.body)) {
            this._dirty = true;
            this.srpeData.push(value);
        }
        else if (isWellness(value.body)) {
            this._dirty = true;
            this.wellnessData.push(value);
        }
        else if (isParticipation(value.body)) {
            this._dirty = true;
            this.participationData.push(value);
        }
        else if (isInjury(value.body)) {
            this._dirty = true;
            this.injuryData.push(value);
        }
        else {
            throw 'Unknown user datatype';
        }
    };
    UserStatistics.prototype.addDataPoints = function (value) {
        var _this = this;
        value.forEach(function (data) { return _this.addDataPoint(data); });
    };
    /*
     * Compute all derived data from inserted datapoints.
     */
    UserStatistics.prototype.recompute = function () {
        if (!this._dirty) {
            return;
        }
        this.computeWellnessData();
        this.computeSessionRPEData();
        this.computeScores();
        this.computeParticipationData();
        this.computeInjuryData();
        this._dirty = false;
    };
    UserStatistics.prototype.setCurrentScoreDays = function (days) {
        if (days !== this.currentScoreValidityDays) {
            this.currentScoreValidityDays = days;
            this.computeScores();
        }
    };
    UserStatistics.prototype.computeScores = function (offset) {
        if (offset === void 0) { offset = 1; }
        var yesterday = moment().subtract(offset, 'day');
        var m = moment(_.last(this.fatigueX));
        if (m.isSameOrAfter(yesterday)) {
            this.currentFatigueScore = _.last(this.fatigue);
            this.currentMoodScore = _.last(this.mood);
            this.currentSleepAmountScore = _.last(this.sleepDuration);
            this.currentSleepQualityScore = _.last(this.sleepQuality);
            this.currentSorenessScore = _.last(this.soreness);
            this.currentStressScore = _.last(this.stress);
            this.currentInjuryScore = -1;
            /* General Readiness */
            if (this.currentFatigueScore >= 3 && this.currentStressScore >= 3 &&
                this.currentMoodScore >= 3 && this.currentSleepQualityScore >= 3 &&
                this.currentSleepAmountScore >= 6) {
                this.generalReadiness = 1;
            }
            else {
                this.generalReadiness = 0;
            }
            /* Local Readiness */
            if (this.currentFatigueScore >= 3 && this.currentSorenessScore >= 3) {
                this.localReadiness = 1;
            }
            else {
                this.localReadiness = 0;
            }
            /* Injury Readiness */
            this.injuryReadiness = -1;
            this.currentTrendScore = null;
            /* Load Score */
            this.currentLoadScore = _.last(this.srpeYData);
            this.currentStrainScore = -1;
        }
        else {
            this.currentFatigueScore = -1;
            this.currentMoodScore = -1;
            this.currentSleepAmountScore = -1;
            this.currentSleepQualityScore = -1;
            this.currentSorenessScore = -1;
            this.currentStressScore = -1;
            this.currentTrendScore = null;
            this.currentInjuryScore = -1;
            this.currentLoadScore = -1;
            this.currentStrainScore = -1;
        }
    };
    UserStatistics.prototype.computeWellnessData = function () {
        /* Skip if no data */
        if (this.wellnessData.length == 0) {
            return;
        }
        /* Make sure input array is sorted */
        this.wellnessData = this.wellnessData.sort(function (a, b) {
            return dateCmp(a.body.effective_time_frame.date_time, b.body.effective_time_frame.date_time);
        });
        this.latestReport['wellness'] = this.wellnessData[this.wellnessData.length - 1].body.effective_time_frame.date_time;
        this.earliestReport['wellness'] = this.wellnessData[0].body.effective_time_frame.date_time;
        for (var _i = 0, _a = this.wellnessData; _i < _a.length; _i++) {
            var val = _a[_i];
            var onDay = val.body.effective_time_frame.date_time;
            /* mood */
            var lastItem = this.moodX.length - 1;
            if (val.body.mood >= 1 && val.body.mood <= 5) {
                this.moodX.push(onDay);
                this.mood.push(val.body.mood);
            }
            if (val.body.fatigue >= 1 && val.body.fatigue <= 5) {
                this.fatigueX.push(onDay);
                this.fatigue.push(val.body.fatigue);
            }
            if (val.body.readiness >= 0 && val.body.readiness <= 10) {
                this.readinessX.push(onDay);
                this.readiness.push(val.body.readiness);
            }
            if (durationUnitValueToSeconds(val.body.sleep.duration) >= 0) {
                this.sleepX.push(onDay);
                this.sleepDuration.push(durationUnitValueToSeconds(val.body.sleep.duration));
                if (val.body.sleep.quality >= 1 && val.body.sleep.quality <= 5) {
                    this.sleepQuality.push(val.body.sleep.quality);
                }
            }
            if (val.body.soreness >= 1 && val.body.soreness <= 5) {
                this.sorenessX.push(onDay);
                this.soreness.push(val.body.soreness);
            }
            if (val.body.stress >= 1 && val.body.stress <= 5) {
                this.stressX.push(onDay);
                this.stress.push(val.body.stress);
            }
        }
    };
    UserStatistics.prototype.computeParticipationData = function () {
        /* Skip if no data */
        if (this.participationData.length === 0) {
            return;
        }
        /* Make sure input array is sorted */
        this.participationData = this.participationData.sort(function (a, b) {
            return dateCmp(a.body.effective_time_frame.date_time, b.body.effective_time_frame.date_time);
        });
        this.latestReport['participation'] = this.participationData[this.participationData.length - 1].body.effective_time_frame.date_time;
        this.earliestReport['participation'] = this.participationData[0].body.effective_time_frame.date_time;
        for (var _i = 0, _a = this.participationData; _i < _a.length; _i++) {
            var val = _a[_i];
            var onDay = val.body.effective_time_frame.date_time;
            this.participateX.push(onDay);
            this.participateGoing.push(val.body.going);
            this.participateComment.push(val.body.comment);
        }
    };
    UserStatistics.prototype.computeInjuryData = function () {
        /* Skip if no data */
        if (this.injuryData.length === 0) {
            return;
        }
        /* Make sure input array is sorted */
        this.injuryData = this.injuryData.sort(function (a, b) {
            return dateCmp(a.body.effective_time_frame.date_time, b.body.effective_time_frame.date_time);
        });
        this.latestReport['injury'] = this.injuryData[this.injuryData.length - 1].body.effective_time_frame.date_time;
        this.earliestReport['injury'] = this.injuryData[0].body.effective_time_frame.date_time;
        for (var _i = 0, _a = this.injuryData; _i < _a.length; _i++) {
            var val = _a[_i];
            var onDay = val.body.effective_time_frame.date_time;
            this.injuryX.push(onDay);
            this.injuryIllness.push(val.body.illness);
            this.injuryInjuries.push(val.body.injuries);
        }
    };
    /*
     * Update Session RPE data from set datapoints.
     */
    UserStatistics.prototype.computeSessionRPEData = function () {
        /* Skip if no data */
        if (this.srpeData.length == 0) {
            return;
        }
        var idata = [];
        /* Make sure input array is sorted */
        this.srpeData = this.srpeData.sort(function (a, b) { return dateCmp(a.body.time_interval.end_date_time, b.body.time_interval.end_date_time); });
        this.latestReport['srpe'] = this.srpeData[this.srpeData.length - 1].body.time_interval.end_date_time;
        // this.latestReport['srpe'] = this.latestReport['srpe'] > onDay ? this.latestReport['srpe']: onDay;
        // this.earliestReport['srpe'] = this.earliestReport['srpe'] < onDay ? this.earliestReport['srpe']: onDay;
        this.earliestReport['srpe'] = this.srpeData[0].body.time_interval.end_date_time;
        for (var _i = 0, _a = this.srpeData; _i < _a.length; _i++) {
            var val = _a[_i];
            var onDay = new Date(val.body.time_interval.end_date_time);
            var lastItem = this.srpeXData.length - 1;
            this.srpeXData.push(onDay);
            this.srpeYData.push(computeSessionRPE(val));
            this.exertion.push(val.body.perceived_exertion);
            idata.push(1);
        }
    };
    return UserStatistics;
}());
export { UserStatistics };
