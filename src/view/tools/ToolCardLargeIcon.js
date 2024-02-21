import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { TINT_WHITE } from '../../model/Constants';
import PremiumBadge from '../security/PremiumBadge';
import ToolIcon from '../../component/icons/ToolIcon';

export default class ToolCardLargeIcon extends PureComponent {

    render(){
        let {title, description, iconType, premium, iconBackgroundClass} = this.props;

        if (premium) {
            iconBackgroundClass = 'bg-secondary';
        }

        return (
            <div className={`h-100`} style={{width: 200}}>
                <div className="d-flex align-items-start justify-content-between h-100">
                    <div>
                        {premium && <PremiumBadge/>}
                        <div style={{borderRadius: '20px'}} className={`d-inline-block p-3 mb-3 ${iconBackgroundClass}`}>
                            <ToolIcon color={TINT_WHITE} size={'64px'} type={iconType}/>
                        </div>
                        <h3 className="mb-0">{title}</h3>
                        <p className="text-dark">{description}</p>
                    </div>
                </div>
                
            </div>
        );
    }
}


ToolCardLargeIcon.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    iconType: PropTypes.string,
    premium: PropTypes.bool,
    backgroundClass: PropTypes.string,
    iconBackgroundClass: PropTypes.string,
};
