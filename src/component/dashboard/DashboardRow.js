import React from "react";

export default class DashboardRow extends React.Component {

    render(){
        return (
            <div className="row">
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}