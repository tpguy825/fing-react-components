import React, {Component} from 'react';
import CopyToClipboard from '../CopyToClipboard';

export default class CopyTextCell extends Component {
    render() {
        const {text, className} = this.props;
        const cName = className || "border w-70";

        return (
            <td className={cName} style={{verticalAlign: "middle"}}>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="mb-0 font-weight-bold text-dark">{text}</span>
                    <div className="d-flex align-items-center justify-content-center">
                        <CopyToClipboard text={text} />
                    </div>
                </div>
            </td>
            
        )
    }
}