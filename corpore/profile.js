// Profile holds personal user information
var EmptyProfile = /** @class */ (function () {
    function EmptyProfile(sub) {
        this.sub = sub;
        this.given_name = "";
        this.family_name = "";
        this.nick_name = "";
        this.name = "";
        this.updated_at = new Date();
    }
    return EmptyProfile;
}());
export { EmptyProfile };
