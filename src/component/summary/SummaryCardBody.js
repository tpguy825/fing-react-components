import React, {Component} from 'react';

export default class SummaryCardBody extends Component {

    render() {
        const { reduce, className } = this.props;

        return (
            <div className={`card-body p-3 col-xl-${reduce ? "7" : "8"} col-lg-${reduce ? "6" : "7"} ${className || ''} `}>
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}