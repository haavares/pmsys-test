var SchemaVersion = /** @class */ (function () {
    function SchemaVersion(major, minor) {
        this.major = major;
        this.minor = minor;
    }
    return SchemaVersion;
}());
export { SchemaVersion };
var SchemaID = /** @class */ (function () {
    function SchemaID(namespace, name, version) {
        this.namespace = namespace;
        this.name = name;
        this.version = version;
    }
    ;
    return SchemaID;
}());
export { SchemaID };
