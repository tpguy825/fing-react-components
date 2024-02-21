import React, {Component} from 'react';

export default class SummaryCardFooter extends Component {

    render() {
        const { expand } = this.props;
        const colClasses = expand ? "col-xl-5 col-lg-6" : "col-xl-4 col-lg-5";

        return (
            <div className={`bg-transparent ${colClasses} pl-lg-0 pl-6 d-flex justify-content-lg-end justify-content-start align-items-center`}>
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}