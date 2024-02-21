import React, {Component} from 'react';
import LinkCard from '../../view/tools/LinkCard';

export default class LinkCell extends Component {
    render() {
        const {action, text, className} = this.props;
        const cName = className || "border w-70";

        return (
            <td className={cName} style={{verticalAlign: "middle"}}>
                <LinkCard action={action}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="mb-0 font-weight-bold text-primary">{text}</span>
                        <i className="fa fa-link text-primary"></i>
                    </div>
                </LinkCard>
            </td>
            
        )
    }
}