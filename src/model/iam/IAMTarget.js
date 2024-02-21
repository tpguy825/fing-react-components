import IAMAppVersion from "./IAMAppVersion";
import { IAMParserBase } from "./ModelsHelper";
import { isUndefined, isObject, isBoolean, isArrayOfStrings, isMapOfStrings } from "../../helpers/JsonHelper";

const K_DEFINITION_TARGET_COUNTRIES = "countries";
const K_DEFINITION_TARGET_COUNTRIES_EXCLUDE = "countries-exclude";
const K_DEFINITION_TARGET_PLATFORMS = "platforms";
const K_DEFINITION_TARGET_APP_VERSION = "app-version";
const K_DEFINITION_TARGET_APP_VERSION_V2 = "app-version-v2";
const K_DEFINITION_TARGET_ACCOUNT_TYPES = "account-types";
const K_DEFINITION_TARGET_TECH_ATTITUDE = "tech-attitude";
const K_DEFINITION_TARGET_PURCHASE_STATES = "purchase-states";
const K_DEFINITION_TARGET_USER_PROPERTIES = "user-properties";
const K_DEFINITION_TARGET_REMOTE_PROPERTIES = "remote-properties";
const K_DEFINITION_TARGET_ACCOUNT_HAS_DESKTOP = "account-has-desktop";
const K_DEFINITION_TARGET_ACCOUNT_HAS_FINGBOX = "account-has-fingbox";
const K_DEFINITION_TARGET_ACCOUNT_HAS_MOBILE = "account-has-mobile";

/**
 * @callback getProperty
 * @param {string} key - The name of the property
 * @returns {string} - Returns the associated value
 */

/**
 * @typedef {Profile}
 * @property {string|undefined} countryCode 
 * @property {string|undefined} appVersion 
 * @property {string|undefined} platform
 * @property {getProperty|undefined} getUserProperty 
 * @property {getProperty|undefined} getRemoteProperty 
 * @property {string|undefined} accountType
 * @property {string|undefined} techAttitude
 * @property {string|undefined} purchaseState
 * @property {boolean|undefined} hasDesktop
 */

class Profile {
    countryCode;
    appVersion;
    platform;
    getUserProperty;
    getRemoteProperty;
    accountType;
    techAttitude;
    purchaseState;
    hasDesktop;
}

class IAMTarget extends IAMParserBase {
    static Profile = Profile;

    countries;
    countriesExclude;
    platforms;
    appVersion;
    accountTypes;
    techAttitudes;
    purchaseStates;
    userProperties;
    remoteProperties;
    hasDesktop;
    hasFingbox;
    hasMobile;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    parseJson(target) {
        this.countries = target[K_DEFINITION_TARGET_COUNTRIES];
        this.countriesExclude = target[K_DEFINITION_TARGET_COUNTRIES_EXCLUDE];
        this.platforms = target[K_DEFINITION_TARGET_PLATFORMS];
        this.appVersion = target[K_DEFINITION_TARGET_APP_VERSION] || target[K_DEFINITION_TARGET_APP_VERSION_V2] ? 
            new IAMAppVersion(target[K_DEFINITION_TARGET_APP_VERSION] || target[K_DEFINITION_TARGET_APP_VERSION_V2]) : undefined
        ;
        this.accountTypes = target[K_DEFINITION_TARGET_ACCOUNT_TYPES];
        this.techAttitudes = target[K_DEFINITION_TARGET_TECH_ATTITUDE];
        this.purchaseStates = target[K_DEFINITION_TARGET_PURCHASE_STATES];
        this.userProperties = target[K_DEFINITION_TARGET_USER_PROPERTIES];
        this.remoteProperties = target[K_DEFINITION_TARGET_REMOTE_PROPERTIES];
        this.hasDesktop = target[K_DEFINITION_TARGET_ACCOUNT_HAS_DESKTOP];
        this.hasFingbox = target[K_DEFINITION_TARGET_ACCOUNT_HAS_FINGBOX];
        this.hasMobile = target[K_DEFINITION_TARGET_ACCOUNT_HAS_MOBILE];
    }

