import React, {Component} from 'react';
import intl from "react-intl-universal";
import PropTypes from 'prop-types';
import { bestIspLocation, getLocationFromDiscovery } from '../../helpers/NetworkHelper';

export default class InternetSetupSection extends Component {

    render(){
        const { info } = this.props;

        const renderInfoRow = (key, value) => {
            return [
                <dt key={"t" + key} className="col-sm-4 text-muted font-weight-normal mt-2">{key}</dt>,
                <dd key={"d" + key} className="col-sm-8 mt-2"><span className="text-dark">{value}</span></dd>
            ];
        }
        if(!info) return '';
        let name = '', address = '', hostName = '', location = '', timezone = '';
        if(info.ispinfo && info.ispinfo.name){
            name = renderInfoRow(intl.get('discovery_network_internet_isp'), info.ispinfo.name);
        }
        location = renderInfoRow(intl.get('discovery_network_internet_location'), bestIspLocation(info))

        if(info.isp){
            if(info.isp.address){
                address = renderInfoRow(intl.get('discovery_network_internet_pubaddress'), info.isp.address)
            }

            if(info.isp.host_name){
                hostName = renderInfoRow(intl.get('discovery_network_internet_hostname'), info.isp.host_name)
            }
            if(info.isp.timezone){
                timezone = renderInfoRow(intl.get('discovery_network_internet_timezone'), info.isp.timezone)
            }
        }
        return (
            <>
                <h3 className="mb-0">{intl.get('discovery_network_internet_header')}</h3>
                <dl className="row">
                    {name}
                    {address}
                    {hostName}
                    {location}
                    {timezone}
                </dl>
            </>
        )
    }
}

InternetSetupSection.propTypes = {
    info: PropTypes.object,
};