import React, {Component} from 'react';

export default class HeaderSubSideAction extends Component {
    render() {
        const {className} = this.props;
        const cName = className || '';
        return (
            <div className={`d-flex d-md-block d-sm-block d-lg-flex align-items-center justify-content-between ${cName}`}>
                {this.props.children}
            </div>
        )
    }
}