import React, {Component} from 'react';

export default class SummaryRow extends Component {
    render() {
        return (
            <div className="row mb-3">
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}