import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ToolSection extends Component {
    
    constructor(props, context) {
        super(props, context);

    }

    render(){
        const {title, wrap} = this.props;

        const colClass = wrap === true ? "col-12 col-md-6 col-xs-12 col-lg-4" : "px-4";
        return (
            <div className="mb-6">
                <h4 className="mb-0">{title}</h4>
                <div className="container mb-3 ml-0 px-0">
                    <div className="row">
                        {React.Children.toArray(this.props.children.map(card =>
                            <div className={`my-3 ${colClass}`}>
                                {card}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

ToolSection.propTypes = {
    title: PropTypes.string,
    wrap: PropTypes.bool
};
