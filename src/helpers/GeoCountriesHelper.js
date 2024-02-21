import data from '../assets/json/countries.json';

export function getJsonCountries(){
    let nameMap = {};
    let codeMap = {};

    data.forEach((country) => {
        nameMap[country.name.toLowerCase()] = country;
        codeMap[country.code.toLowerCase()] = country;
    });
    return {
        names: nameMap,
        codes: codeMap
    }
}
export function getCountryCode(name) {
    let nameMap = getJsonCountries().names
    const country = name ? nameMap[name.toLowerCase()] : null;
    return country ? country.code : null;
}

export function getCountryName(code) {
    let codeMap = getJsonCountries().codes
    const country = code ? codeMap[code.toLowerCase()] : null;
    return country ? country.name : code;
}

export function getCountryCode3(code) {
    let codeMap = getJsonCountries().codes
    const country = code ? codeMap[code.toLowerCase()] : null;
    return country ? country.code3 : null;
}

export function getCountryObject(code) {
    let codeMap = getJsonCountries().codes
    return code ? codeMap[code.toLowerCase()] : null;
}



