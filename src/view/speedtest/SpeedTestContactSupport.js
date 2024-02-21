import React, {Component} from 'react';
import {
    SI_FACEBOOK,
    SI_PHONE,
    SI_TWITTER,
    SI_WEBSITE
} from '../../model/Constants';
import PropTypes from 'prop-types';

import intl from 'react-intl-universal';
import SupportIcon from '../../component/icons/SupportIcon';

export default class SpeedTestContactSupport extends Component {

    constructor(props, context) {
        super(props, context);
        this.onSupportIconClicked = this.onSupportIconClicked.bind(this);
    }

    componentDidMount() {
        window.initTooltips();
    }

    onSupportIconClicked(url, type) {
        if (url && type && this.props.onSupportIconClicked) {
            this.props.onSupportIconClicked(url, type);
        }
    }

    render() {
        const exists = (v) => v !== null && v !== undefined && v.length > 0;
        const resultFacebook = this.props.result.getSupportFacebook();
        const resultTwitter = this.props.result.getSupportTwitter();
        const resultWebsite = this.props.result.getSupportWebsite();
        const resultPhone = this.props.result.getSupportPhone();
        const onFacebookClick = () => this.onSupportIconClicked(resultFacebook, SI_FACEBOOK);
        const onTwitterClick = () => this.onSupportIconClicked(resultTwitter, SI_TWITTER);
        const onWebsiteClick = () => this.onSupportIconClicked(resultWebsite, SI_WEBSITE);
        const onPhoneClick = () => this.onSupportIconClicked(resultPhone, SI_PHONE);
        const cName = 'icon icon-sm icon-soft-primary icon-circle';
        return (
            <div className="w-100">
                <h5>{intl.get('speedtest_contact_support')}</h5>
                <div className="list-inline">
                    <div    className='list-inline-item'
                            data-toggle="tooltip" 
                            data-placement="top" 
                            title={resultFacebook}>
                            <SupportIcon    className={cName}
                                            onClick={onFacebookClick}
                                            disabled={!exists(resultFacebook)} 
                                            type={SI_FACEBOOK}
                                            size={16}/>
                    </div>
                    <div    className='list-inline-item'
                            data-toggle="tooltip" 
                            data-placement="top" 
                            title={resultTwitter}>
                            <SupportIcon    className={cName}
                                            onClick={onTwitterClick}
                                            disabled={!exists(resultTwitter)} 
                                            type={SI_TWITTER} 
                                            size={16}/>
                    </div>
                    <div    className='list-inline-item'
                            data-toggle="tooltip" 
                            data-placement="top" 
                            title={resultWebsite}>
                            <SupportIcon    className={cName}
                                            onClick={onWebsiteClick}
                                            disabled={!exists(resultWebsite)} 
                                            type={SI_WEBSITE} 
                                            size={16}/>
                    </div>
                    <div className='list-inline-item'
                            data-toggle="tooltip" 
                            data-placement="top" 
                            title={resultPhone}>
                            <SupportIcon    className={cName}ù
                                            onClick={onPhoneClick}
                                            disabled={!exists(resultPhone)} 
                                            type={SI_PHONE} 
                                            size={16}/>
                    </div>
                </div>
            </div>
        );
    }
}

SpeedTestContactSupport.propTypes = {
    onSupportIconClicked: PropTypes.func,
    result: PropTypes.object
};