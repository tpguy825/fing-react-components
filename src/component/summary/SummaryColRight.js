import React, {Component} from 'react';

export default class SummaryColRight extends Component {
    render() {
        return (
            <div className="col-lg-6">
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}