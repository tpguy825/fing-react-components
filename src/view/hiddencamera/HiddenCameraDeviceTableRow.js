import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ActionButton, { BTN_TINT_PRIMARY, BTN_TYPE_SOFT } from '../../component/ActionButton';
import DeviceTypeIcon from '../../component/icons/DeviceTypeIcon';
import { DT_GENERIC, TINT_DARK } from '../../model/Constants';
import Badge, { BADGE_TINT_PRIMARY } from '../../component/Badge';

export default class HiddenCameraDeviceTableRow extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickDetail = this.onClickDetail.bind(this);
    }

    onClickDetail(netNode){
        if(this.props.onClickDetail){
            this.props.onClickDetail(netNode)
        }
    }

    render(){
        const { netNode } = this.props;
        
        const moreAddresses = netNode.ipAddresses && netNode.ipAddresses.length > 1 ? "+" + (netNode.ipAddresses.length - 1) : "";
        return (
            <tr>
                <td>
                    <DeviceTypeIcon 
                        tint={TINT_DARK}
                        className="mx-2" 
                        type={netNode.bestType || DT_GENERIC}/>

                </td>
                <td>{netNode.bestName}</td>
                <td>
                    <div className="media align-items-center">
                        <span>
                            {netNode.ipAddresses[0]}
                        </span> 
                        {moreAddresses && <Badge soft tint={BADGE_TINT_PRIMARY} className="pb-1 ml-1" text={moreAddresses}/>}
                    </div>
                </td>
                <td className="col-4">{netNode.hwAddress}</td>
                <td className="col-1 text-right">
                    <ActionButton 
                        action={()=>this.onClickDetail(netNode)}
                        chevron={"fa-arrow-right"}
                        type={BTN_TYPE_SOFT}
                        tint={BTN_TINT_PRIMARY}
                        rounded={true}
                        className="mr-2"/>
                </td>
            </tr>
        )
    }

}

HiddenCameraDeviceTableRow.propTypes = {
    netNode: PropTypes.object,
    onClickDetail: PropTypes.func
};
