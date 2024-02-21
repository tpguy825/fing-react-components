import React from "react";

export default class DashboardCol extends React.Component {

    render(){
        return (
            <div className="col-3 col-sm-12 col-md-6 col-lg-6 col-xl-3 mb-3">
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}