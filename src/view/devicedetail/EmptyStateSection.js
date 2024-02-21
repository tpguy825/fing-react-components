import React, {Component} from 'react';

export default class EmptyStateSection extends Component {
    
    render() {
        const {title, subtitle, className} = this.props;
        return (
            <div className={className}>
                <div className="d-flex align-items-center justify-content-start w-100 mb-2">
                    <span className="legend-indicator bg-warning d-flex align-items-center justify-content-center" style={{width:30,height:30}}>
                        <i className={"fa fa-exclamation text-white"}/>
                    </span>
                     <h4 className="mb-0">{title}</h4>
                </div>
                <p className="mb-0 text-dark">
                    {subtitle}
                </p>
            </div>
        )
    }
}