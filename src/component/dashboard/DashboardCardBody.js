import React from "react";

export default class DashboardCardBody extends React.Component {

    render(){
        const {title, subtitle, description} = this.props;
        return (
            
            <div className="card-body text-start pb-0">
                <p className="mb-0 initialism">{title}</p>
                <h3 className="mb-0">{subtitle}</h3>
                <p className="small mb-0">{description}</p>
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}