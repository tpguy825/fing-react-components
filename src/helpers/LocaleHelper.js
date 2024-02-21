import intl from "react-intl-universal";
import LocaleEnUs from "../locales/en-US.json";
import LocaleEsEs from "../locales/es-ES.json";
import LocaleItIt from "../locales/it-IT.json";

const LOCALE_EN_US = "en-US";
const LOCALE_ES_ES = "es-ES";
const LOCALE_IT_IT = "it-IT";
const LOCALE_DEFAULT = LOCALE_EN_US;
const LOCALE_PSEUDO = "pseudo.locale";

/**
 * Returns the locale to be used to format strings, dates, and numbers in localized form using Javascript standard
 * formatting methods like toLocaleTimeString and toLocaleDateString.
 *
 * @return {string}
 */
export function getCurrentLocale() {
    const initOptions = intl.getInitOptions();
    if (!initOptions || !initOptions.currentLocale)
        return LOCALE_DEFAULT;

    const currentLocale = initOptions.currentLocale;
    return currentLocale === LOCALE_PSEUDO || !currentLocale ? LOCALE_DEFAULT : currentLocale;
}

/**
 * Returns an object whose keys are locale names and whose values are Javascript Objects mapping keys into messages.
 *
 * @return {Object} The list of supported locales
 */
export function getAvailableLocales() {
    const locales = {};
    locales[LOCALE_EN_US] = LocaleEnUs;
    locales[LOCALE_ES_ES] = LocaleEsEs;
    locales[LOCALE_IT_IT] = LocaleItIt;
    return locales;
}

export function currentLocaleUsers24Hours() {
    return new Intl.DateTimeFormat(getCurrentLocale(), {
      hour: 'numeric'
    }).formatToParts(new Date(2020, 0, 1, 13)).find(part => part.type === 'hour').value.length === 2;
}
