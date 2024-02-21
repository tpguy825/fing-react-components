import React from "react";

export default class DashboardCardFooter extends React.Component {

    render(){
        return (
            <div className="card-footer" style={{borderTop: 0}}>
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}