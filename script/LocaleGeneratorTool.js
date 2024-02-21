#!/usr/bin/env node
"use strict"
const fs = require('fs');

const libraryLocaleFolder = ('../src/locales');
const desktopLocaleFolder = ('../../FING-desktop/my-app/public/locale');
const missingKeysFileName = 'missing_keys.json';
const recoveredFileName = 'recovered_keys.json';

const originalLocale = "en-US";
const targetLocales = ["es-ES", "it-IT"];

// Convenience functions
const valueIsMissing = (v) => v === undefined;
const readJson = (folder, locale) => JSON.parse(fs.readFileSync(`${folder}/${locale}.json`));
const writeJson = (file, content) => fs.writeFileSync(file,
    JSON.stringify(content, Object.keys(content).sort(), 4),
    err => {
        console.log(err || `JSON saved to ${file}`);
    });

/**
 * Finds if some language has a missing translation.
 * Generates a file with the missing keys to send to translators.
 *
 * @param localeFolder The folder to look into
 */
function identifyMissingTranslations(localeFolder) {
    const original = readJson(localeFolder || libraryLocaleFolder, originalLocale);
    const translated = targetLocales.map(locale => readJson(localeFolder || libraryLocaleFolder, locale));

    // Start with an empty set of missing keys and count every locale as 0.
    // Each time a translation is missing (undefined), we increase the count and add the key to the missing keys.
    const missingKeys = {};
    const missingCount = new Array(targetLocales.length).fill(0);

    Object.keys(original).forEach(key => {
        const translatedValues = translated.map(translations => translations[key]);
        translatedValues.forEach((value, idx) => missingCount[idx] += (valueIsMissing(value) ? 1 : 0));

        // Mark when a at least one translation is missing
        if (translatedValues.some(value => valueIsMissing(value))) {
            missingKeys[key] = original[key];
        }
    })

    console.log("+++ MISSING VALUES BY LANGUAGE +++");
    targetLocales.forEach((locale, idx) => console.log(`${locale} = ${missingCount[idx]}`));

    writeJson(missingKeysFileName, missingKeys);
}

/**
 * Finds if some language has a missing translation.
 * Generates a file with the missing keys to send to translators.
 */
function identifyDuplicateValuesInLibrary(localeFolder) {
    const original = readJson(localeFolder || libraryLocaleFolder, originalLocale);
    const duplicateValues = {};

    Object.keys(original).forEach(key => {
        const value = original[key];
        duplicateValues[value] = duplicateValues[value] ? duplicateValues[value].concat(`"${key}"`) : [`"${key}"`];
    })

    console.log("+++ DUPLICATE VALUES +++");
    Object.entries(duplicateValues)
        .filter(([v, keys]) => keys.length > 1)
        .forEach(([v, keys]) => console.log(`Value "${v}" used by [${keys}]`));
}

/**
 * Uses the Fing Desktop translations as a "Translation Memory" to recover already-translated text.
 * Generates a recover file for each language that can be appended to each language file.
 */
function recoverTranslationsFromDesktop() {
    const readFromLibrary = (locale) => readJson(libraryLocaleFolder, locale);
    const readFromDesktop = (locale) => readJson(desktopLocaleFolder, locale);
    const original = readFromLibrary(originalLocale);
    const translated = targetLocales.map(locale => readFromLibrary(locale));

    // Create entries once: we're going to iterate over them many times
    const desktopEntries = Object.entries(readFromDesktop(originalLocale));
    const desktopTranslated = targetLocales.map(locale => readFromDesktop(locale));

    // Start with an empty set of memory keys for each language.
    const recoveredByLocale = new Array(targetLocales.length).fill({});

    targetLocales.forEach((locale, idx) => {
        console.log(`+++ CHECKING LOCALE ${locale} +++`);
        const recoveredKeys = {};
        for (const key of Object.keys(original)) {
            const originalValue = original[key];
            const translatedValue = translated[idx][key];
            if (!valueIsMissing(translatedValue)) continue;

            const desktopEntry = desktopEntries.find(([k, v]) => originalValue === v);
            if (!desktopEntry) continue;

            const [dKey, dValue] = desktopEntry;
            const recoveredValue = desktopTranslated[idx][dKey];
            if (recoveredValue) {   // Desktop may be missing some translation as well
                recoveredKeys[key] = recoveredValue;
                console.log(`[${locale}] Found matching "${dKey}"="${dValue}", recovered "${key}"="${recoveredValue}"`);
            } else {
                console.log(`[${locale}] Found matching "${dKey}"="${dValue}" but it was not translated`);
            }
        }
        recoveredByLocale[idx] = recoveredKeys;
    });

    console.log("+++ RECOVERED VALUES BY LANGUAGE +++");
    targetLocales.forEach((locale, idx) => {
        const recoveredKeys = recoveredByLocale[idx];
        console.log(`${locale} = ${Object.keys(recoveredKeys).length}`)
        writeJson(`${locale}_${recoveredFileName}`, recoveredKeys);
    });
}

