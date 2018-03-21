export function isTeamShort(t) {
    var i = t;
    if (i.name === undefined) {
        return false;
    }
    ;
    if (i.id === undefined) {
        return false;
    }
    ;
    return true;
}
export function isTeam(t) {
    var i = t;
    if (isTeamShort(t) === false) {
        return false;
    }
    if (i.players === undefined) {
        return false;
    }
    if (i.coaches === undefined) {
        return false;
    }
    return true;
}
