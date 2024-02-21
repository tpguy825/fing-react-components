import { IAMParserBase } from "./ModelsHelper";
import { isNumber, isUndefined, isString } from "../../helpers/JsonHelper";

const K_DEFINITION_MAX_VERSION = "max";
const K_DEFINITION_MIN_VERSION = "min";

class IAMAppVersion extends IAMParserBase {
    maxVersion;
    minVersion;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    parseJson(version) {
        this.maxVersion = version[K_DEFINITION_MAX_VERSION];
        this.minVersion = version[K_DEFINITION_MIN_VERSION];
    }

    checkJson(version) {
        const checkVersionField = ver => {
            return isUndefined(ver) 
                || (isString(ver) && ver.split(".").reduce((prev, curr) => prev && !isNaN(Number(curr)), true))
            ;
        };

        const maxVer = version[K_DEFINITION_MAX_VERSION];
        const minVer = version[K_DEFINITION_MIN_VERSION];

        return (!isUndefined(maxVer) || !isUndefined(minVer))
            && checkVersionField(maxVer) && checkVersionField(minVer)
        ;
    }

    isVersionInRange(otherVersion) {
        if (this.maxVersion && IAMAppVersion.compareVersions(this.maxVersion, otherVersion) < 0) {
            return false;
        }

        if (this.minVersion && IAMAppVersion.compareVersions(this.minVersion, otherVersion) > 0) {
            return false;
        }
        
        return true;
    }

    static compareVersions(version1, version2) {
        if (!version1 && !version2) {
            return 0;
        }

        if (!version1) {
            return -1;
        }

        if (!version2) {
            return 1;
        }

        const baseVersion1 = version1.split("-");
        const baseVersion2 = version2.split("-");
        const version1Splits = baseVersion1[0].split(".");
        const version2Splits = baseVersion2[0].split(".");
        const maxLengthOfVersionSplits = Math.max(version1Splits.length, version2Splits.length);

        for (let i = 0; i < maxLengthOfVersionSplits; ++i) {
            const v1 = i < version1Splits.length ? Number(version1Splits[i]) : 0;
            const v2 = i < version2Splits.length ? Number(version2Splits[i]) : 0;
            const res = compare(v1, v2);

            if (res !== false && res !== 0) {
                return res;
            }
        }

        return 0;
    }
}

function compare(lhs, rhs) {
    if (!isNumber(lhs) || !isNumber(rhs)) {
        return false;
    }

    if (lhs === rhs) {
        return 0;
    } else if (lhs < rhs) {
        return -1;
    }

    return 1;
}

export default IAMAppVersion;