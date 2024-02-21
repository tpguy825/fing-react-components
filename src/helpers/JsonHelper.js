/*
 * Copyright (c) Fing. All rights reserved.
 */

export function safeParseEnum(json, key, enumItems, fallback) {
    const value = json[key];
    if (!value) return fallback;
    if (!enumItems) return fallback;

    for (let i = 0; i < enumItems.length; i++) {
        const enumItem = enumItems[i];
        if (enumItem === value)
            return enumItem;
    }
    return fallback;
}

export function safeParseInt(json, key, fallback) {
    return json[key] ? parseInt(json[key], 10) : fallback;
}

export function safeParseBool(json, key) {
    return json[key] ? json[key] === "true" : false;
}

export function safeParseFloat(json, key, fallback) {
    return json[key] ? parseInt(json[key], 10) : fallback;
}

export function isUndefined(json) {
    return typeof json === "undefined";
}

export function isString(json) {
    return typeof json === "string";
}

export function isObject(json) {
    return json && typeof json === "object" && Object.getPrototypeOf(json) === Object.prototype;
}

export function isNumber(json) {
    return typeof json === "number";
}

export function isBoolean(json) {
    return typeof json === "boolean";
}

export function isEmptyObject(json) {
    return isObject(json) && Object.keys(json).length === 0;
}

export function isEmptyArray(json) {
    return json && Array.isArray(json) && json.length > 0;
}

export function isEmptyString(json) {
    return isString(json) && json.length === 0;
}

export function isURL(str) {
    if (!isString(str)) {
        return false;
    }
    
    try {
        new URL(str);
    } catch (_) {
        return false;
    }

    return true;
}

export function isArrayOfStrings(array) {
    return array && Array.isArray(array) && array.reduce((prev, curr) => prev && isString(curr), true);
}

export function isMapOfStrings(map) {
    return map && isObject(map) && Object.keys(map).reduce((prev, key) => prev && isString(map[key]), true);
}