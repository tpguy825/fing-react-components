
import React from 'react';
import PropTypes from 'prop-types';
import intl from "react-intl-universal";
import SecurityCardButton from './SecurityCardButton';
import { SCRD_STATUS_INACTIVE, SCRD_STATUS_OK, SCRD_STATUS_WARN } from '../../model/Constants';
import SecurityCard from './SecurityCard';
import SecurityCardController from './SecurityCardController';

export default class ManageNotificationCard extends SecurityCardController {
    computeCardStatus() {
        return this.props.enabled ? SCRD_STATUS_OK : SCRD_STATUS_WARN;
    }

    renderCard() {
        const { netNodes, handleManageDevicesClick, enabled } = this.props;
        const cardStatus = this.getCardStatus();
        
        let title = intl.get("security_score_state_change_disabled_title");
        
        if (enabled) {
            title = intl.get('security_score_state_change_enabled_title');
        }
        
        let subtitle;
        
        if (cardStatus === SCRD_STATUS_INACTIVE) {
            subtitle = intl.get("security_score_state_change_subtitle");
        } else {
            const alertedDevices = netNodes ? netNodes.filter(n => n.alertOnStateChange === true).length : 0;
            subtitle = <>
                {intl.get("security_score_state_change_subtitle")}
                <br />
                {intl.get("notifications_page_manage_extra", { alertedDevices: alertedDevices })}
            </>;
        }

        return <SecurityCard hasBadge status={cardStatus} title={title} subtitle={subtitle}>
            <SecurityCardButton 
                action={handleManageDevicesClick}
                disabled={!enabled}
                title={intl.get("generic_manage")}
            />
        </SecurityCard>;
    }
}

ManageNotificationCard.propTypes = {
    netNodes: PropTypes.array, 
    handleManageDevicesClick: PropTypes.func, 
    enabled: PropTypes.bool
};
