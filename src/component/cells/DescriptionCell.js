import React, {Component} from 'react';

export default class DescriptionCell extends Component {
    render() {
        const {text, className} = this.props;

        const cName = className || "border w-70";

        return (
            <td className={cName} style={{verticalAlign: "middle"}}>
                <span className="mb-0 font-weight-bold text-dark">
                    {text}
                </span>
            </td>
            
        )
    }
}