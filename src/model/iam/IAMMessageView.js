class IAMMessageView {
    id;
    locationId;
    style;
    conversion;
    notification;

    constructor(language, definition) {
        this.fromDefinition(language, definition);
    }

    fromDefinition(language, definition) {
        this.createIds(definition);
        this.createStyle(language, definition);
        this.createConversion(definition);
        this.createNotification(definition);
    }

    createIds(definition) {
        this.id = definition.id;
        this.locationId = definition.locationId;
    }

    createStyle(language, definition) {
        const style = definition.style;
        this.style = {};

        if (style) {
            if (style.layout) {
                this.style.layout = style.layout;
            }

            if (style.titles) {
                this.style.title = style.titles.getText(language);
            }

            if (style.bodies) {
                this.style.body = style.bodies.getText(language);
            }

            if (style.extras) {
                this.style.extra = style.extras.getText(language);
            }

            if (style.colors) {
                this.style.colors = {...style.colors};
            }

            if (style.images) {
                this.style.image = style.images.getCorrectImageURL();
            }

            if (style.primaryButton) {
                this.style.primaryButton = {
                    text: style.primaryButton.getTextByLanguage(language),
                    action: style.primaryButton.action
                };
            }

            if (definition.action && (!style.primaryButton || !style.primaryButton.action)) {
                this.style.primaryButton = {
                    action: definition.action
                };
            }
        }
    }

    createConversion(definition) {
        if (definition.conversion.isDefined()) {
            this.conversion = {...definition.conversion};
        }
    }

    createNotification(definition) {
        if (definition.notification) {
            this.notification = {...definition.notification};
        }
    }
}

export default IAMMessageView;