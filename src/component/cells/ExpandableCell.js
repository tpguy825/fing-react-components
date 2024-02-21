import React, {Component} from 'react';

export default class ExpandableCell extends Component {
    render() {
        const {icon, text, className} = this.props;
        const cName = className || "border w-70";

        return (
            <td className={cName} style={{verticalAlign: "middle"}}>
                <p className="mb-0">{icon}{text}</p>
            </td>
            
        )
    }
}