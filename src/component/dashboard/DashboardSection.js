import React from "react";

export default class DashboardSection extends React.Component {

    render(){
        const {className} = this.props;
        const cName = className || '';
        return (
            <section className={cName}>
                <div className="space-1 container">
                    {React.Children.toArray(this.props.children)}
                </div>
            </section>
        )
    }
}