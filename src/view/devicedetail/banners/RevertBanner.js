import React, { Component } from 'react';
import DeviceDetailBanner from '../../../component/detail/DeviceDetailBanner';
import ActionButton from '../../../component/ActionButton';
import intl from 'react-intl-universal';

export default class RevertBanner extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickRevert = this.onClickRevert.bind(this);
    }

    onClickRevert(){
        if(this.props.onClickRevert){
            this.props.onClickRevert();
        }
    }

    render(){
        return (
            <DeviceDetailBanner 
                bgColor="alert-soft-primary"
                className="mb-4"
                subtitle={intl.get('device_detail_banner_revert_subtitle')}>
                <ActionButton action={this.onClickRevert} title={intl.get('device_detail_banner_revert_action')}/>
            </DeviceDetailBanner>
        )

    }

}