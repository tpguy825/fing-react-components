import { safeParseBool, safeParseInt } from "../helpers/JsonHelper";

export default class DeviceRecognition {
    typeId;
    makeId;
    modelId;
    osId;
    familyId;
    typeName;
    makeName;
    modelName;
    osName;
    osVersion;
    osBuild;
    rank;
    familyName;
    isFamily;
    serial;

    applyFromAgentData(json) {
        this.typeId = safeParseInt(json, "type_id");
        this.makeId = safeParseInt(json, "make_id");
        this.modelId = safeParseInt(json, "model_id");
        this.osId = safeParseInt(json, "os_id");
        this.familyId = safeParseInt(json, "family_id");
        this.typeName = json["type_name"];
        this.makeName = json["make_name"];
        this.modelName = json["model_name"];
        this.osName = json["os_name"];
        this.osVersion = json["os_version"];
        this.osBuild = json["os_build"];
        this.rank = safeParseInt(json, "rank");
        this.familyName = json["family_name"];
        this.isFamily = safeParseBool(json, "is_family");
        this.serial = json["serial"];

        return this;
    }

    hasOsRecog() {
        return Boolean(this.osId || this.osName || this.osVersion || this.osBuild);
    }
}