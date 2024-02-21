import { isURL, isUndefined } from "../../helpers/JsonHelper";
import { IAMParserBase } from "./ModelsHelper";

const K_DEFINITION_DEFAULT_IMAGE = "default";
const K_DEFINITION_LANDSCAPE_IMAGE = "landscape";
const K_DEFINITION_ANIMATED = "animated";

class IAMImage extends IAMParserBase {
    landscapeImage;
    defaultImage;
    animated;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    parseJson(image) {
        this.landscapeImage = image[K_DEFINITION_LANDSCAPE_IMAGE];
        this.defaultImage = image[K_DEFINITION_DEFAULT_IMAGE];
        this.animated = image[K_DEFINITION_ANIMATED];
    }

    checkJson(image) {
        const defaultImage = image[K_DEFINITION_DEFAULT_IMAGE];
        const landscapeImage = image[K_DEFINITION_LANDSCAPE_IMAGE];
        const animated = image[K_DEFINITION_ANIMATED];

        return isURL(defaultImage)
            && (isUndefined(landscapeImage) || isURL(landscapeImage))
            && (isUndefined(animated) || isURL(animated))
        ;
    }

    hasDefault() {
        return this.defaultImage;
    }

    hasLandscape() {
        return this.landscapeImage;
    }

    getCorrectImageURL() {
        if (this.animated) {
            return this.animated;
        }

        if (this.landscapeImage && this.landscapeImage.length > 0) {
            return this.landscapeImage;
        }

        return this.defaultImage;
    }
}

export default IAMImage;