import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import ModalDialog, { ModalDialogBody, ModalDialogFooter } from '../../component/ModalDialog';
import ActionButton, { BTN_TINT_DARK, BTN_TYPE_GHOST } from '../../component/ActionButton';
import InfoPanel from '../../component/InfoPanel';
import { parseEthernetAnswer } from '../../helpers/NetworkHelper';
import { powerToSignalPercentage } from '../../helpers/WIFIRadioSignalHelper';
import { NT_WIFI } from '../../model/Constants';
import StatusIcon, { SI_SHAPE_CIRCLE, SI_STATUS_DANGER, SI_STATUS_SUCCESS, SI_STATUS_WARNING } from '../../component/icons/StatusIcon';
import { WIFI_PROTOCOL_SECURE, WIFI_PROTOCOL_SEMISECURE } from './AccessPointCard';
import { getProxyWpadAddress } from '../../helpers/ProxyHelper';

export default class AccessPointDialog extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.onCloseDialog = this.onCloseDialog.bind(this);
    }
    onCloseDialog() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    getWpsEnableIcon(nicInfo){
        if (nicInfo.wpsEnabled && nicInfo.wpsEnabled === 'true') {
            return <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_WARNING}/>
        }
        return '';
    }

    getProtocolIcon(nicInfo){
        let iconProtocol = SI_STATUS_SUCCESS;
        if(nicInfo.apSecurityProtocol){
            const protocol = nicInfo.apSecurityProtocol;
            if (WIFI_PROTOCOL_SECURE.filter(val => protocol.includes(val)).length > 0) {
                iconProtocol = SI_STATUS_SUCCESS;
            } else if (WIFI_PROTOCOL_SEMISECURE.filter(val => protocol.includes(val)).length > 0) {
                iconProtocol = SI_STATUS_WARNING;
            } else {
                iconProtocol = SI_STATUS_DANGER;
            }   
        }
        return <StatusIcon shape={SI_SHAPE_CIRCLE} status={iconProtocol}/>
    }

    render() {
        const {id, title, discovery} = this.props;
        const notAvailable = intl.get('generic_not_available');
        let values = [];

        const nicInfo = discovery && discovery.nicinfo ? discovery.nicinfo : null;
        if(nicInfo && nicInfo.type){
            const type = nicInfo.type ? nicInfo.type : '';

            values.push({value: intl.get('generic_type'), description: type});
            
            if(nicInfo.type === NT_WIFI){
                const apssid = nicInfo.apssid ? nicInfo.apssid : '';
                values.push({value: intl.get('generic_ssid'),description: apssid});
                
                const apbssid = nicInfo.apbssid ? nicInfo.apbssid : '';
                values.push({value: intl.get('generic_bssid'),description: apbssid});
                
                const band = nicInfo.channel ? intl.get('#_ghz',{num: nicInfo.channel > 14 ? 5 : 2.4}) : notAvailable;
                values.push({value: intl.get('generic_band'),description: band});
                
                const signal = nicInfo.signalstrength ? powerToSignalPercentage(Number(nicInfo.signalstrength)) + '%' : '';
                values.push({value: intl.get('generic_signal'),description: signal});
                
                const wpsIcon = this.getWpsEnableIcon(nicInfo);
                const wpsDescription = nicInfo.wpsEnabled ? nicInfo.wpsEnabled === "true" ? 'true' : 'false' : notAvailable;
                values.push({value: intl.get('generic_wps_enabled'),description: wpsDescription,icon: wpsIcon});
                
                const apSecurityProtocol = nicInfo.apSecurityProtocol ? nicInfo.apSecurityProtocol : notAvailable;
                const apIcon = this.getProtocolIcon(nicInfo);
                values.push({value: intl.get('generic_security'),description: apSecurityProtocol,icon: apIcon});
                
            } else {
                const speed = nicInfo.downlinkeffectiverate ? nicInfo.downlinkeffectiverate : '';
                values.push({value: intl.get('generic_link_speed'),description: parseEthernetAnswer(speed)});
            }

            const dhcpserver = nicInfo.dhcpserver ? nicInfo.dhcpserver : '';
            values.push({value: intl.get('generic_dhcp'),description: dhcpserver});

            const WPADs = getProxyWpadAddress(discovery);
            const wpadDescription = WPADs.length > 0 ? WPADs.join(',') : notAvailable;
            const statusWPAD = WPADs.length > 0 ? SI_STATUS_WARNING : SI_STATUS_SUCCESS;
            const proxyIcon = <StatusIcon shape={SI_SHAPE_CIRCLE} status={statusWPAD}/>;
            values.push({value: intl.get('generic_dhcp_proxy'),description: wpadDescription, icon: proxyIcon});

            
        }
        

        return <ModalDialog id={id} title={title || ''} onClose={this.onCloseDialog}>
            <ModalDialogBody>
                <InfoPanel values={values}/>
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton 
                    action={this.onCloseDialog} 
                    title={intl.get('generic_close')} 
                    type={BTN_TYPE_GHOST}
                    tint={BTN_TINT_DARK}/>
            </ModalDialogFooter>
        </ModalDialog>;
    }

}

AccessPointDialog.propTypes = {
    id: PropTypes.string,
    onClose: PropTypes.func,
    title: PropTypes.string,
    discovery: PropTypes.object,
};