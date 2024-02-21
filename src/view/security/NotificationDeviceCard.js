
import React from 'react';
import PropTypes from 'prop-types';
import intl from "react-intl-universal";
import { SCRD_STATUS_OK, SCRD_STATUS_WARN } from '../../model/Constants';
import SecurityCard from './SecurityCard';
import SecurityCardController from './SecurityCardController';

export default class NotificationDeviceCard extends SecurityCardController {
    constructor(props) {
        super(props);
        this.handleAlertOnNewNodesChanged = this.handleAlertOnNewNodesChanged.bind(this);
    }

    handleAlertOnNewNodesChanged() {
        if (this.props.handleAlertOnNewNodesChanged) {
            const newNetwork = Object.assign({}, this.props.network);
            newNetwork.alertOnNewNode = this.netAlertOnNewNodeSwitch.checked;
            this.props.handleAlertOnNewNodesChanged(newNetwork);
        }
    }

    computeCardStatus() {
        const { enabled, network } = this.props;
        const hasAlertOnNewNodeOn = network && network.alertOnNewNode === "true";

        if (enabled && hasAlertOnNewNodeOn) {
            return SCRD_STATUS_OK;
        }

        return SCRD_STATUS_WARN;
    }

    renderCard() {
        const { enabled } = this.props;

        let title = intl.get("security_score_alert_disabled_title");
        const subtitle = intl.get("security_score_alert_subtitle");
        const cardStatus = this.getCardStatus();
        const hasAlertOnNewNodeOn = cardStatus === SCRD_STATUS_OK;

        if (hasAlertOnNewNodeOn) {
            title = intl.get("security_score_alert_enabled_title");
        }

        return <SecurityCard hasBadge status={cardStatus} title={title} subtitle={subtitle}>
            <div className="custom-control custom-switch">
                <input id="alertOnNewNodeSwitch" type="checkbox"
                        className="custom-control-input"
                        ref={input => this.netAlertOnNewNodeSwitch = input}
                        onChange={this.handleAlertOnNewNodesChanged}
                        defaultChecked={hasAlertOnNewNodeOn === true ? "on" : null}
                        disabled={!enabled}/>
                <label className="custom-control-label" htmlFor="alertOnNewNodeSwitch">
                    {intl.get('security_score_alert_switch')}
                </label>
            </div>
        </SecurityCard>;
    }
    
}
NotificationDeviceCard.propTypes = {
    network: PropTypes.object, 
    handleAlertOnNewNodesChanged: PropTypes.func, 
    enabled: PropTypes.bool
};
