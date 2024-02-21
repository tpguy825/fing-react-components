import React from "react";

export default class DashboardCard extends React.Component {

    render(){
        return (
            <div className="card card-bordered shadow-none h-100">
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}