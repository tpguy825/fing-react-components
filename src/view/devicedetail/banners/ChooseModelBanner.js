import React, { Component } from 'react';
import ActionButton from '../../../component/ActionButton';
import DeviceDetailBanner from '../../../component/detail/DeviceDetailBanner';
import intl from 'react-intl-universal';

export default class ChooseModelBanner extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickChoose = this.onClickChoose.bind(this);
    }

    onClickChoose(){
        if(this.props.onClickChoose){
            this.props.onClickChoose();
        }
    }

    render(){
        return (
            <DeviceDetailBanner 
                bgColor="alert-soft-primary"
                className="mb-4"
                subtitle={intl.get('device_detail_banner_choose_subtitle')}>
                <ActionButton title={intl.get('device_detail_banner_choose_action')} action={this.onClickChoose} icon="fa-search"/>
            </DeviceDetailBanner>
        )
    }

}