import React, {Component} from 'react';

export default class DetailHeader extends Component {
    render() {
        const {title, className} = this.props;
        return (
            <div className={`d-inline-flex align-items-center justify-content-start w-100 ${className ? className : ""}`}>
                <h3 className="mb-0 text-nowrap">{title}</h3>
                <hr className="w-100 my-0 ml-2 border-primary" />
            </div>
        )
    }
}