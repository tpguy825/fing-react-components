import React, {Component} from 'react';

export default class SummarySection extends Component {
    render() {
        return (
            <div className="mt-3 mb-6">
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}