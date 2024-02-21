import React from "react";
import { SCRD_STATUS_INACTIVE } from "../../model/Constants";

export default class SecurityCardController extends React.Component {
    cardStatus;

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        this.cardStatus = this.computeCardStatusWrapper();
        this.sendStatusBack();
        return this.renderCard();
    }

    renderCard() {
        return null;   
    }

    computeCardStatusWrapper() {
        if (this.props._config && this.props._config.isAllowedByPermission === false) {
            return SCRD_STATUS_INACTIVE;
        }

        return this.computeCardStatus();
    }

    sendStatusBack() {
        clearTimeout(this.timeout);

        if (this.props._config && this.props._config.onCardStatusChange) {
            this.timeout = setTimeout(
                () => this.props._config.onCardStatusChange(this.cardStatus), 
                0
            );
        }
    }

    isDisabled() {
        return typeof this.props.enabled === "boolean" && !this.props.enabled;
    }

    getCardStatus() {
        return this.cardStatus;
    }
}