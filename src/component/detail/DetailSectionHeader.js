import React, {Component} from 'react';

export default class DetailSectionHeader extends Component {
    render() {
        const {title, element, className} = this.props;
        return (
            <>
                {(title || element) && <div className={`d-flex justify-content-between align-items-end ${className ? className : ""}`}>
                    <h4 className="mb-0">{title}</h4>
                    {element}
                </div>}
            </>
        )
    }
}