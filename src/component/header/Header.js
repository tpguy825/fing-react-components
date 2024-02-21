import React, {Component} from 'react';

export default class Header extends Component {
    render() {
        const {className, classContainer} = this.props;
        const cName = className || '';
        const cContainer = classContainer || '';

        return (
            <div className={`w-100 ${cName}`}>
                <div className={`container ${cContainer}`}>
                    <div className="d-flex align-items-center justify-content-start">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}