/**
 * Sorts the file by keys, to keep it tidy.
 */
function sortKeys(localeFolder) {
    const allLocales = [originalLocale, ...targetLocales];
    for (const locale of allLocales) {
        const json = readJson(localeFolder || libraryLocaleFolder, locale);
    }

    console.log("+++ SORTING KEYS +++");
    allLocales.forEach((locale, idx) => {
        const json = readJson(localeFolder || libraryLocaleFolder, locale);
        writeJson(`sorted_${locale}.json`, json);
    });
}

/**
 * Removes duplicates from Desktop localizations. That is, it strips all Desktop locale files from keys already here in the library.
 * The result is written under the directory defined in desktopDuplicatesRemovedFolderName below.
 */
function removeDuplicatesFromDesktop() {
    const deltaFromLocale = locale => {
        const readFromLibrary = (locale) => readJson(libraryLocaleFolder, locale);
        const readFromDesktop = (locale) => readJson(desktopLocaleFolder, locale);

        const desktopKeys = readFromDesktop(locale);
        const libraryKeys = readFromLibrary(locale);

        if (!desktopKeys) {
            return null;
        }

        if (!libraryKeys) {
            console.warn("Library keys not defined.");
            return [ desktopKeys, desktopKeys ];
        }

        let delta = {};

        Object.keys(desktopKeys).forEach(key => {
            if (!libraryKeys[key]) {
                delta[key] = desktopKeys[key];
            } else if (libraryKeys[key] !== desktopKeys[key]) {
                console.error(`> The key ${key} is present in both files but has different value: "${libraryKeys[key]}" for library, "${desktopKeys[key]}" for desktop.`);
            }
        });

        return [ delta, desktopKeys ];
    };

    const desktopDuplicatesRemovedFolderName = "./desktop-duplicates-removed";

    if (!fs.existsSync(desktopDuplicatesRemovedFolderName)) {
        fs.mkdirSync(desktopDuplicatesRemovedFolderName);
    }

    console.log("+++ REMOVING DUPLICATES FROM DESKTOP +++");

    [originalLocale, ...targetLocales].forEach(locale => {
        const [ delta, original ] = deltaFromLocale(locale);
        console.log(locale, "ORIGINAL SIZE:", Object.keys(original).length, "- DELTA SIZE:", Object.keys(delta).length);

        if (delta) {
            fs.writeFileSync(
                `${desktopDuplicatesRemovedFolderName}/${locale}.json`,
                JSON.stringify(delta, Object.keys(delta).sort(), 4),
                err => {
                    console.log(err || `JSON saved to ${file}`);
                }
            );
        }
    });
}

function main() {
    // recoverTranslationsFromDesktop();
    // identifyMissingTranslations(desktopLocaleFolder);
    // sortKeys(desktopLocaleFolder);
    // identifyMissingTranslations(libraryLocaleFolder);
    // sortKeys(libraryLocaleFolder);
    // identifyDuplicateValuesInLibrary();
    // removeDuplicatesFromDesktop();
}

main();

