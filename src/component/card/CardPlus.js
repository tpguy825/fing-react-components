import React, {PureComponent} from "react";

export default class CardPlus extends PureComponent {

    render() {
        const {color} = this.props;
        const colorClass = color || 'text-muted';
        return <i className={"align-self-center fa fa-plus ml-2 " + colorClass} style={{opacity: "0.5"}} />;
    }
}