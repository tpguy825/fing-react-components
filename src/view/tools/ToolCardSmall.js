import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { TINT_WHITE } from '../../model/Constants';
import PremiumBadge from '../security/PremiumBadge';
import CardChevron from '../../component/card/CardChevron';
import ToolIcon from '../../component/icons/ToolIcon';

export default class ToolCardSmall extends PureComponent {

    render(){
        let {title, description, iconType, premium, disabled, backgroundClass, iconBackgroundClass, className, icon} = this.props;

        let shadowClass = "card-hover-shadow";
        let iconStyle = {borderRadius: "12px"};

        let iconColor = TINT_WHITE;
        if (disabled) {
            backgroundClass = "bg-soft-secondary";
            iconBackgroundClass = "bg-secondary";
            shadowClass = "shadow-none";
            iconStyle["opacity"] = "0.5";
        }

        const chevron = <CardChevron />;
        //const chevron = "";

        return (
            <div className={`card h-100 px-4 py-3  ${className} ${backgroundClass} ${shadowClass}`}>
                {premium && <PremiumBadge/>}
                <div className="d-flex align-items-start justify-content-between h-100">
                        <div className="d-flex justify-content-start align-items-center h-100">
                            <div style={iconStyle} className={`p-2 ${iconBackgroundClass}`}>
                                <ToolIcon color={iconColor} className={'d-flex '} size={'32px'} type={iconType}/>
                            </div>
                            <div className="d-block ml-3">
                                <h4 className={`mb-1 text-dark`}>{title}</h4>
                                <p className={`mb-0 text-dark small`}>{description}</p>
                            </div>
                            
                        </div>
                        
                    {chevron}
                </div>
                
            </div>
        );
    }
}


ToolCardSmall.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    iconType: PropTypes.string,
    premium: PropTypes.bool,
    disabled: PropTypes.bool,
    backgroundClass: PropTypes.string,
    iconBackgroundClass: PropTypes.string,
};
