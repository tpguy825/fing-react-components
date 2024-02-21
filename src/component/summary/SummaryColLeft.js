import React, {Component} from 'react';

export default class SummaryColLeft extends Component {
    render() {
        return (
            <div className="col-lg-6 mb-3 mb-lg-0">
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}