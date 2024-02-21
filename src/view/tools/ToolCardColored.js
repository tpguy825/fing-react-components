import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { TINT_DARK, TINT_SECONDARY, TINT_WHITE } from '../../model/Constants';
import PremiumBadge from '../security/PremiumBadge';
import ToolIcon from '../../component/icons/ToolIcon';

export default class ToolCardColored extends PureComponent {

    render(){
        let {title, description, iconType, premium, backgroundClass} = this.props;

        let shadowClass = 'card-frame shadow card-hover-shadow';

        let textColor = 'text-white';
        let iconColor = TINT_WHITE;
        if (premium) {
            shadowClass = 'shadow-none';
            backgroundClass = 'bg-light';
            textColor = 'text-secondary';
            iconColor = TINT_DARK;
        }

        // const chevron = <i className="align-self-center fa fa-chevron-right text-dark ml-2"/>;
        const chevron = "";

        return (
            <div className={`card h-100 p-4 ${backgroundClass} ${shadowClass}`}>
                {premium && <PremiumBadge/>}
                <div className="d-flex align-items-start justify-content-between h-100">
                    <div className="d-block">
                        <div className="d-flex justify-content-start align-items-center mb-2">
                            <div style={{borderRadius: '12px'}} className={`p-2 fill-white`}>
                                <ToolIcon color={iconColor} size={'32px'} className={'d-flex'} type={iconType}/>
                            </div>
                            <h3 className={`ml-3 mb-0 ${textColor}`}>{title}</h3>
                        </div>
                        <p className={`${textColor}`}>{description}</p>
                    </div>
                    {chevron}
                </div>
                
            </div>
        );
    }
}


ToolCardColored.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    iconType: PropTypes.string,
    premium: PropTypes.bool,
    backgroundClass: PropTypes.string,
    iconBackgroundClass: PropTypes.string,
};
