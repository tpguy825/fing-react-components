import React from 'react';

export default class HeaderTrailingSide extends React.Component {
    render() {
        const className = `col-auto p-0 ${this.props.className || ""}`;

        return <div className={className}>
            {this.props.children}
        </div>;
    }
}