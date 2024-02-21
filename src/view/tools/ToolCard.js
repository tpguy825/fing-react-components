import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TINT_WHITE} from '../../model/Constants';
import PremiumBadge from '../security/PremiumBadge';
import CardChevron from '../../component/card/CardChevron';
import ToolIcon from '../../component/icons/ToolIcon';

export default class ToolCard extends PureComponent {

    render() {
        let {title, description, iconType, premium, disabled, backgroundClass, iconBackgroundClass} = this.props;

        let shadowClass = "shadow card-hover-shadow";
        let iconStyle = {borderRadius: "12px"};

        if (disabled) {
            shadowClass = "shadow-none";
            iconBackgroundClass = "bg-secondary";
            backgroundClass = "bg-soft-secondary";
            iconStyle["opacity"] = "0.5";
        }

        const chevron = <CardChevron />;
        // const chevron = "";

        return (
            <div className={`card card-frame h-100 px-4 py-3 ${backgroundClass || ''} ${shadowClass || ''}`}>
                {premium && <PremiumBadge/>}
                <div className="d-flex align-items-start justify-content-between h-100">
                    <div>
                        <div className="d-flex justify-content-start align-items-center mb-2">
                            <div style={iconStyle} className={`p-2 ${iconBackgroundClass}`}>
                                <ToolIcon color={TINT_WHITE} size={'32px'} className={'d-flex'} type={iconType}/>
                            </div>
                            <h3 className="ml-3 mb-0">{title}</h3>
                        </div>
                        <p className="text-dark mb-2">{description}</p>
                    </div>
                    {chevron}
                </div>
            </div>
        );
    }
}


ToolCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    iconType: PropTypes.string,
    premium: PropTypes.bool,
    disabled: PropTypes.bool,
    backgroundClass: PropTypes.string,
    iconBackgroundClass: PropTypes.string,
};
