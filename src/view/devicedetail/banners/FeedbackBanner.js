import React, { Component } from 'react';
import DeviceDetailBanner from '../../../component/detail/DeviceDetailBanner';
import ActionButton, { BTN_TINT_DANGER, BTN_TINT_SUCCESS } from '../../../component/ActionButton';
import intl from 'react-intl-universal';

export default class FeedbackBanner extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickYes = this.onClickYes.bind(this);
        this.onClickNo = this.onClickNo.bind(this);
    }

    onClickNo(){
        if(this.props.onClickNo){
            this.props.onClickNo();
        }
    }

    onClickYes(){
        if(this.props.onClickYes){
            this.props.onClickYes();
        }
    }

    render(){
        return (
            <DeviceDetailBanner 
                bgColor="alert-soft-primary"
                className="mb-4"
                title={intl.get('device_detail_banner_feedback_title')} 
                subtitle={intl.get('device_detail_banner_feedback_subtitle')}>
                <ActionButton title={intl.get('generic_yes')} action={this.onClickYes} tint={BTN_TINT_SUCCESS} icon="fa-thumbs-up"/>
                <ActionButton title={intl.get('generic_no')} action={this.onClickNo} tint={BTN_TINT_DANGER} icon="fa-thumbs-down" className="ml-2"/>
            </DeviceDetailBanner>
        )
    }

}