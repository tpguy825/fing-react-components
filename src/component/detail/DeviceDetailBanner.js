import React, {Component} from 'react';

export default class DeviceDetailBanner extends Component {
    
    render() {
        const {title, subtitle, bgColor, textColor, className} = this.props;
        const textClass = textColor || "text-dark";
        const cName = className || "";
        return (
            <div className={"alert " + cName + " " + bgColor}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        {title && <h5 className="mb-0 card-title">{title}</h5>}
                        {subtitle && <p className={"mb-0 small " + textClass}>{subtitle}</p>}
                    </div>
                    <div className="d-flex align-items-center">
                        {React.Children.toArray(this.props.children)}
                    </div>
                </div>
            </div>
        )
    }
}