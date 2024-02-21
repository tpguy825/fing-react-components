import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { TINT_WHITE } from '../../model/Constants';
import PremiumBadge from '../security/PremiumBadge';
import ToolIcon from '../../component/icons/ToolIcon';

export default class ToolCardHorizontal extends PureComponent {

    render(){
        let {title, description, iconType, premium, backgroundClass, iconBackgroundClass} = this.props;

        let shadowClass = 'card-frame shadow card-hover-shadow';

        if (premium) {
            shadowClass = 'shadow-none';
            iconBackgroundClass = 'bg-secondary';
            backgroundClass = 'bg-soft-secondary';
        }

        return (
            <div className={`card h-100 overflow-hidden ${backgroundClass || ''} ${shadowClass}`}>
                {premium && <PremiumBadge/>}
                <div className="row h-100 no-gutters">
                    <div className={`col-md-3 ${iconBackgroundClass}`}>
                        <div className="d-flex mt-4 justify-content-center">
                            <ToolIcon color={TINT_WHITE} size={'32px'} type={iconType}/>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card-body">
                            <h3 className="card-title">{title}</h3>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ToolCardHorizontal.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    iconType: PropTypes.string,
    premium: PropTypes.bool,
    backgroundClass: PropTypes.string,
    iconBackgroundClass: PropTypes.string,
};
