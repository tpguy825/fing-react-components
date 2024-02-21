import React, {Component} from 'react';

export default class HeaderLeftSide extends Component {
    render() {
        const {className} = this.props;
        const cName = className || '';
        return (
            <div className={`d-flex align-items-center justify-content-center ${cName}`}>
                <div className="text-center">
                    {this.props.children}
                </div>
            </div>
        )
    }
}