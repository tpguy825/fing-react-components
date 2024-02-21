import IAMButton from "./IAMButton";
import IAMImage from "./IAMImage";
import IAMLocalizedText from "./IAMLocalizedText";
import { IAMParserBase, isDefaultLanguageInMap } from "./ModelsHelper";
import { isUndefined, isString, isObject } from "../../helpers/JsonHelper";
import IAMColors from "./IAMColors";

const K_DEFINITION_STYLE_LAYOUT = "layout";
const K_DEFINITION_STYLE_LAYOUT_CARD = "CARD";
const K_DEFINITION_STYLE_LAYOUT_MODAL = "MODAL";
const K_DEFINITION_STYLE_LAYOUT_IMAGE = "IMAGE";
const K_DEFINITION_STYLE_LAYOUT_TOP_BANNER = "TOP_BANNER";
const K_DEFINITION_STYLE_LAYOUT_SIDE_BANNER = "SIDE_BANNER";
const K_DEFINITION_STYLE_TITLES = "titles";
const K_DEFINITION_STYLE_BODIES = "bodies";
const K_DEFINITION_STYLE_IMAGES = "images";
const K_DEFINITION_STYLE_EXTRAS = "extras";
const K_DEFINITION_STYLE_COLORS = "colors";
const K_DEFINITION_STYLE_PRIMARY_BUTTON = "primary_button";

class IAMLayout {
    static get CARD() {
        return K_DEFINITION_STYLE_LAYOUT_CARD;
    }

    static get MODAL() {
        return K_DEFINITION_STYLE_LAYOUT_MODAL;
    }

    static get IMAGE() {
        return K_DEFINITION_STYLE_LAYOUT_IMAGE;
    }

    static get TOP_BANNER() {
        return K_DEFINITION_STYLE_LAYOUT_TOP_BANNER;
    }

    static get SIDE_BANNER() {
        return K_DEFINITION_STYLE_LAYOUT_SIDE_BANNER;
    }

    static get styles() {
        return [
            IAMLayout.CARD,
            IAMLayout.MODAL,
            IAMLayout.IMAGE,
            IAMLayout.TOP_BANNER,
            IAMLayout.SIDE_BANNER
        ];
    }
}

class IAMStyle extends IAMParserBase {
    static IAMLayout = IAMLayout;

    layout;
    titles;
    bodies;
    images;
    extras;
    colors;
    primaryButton;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    parseJson(style) {
        this.parseLayout(style);
        this.parseTitles(style);
        this.parseBodies(style);
        this.parseImages(style);
        this.parseExtras(style);
        this.parseColors(style);
        this.parsePrimaryButton(style);

        if (!this.isValid()) {
            this.throwParseError();
        }
    }

    checkJson(style) {
        const layout = style[K_DEFINITION_STYLE_LAYOUT];
        const titles = style[K_DEFINITION_STYLE_TITLES];
        const bodies = style[K_DEFINITION_STYLE_BODIES];
        const images = style[K_DEFINITION_STYLE_IMAGES];
        const extras = style[K_DEFINITION_STYLE_EXTRAS];
        const colors = style[K_DEFINITION_STYLE_COLORS];
        const primaryButton = style[K_DEFINITION_STYLE_PRIMARY_BUTTON];

        return (isUndefined(layout) || (isString(layout) && IAMLayout.styles.includes(layout)))
            && (isUndefined(titles) || (isObject(titles) && isDefaultLanguageInMap(titles)))
            && (isUndefined(bodies) || (isObject(bodies) && isDefaultLanguageInMap(bodies)))
            && (isUndefined(images) || isObject(images))
            && (isUndefined(extras) || (isObject(extras) && isDefaultLanguageInMap(extras)))
            && (isUndefined(colors) || isObject(colors))
            && (isUndefined(primaryButton) || isObject(primaryButton))
        ;
    }

    parseLayout(style) {
        this.layout = style[K_DEFINITION_STYLE_LAYOUT];
    }

    parseImages(style) {
        this.images = style[K_DEFINITION_STYLE_IMAGES] ? new IAMImage(style[K_DEFINITION_STYLE_IMAGES]) : undefined;
    }

    parsePrimaryButton(style) {
        const primaryButton = style[K_DEFINITION_STYLE_PRIMARY_BUTTON];

        if (primaryButton) {
            this.primaryButton = new IAMButton(primaryButton);
        }
    }

    parseTitles(style) {
        const jsonTitles = style[K_DEFINITION_STYLE_TITLES];
        this.titles = this.getTexts(jsonTitles);
    }

    parseBodies(style) {
        const jsonBodies = style[K_DEFINITION_STYLE_BODIES];
        this.bodies = this.getTexts(jsonBodies);
    }

    parseExtras(style) {
        const jsonExtras = style[K_DEFINITION_STYLE_EXTRAS];
        this.extras = this.getTexts(jsonExtras);
    }

    parseColors(style) {
        const colors = style[K_DEFINITION_STYLE_COLORS];

        if (colors) {
            this.colors = new IAMColors(colors);
        }
    }

    getTexts(json) {
        if (!json) {
            return undefined;
        }

        return new IAMLocalizedText(json);
    }

    getTitleByLanguage(countryCode) {
        return this.getTextByAttrAndLanguage("titles", countryCode);
    }

    getBodyByLanguage(countryCode) {
        return this.getTextByAttrAndLanguage("bodies", countryCode);
    }

    getExtrasByLanguage(countryCode) {
        return this.getTextByAttrAndLanguage("extras", countryCode);
    }

    getTextByAttrAndLanguage(attr, countryCode) {
        if (!this[attr]) {
            return "";
        }

        return this[attr].getText(countryCode);
    }

    hasTitle() {
        return this.getTitleByLanguage(IAMLocalizedText.DEFAULT_LANGUAGE_CODE).length > 0;
    }

    isValid() {
        const hasNotImages = !this.images || !this.images.hasDefault();

        if (this.layout === IAMStyle.IAMLayout.CARD && hasNotImages) {
            return false;
        }

        if (this.layout === IAMStyle.IAMLayout.MODAL && !this.hasTitle() && hasNotImages) {
            return false;
        }

        if (this.layout === IAMStyle.IAMLayout.IMAGE && hasNotImages) {
            return false;
        }

        return true;
    }
}

export default IAMStyle;