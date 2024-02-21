import React, {Component} from 'react';

export default class TitleCell extends Component {
    render() {
        const {text, className} = this.props;
        const cName = className || "border w-30";

        return (
            <td className={cName} style={{verticalAlign: "middle"}}>
                    <p className="mb-0">{text}</p>
            </td>
            
        )
    }
}