    checkJson(target) {
        const countries = target[K_DEFINITION_TARGET_COUNTRIES];
        const countriesExclude = target[K_DEFINITION_TARGET_COUNTRIES_EXCLUDE];
        const platforms = target[K_DEFINITION_TARGET_PLATFORMS];
        const appVersion = target[K_DEFINITION_TARGET_APP_VERSION] || target[K_DEFINITION_TARGET_APP_VERSION_V2];
        const accountTypes = target[K_DEFINITION_TARGET_ACCOUNT_TYPES];
        const techAttitudes = target[K_DEFINITION_TARGET_TECH_ATTITUDE];
        const purchaseStates = target[K_DEFINITION_TARGET_PURCHASE_STATES];
        const userProperties = target[K_DEFINITION_TARGET_USER_PROPERTIES];
        const remoteProperties = target[K_DEFINITION_TARGET_REMOTE_PROPERTIES];
        const hasDesktop = target[K_DEFINITION_TARGET_ACCOUNT_HAS_DESKTOP];
        const hasFingbox = target[K_DEFINITION_TARGET_ACCOUNT_HAS_FINGBOX];
        const hasMobile = target[K_DEFINITION_TARGET_ACCOUNT_HAS_MOBILE];

        return (isUndefined(countries) || (Array.isArray(countries) && countries.length > 0 && isArrayOfStrings(countries)))
            && (isUndefined(countriesExclude) || (Array.isArray(countriesExclude) && countriesExclude.length > 0 && isArrayOfStrings(countriesExclude)))
            && (isUndefined(platforms) || (Array.isArray(platforms) && platforms.length > 0 && isArrayOfStrings(platforms)))
            && (isUndefined(appVersion) || isObject(appVersion))
            && (isUndefined(accountTypes) || (Array.isArray(accountTypes) && accountTypes.length > 0 && isArrayOfStrings(accountTypes)))
            && (isUndefined(techAttitudes) || (Array.isArray(techAttitudes) && techAttitudes.length > 0 && isArrayOfStrings(techAttitudes)))
            && (isUndefined(purchaseStates) || (Array.isArray(purchaseStates) && purchaseStates.length > 0 && isArrayOfStrings(purchaseStates)))
            && (isUndefined(userProperties) || (isObject(userProperties) && isMapOfStrings(userProperties)))
            && (isUndefined(remoteProperties) || (isObject(remoteProperties) && isMapOfStrings(remoteProperties)))
            && (isUndefined(hasDesktop) || isBoolean(hasDesktop))
            && (isUndefined(hasFingbox) || isBoolean(hasFingbox))
            && (isUndefined(hasMobile) || isBoolean(hasMobile))
        ;
    }

    /**
     * @param {Profile} args  
     */
    matches(args) {
        return this.matchCountries(args.countryCode)
            && this.matchPlatform(args.platform)
            && this.matchAppVersion(args.appVersion)
            && this.matchAccountType(args.accountType)
            && this.matchTechAttitude(args.techAttitude)
            && this.matchPurchaseState(args.purchaseState)
            && this.matchUserProperties(args.getUserProperty)
            && this.matchRemoteProperties(args.getRemoteProperty)
            && this.matchAccountHasDesktop(args.hasDesktop)
            && this.matchAccountHasFingbox(args.hasFingbox)
            && this.matchAccountHasMobile(args.hasMobile)
        ;
    }

    matchCountries(countryCode) {
        if (!countryCode && !this.countries && !this.countriesExclude) {
            return true;
        }

        return (!this.countries || isCountryInSet(this.countries, countryCode)) 
            && !isCountryInSet(this.countriesExclude || [], countryCode)
        ;
    }

    matchPlatform(currentPlatform) {
        return matchValueInList(currentPlatform, this.platforms);
    }

    matchAppVersion(currentAppVersion) {
        if (!currentAppVersion && !this.appVersion) {
            return true;
        }

        return !this.appVersion || this.appVersion.isVersionInRange(currentAppVersion);
    }

    matchAccountType(accountType) {
        return matchValueInList(accountType || "NONE", this.accountTypes);
    }

    matchTechAttitude(techAttitude) {
        return matchValueInList(techAttitude, this.techAttitudes);
    }

    matchPurchaseState(purchaseState) {
        return matchValueInList(purchaseState, this.purchaseStates);
    }

    matchUserProperties(getUserProperty) {
        return matchProperties(getUserProperty, this.userProperties);
    }

    matchRemoteProperties(getRemoteProperty) {
        return matchProperties(getRemoteProperty, this.remoteProperties);
    }

    matchAccountHasDesktop(hasDesktop) {
        return isUndefined(this.hasDesktop) || this.hasDesktop === hasDesktop;
    }

    matchAccountHasFingbox(hasFingbox) {
        return isUndefined(this.hasFingbox) || this.hasFingbox === hasFingbox;
    }

    matchAccountHasMobile(hasMobile) {
        return isUndefined(this.hasMobile) || this.hasMobile === hasMobile;
    }
}

function matchValueInList(value, list) {
    // If there's no list, there is no constraint
    if (!list) {
        return true;
    }

    // Here we have a list, so it's constrained. Without a value, we can be sure that it can't pass the constraints
    if (!value) {
        return false;
    }

    // Both value and list are defined, so we check whether the first matches in the latter or not
    return isStringInArrayIgnoringCase(list, value);
}

function isCountryInSet(countries, countryCode) {
    return isStringInArrayIgnoringCase(countries, countryCode);
}

function isStringInArrayIgnoringCase(array, str) {
    if (!str || !array) {
        return false;
    }

    str = str.toUpperCase();
    return array.reduce((prev, curr) => prev || curr.toUpperCase() === str, false);
}

function matchProperties(getLocalValue, target) {
    if (!target) {
        return true;
    }

    if (!getLocalValue) {
        return false;
    }

    for (const propKey in target) {
        const propValue = target[propKey].toUpperCase();
        const localValue = getLocalValue(propKey);

        if (!(localValue && localValue.toUpperCase() === propValue)) {
            return false;
        }
    }

    return true;
}

export default IAMTarget;