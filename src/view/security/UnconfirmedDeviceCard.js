
import React from 'react';
import PropTypes from 'prop-types';
import intl from "react-intl-universal";
import SecurityCardButton, { SCB_TYPE_SECONDARY } from './SecurityCardButton';
import { SCRD_STATUS_OK, SCRD_STATUS_WARN } from '../../model/Constants';
import SecurityCard from './SecurityCard';
import SecurityCardController from './SecurityCardController';

export default class UnconfirmedDeviceCard extends SecurityCardController {
    constructor(props) {
        super(props);
        this.onConfirmDevices = this.onConfirmDevices.bind(this);
        this.onClickEventsTimeline = this.onClickEventsTimeline.bind(this);
    }

    onConfirmDevices() {
        if (this.props.onConfirmDevices) {
            this.props.onConfirmDevices();
        }
    }

    onClickEventsTimeline() {
        if (this.props.onClickEventsTimeline) {
            this.props.onClickEventsTimeline();
        }
    }

    computeCardStatus() {
        const { netNodes } = this.props;
        let nothingToConfirm = false;

        if (netNodes && netNodes.length > 0) {
            const devicesConfirmed = netNodes.filter(netNode => netNode.isConfirmed()).length;
            nothingToConfirm = devicesConfirmed === netNodes.length;
        }
        
        return nothingToConfirm ? SCRD_STATUS_OK : SCRD_STATUS_WARN;
    }

    renderCard() {
        const { netNodes, enabled } = this.props;

        let nothingToConfirm = false;
        let devicesConfirmed = 0;
        let title = "";

        if (netNodes && netNodes.length > 0) {
            devicesConfirmed = netNodes.filter(netNode => netNode.isConfirmed()).length;
            nothingToConfirm = devicesConfirmed === netNodes.length;
            const localeString = netNodes.length - devicesConfirmed === 1 ? "security_score_unconfirmed_devices_title" : "security_score_unconfirmed_devices_titles";
            
            title = nothingToConfirm ? 
                intl.get('security_score_all_confirmed_devices_title') :
                intl.get(localeString, { num: netNodes.length - devicesConfirmed })
            ;
        }
        
        const subtitle = intl.get('security_score_unconfirmed_devices_subtitle');
        const cardStatus = this.getCardStatus();

        return <SecurityCard status={cardStatus}
            title={title} subtitle={subtitle}
        >
            <SecurityCardButton
                type={SCB_TYPE_SECONDARY}
                title={intl.get("view_timeline_button")}
                icon="fa-history"
                action={this.onClickEventsTimeline}
                disabled={!enabled}
            />
            <SecurityCardButton
                action={this.onConfirmDevices}
                title={intl.get('security_score_confirm_devices')}
                disabled={!enabled || nothingToConfirm}
            />
        </SecurityCard>;
    }
}

UnconfirmedDeviceCard.propTypes = {
    netNodes: PropTypes.array,
    onClickEventsTimeline: PropTypes.func,
    onConfirmDevices: PropTypes.func
};
