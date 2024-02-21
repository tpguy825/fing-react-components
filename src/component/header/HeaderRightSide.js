import React, {Component} from 'react';

export default class HeaderRightSide extends Component {
    render() {

        const {dividerColor, className} = this.props;
        const cName = className || '';
        const borderClass = dividerColor ? `border-left ${dividerColor}` : '';
        return (
            <div className={`w-100 ${borderClass} ${cName}` }>
                {this.props.children}
            </div>
        )
    }
}