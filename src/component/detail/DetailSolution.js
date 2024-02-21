import React, { Component } from 'react';

export default class DetailSolution extends Component {
    
    render() {
        const {className, title} = this.props;

        return (
            <div className={className}>
                <h4>{title}</h4>
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}