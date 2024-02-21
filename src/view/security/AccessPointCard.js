
import React from 'react';
import PropTypes from 'prop-types';
import intl from "react-intl-universal";
import { getProxyWpadAddress } from '../../helpers/ProxyHelper';
import SecurityCardButton, { SCB_TYPE_PRIMARY, SCB_TYPE_WARNING } from './SecurityCardButton';
import { SCRD_STATUS_FAIL, SCRD_STATUS_OK, SCRD_STATUS_WARN } from '../../model/Constants';
import SecurityCard from './SecurityCard';
import SecurityCardController from './SecurityCardController';

export const NIC_TYPE_SECURE = [
    "ETHERNET",
    "USB_ETHERNET",
    "IP_OVER_THUNDERBOLT",
    "IP_OVER_FIREWIRE",
    "CELLULAR",
    "BLUETOOTH_PAN"
];

export const WIFI_PROTOCOL_SECURE = [
    "WPA3", "WPA2"
];

export const WIFI_PROTOCOL_SEMISECURE = [
    "WPA", "WEP"
];

export default class AccessPointCard extends SecurityCardController {
    computeCardStatus() {
        const { discovery } = this.props;

        let status = SCRD_STATUS_WARN;
        const nicInfo = discovery && discovery.nicinfo ? discovery.nicinfo : null;

        if (nicInfo) {
            const type = nicInfo.type ? nicInfo.type : null;

            if (NIC_TYPE_SECURE.includes(type)) {
                status = SCRD_STATUS_OK;
            } else if (type === "WIFI") {
                if (nicInfo.wpsEnabled && nicInfo.wpsEnabled === 'true') {
                    status = SCRD_STATUS_WARN;
                } else if (nicInfo.apSecurityProtocol) {
                    const protocol = nicInfo.apSecurityProtocol;

                    if (WIFI_PROTOCOL_SECURE.filter(val => protocol.toUpperCase().startsWith(val)).length > 0) {
                        status = SCRD_STATUS_OK;
                    } else if (WIFI_PROTOCOL_SEMISECURE.filter(val => protocol.toUpperCase().startsWith(val)).length > 0) {
                        status = SCRD_STATUS_WARN;
                    } else {
                        status = SCRD_STATUS_FAIL; // Open network
                    }
                }
            }

            const WPADs = getProxyWpadAddress(discovery);
            const hasWPAD = WPADs.length > 0;

            if (hasWPAD && status === SCRD_STATUS_OK) {
                status = SCRD_STATUS_WARN;
            } else if (hasWPAD && status === SCRD_STATUS_WARN) {
                status = SCRD_STATUS_FAIL;
            }
        }

        return status;
    }

    renderCard() {
        const { enabled, onClickAccessPoint } = this.props;

        const status = this.getCardStatus();
        let title = intl.get('security_score_access_point_title_warning');
        let subtitle = intl.get('security_score_access_point_subtitle_warning');

        if (status) {
            if (status === SCRD_STATUS_OK) {
                title = intl.get('security_score_access_point_title_success');
                subtitle = intl.get('security_score_access_point_subtitle_success');
            } else if (status === SCRD_STATUS_WARN) {
                title = intl.get('security_score_access_point_title_warning');
                subtitle = intl.get('security_score_access_point_subtitle_warning');
            } else if (status === SCRD_STATUS_FAIL) {
                title = intl.get('security_score_access_point_title_danger');
                subtitle = intl.get('security_score_access_point_subtitle_danger');
            }
        }

        return <SecurityCard status={status} title={title} subtitle={subtitle}>
            <SecurityCardButton
                type={status === SCRD_STATUS_FAIL ? SCB_TYPE_WARNING : SCB_TYPE_PRIMARY}
                action={onClickAccessPoint}
                title={intl.get('generic_view_details')} 
                disabled={!enabled}
            />
        </SecurityCard>;
    }
}

AccessPointCard.propTypes = {
    onClickAccessPoint: PropTypes.func,
    discovery: PropTypes.object, 
    enabled: PropTypes.bool
};
