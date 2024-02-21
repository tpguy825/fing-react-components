import React, {Component} from 'react';

export default class BadgeCell extends Component {
    render() {
        const {badges, className} = this.props;
        const cName = className || "border w-70";

        return (
            <td className={cName} style={{verticalAlign: "middle"}}>
                {badges}
            </td>
            
        )
    }
}