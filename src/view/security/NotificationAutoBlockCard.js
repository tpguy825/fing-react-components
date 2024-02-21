
import React from 'react';
import PropTypes from 'prop-types';
import intl from "react-intl-universal";
import SecurityCardButton from './SecurityCardButton';
import { SCRD_STATUS_INACTIVE, SCRD_STATUS_OK, SCRD_STATUS_WARN } from '../../model/Constants';
import SecurityCard from './SecurityCard';
import SecurityCardController from './SecurityCardController';

export default class NotificationAutoBlockCard extends SecurityCardController {
    constructor(props) {
        super(props);
        this.handleAutoBlockChanged = this.handleAutoBlockChanged.bind(this);
    }

    handleAutoBlockChanged() {
        if (this.props.handleAutoBlockChanged) {
            this.props.handleAutoBlockChanged()
        }
    }

    computeCardStatus() {
        const { network, enabled, hasValidationFailed } = this.props;
        const autoBlockOn = network && network.autoBlockNewDevices === "true";

        if (enabled && !hasValidationFailed && autoBlockOn) {
            return SCRD_STATUS_OK;
        }

        return SCRD_STATUS_WARN;
    }

    renderCard() {
        const { network, enabled, hasValidationFailed } = this.props;
                
        const cardStatus = this.getCardStatus();
        let networkName = network && network.customName ? network.customName : null;
        
        if (!networkName) {
            networkName = network && network.name ? network.name : "unrecognized network";
        }

        let title = intl.get("autoblock_card_title_disabled");
        let subtitle;
        let buttonTitle = intl.get("generic_manage");

        if (cardStatus === SCRD_STATUS_INACTIVE) {
            subtitle = intl.get("autoblock_card_subtitle_permission_disabled", { networkName: networkName });
        } else {
            if (hasValidationFailed) {
                subtitle = intl.getHTML("autoblock_card_subtitle_validation_disabled", { networkName: networkName });
            } else {
                title = cardStatus === SCRD_STATUS_OK ? intl.get("autoblock_card_title_enabled") : intl.get("autoblock_card_title_disabled");
                subtitle = cardStatus === SCRD_STATUS_OK ? intl.getHTML("autoblock_card_subtitle_enabled", { networkName: networkName }) : intl.get("autoblock_card_subtitle_disabled");
                buttonTitle = cardStatus !== SCRD_STATUS_OK ? intl.get("autoblock_card_action_enable") : intl.get("generic_manage");
            }
        }

        return <SecurityCard hasBadge status={cardStatus} title={title} subtitle={subtitle}>
            <SecurityCardButton 
                action={this.handleAutoBlockChanged}
                title={buttonTitle} 
                disabled={!enabled}
                freeze={hasValidationFailed}
            />
        </SecurityCard>;
    }    
}

NotificationAutoBlockCard.propTypes = {
    network: PropTypes.object, 
    handleAutoBlockChanged: PropTypes.func, 
    enabled: PropTypes.bool
};