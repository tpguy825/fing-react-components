import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TINT_DARK, TINT_WHITE} from '../../model/Constants';
import PremiumBadge from '../security/PremiumBadge';
import ToolIcon from '../../component/icons/ToolIcon';

export default class ToolCardAlternative extends PureComponent {

    render(){
        let {title, description, iconType, premium, backgroundClass, iconBackgroundClass} = this.props;

        let shadowStyle = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px';

        if (premium) {
            shadowStyle = 'none';
            backgroundClass = 'bg-soft-secondary';
        }
        
        return (
            <div style={{boxShadow: shadowStyle}} 
                className={`card h-100 my-auto px-3 py-4 ${backgroundClass}`}>
                {premium && <PremiumBadge/>}
                <div className="d-flex align-items-start justify-content-between h-100">
                    <div className="d-block">
                        <div className={`m-2`}>
                            <ToolIcon color={TINT_DARK} size={'32px'} type={iconType}/>
                        </div>
                        <h3 className="mx-2 mb-0">{title}</h3>
                        <p className="my-2 ml-2 mr-4">{description}</p>
                    </div>
                </div>
                
            </div>
        );
    }
}


ToolCardAlternative.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    iconType: PropTypes.string,
    premium: PropTypes.bool,
    backgroundClass: PropTypes.string,
};
