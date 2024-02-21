import React, {Component} from 'react';
import CopyToClipboard from '../CopyToClipboard';
import ProgressBar, { PB_MD, PB_VISIBLE_ALWAYS } from '../ProgressBar';

export default class ComplexCell extends Component {
    render() {
        const {text, className, icon, progressValue} = this.props;
        const cName = className || "border w-70";

        const progressClass = progressValue > 66 ? "bg-success" : progressValue > 40 ? "bg-warning" : "bg-danger";
        const progressText = progressValue > 40 && progressValue < 60 ? 
                                <p className="text-dark mb-0">{progressValue+'%'}</p>:
                                progressValue + '%';
        return (
            <td className={cName} style={{verticalAlign: "middle"}}>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="mb-0 font-weight-bold text-dark">{text}</span>
                    <div className="d-flex align-items-center justify-content-center">
                        <CopyToClipboard text={text} />
                    </div>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                    <span className="mr-2">{icon}</span>
                    <span className="w-100">
                        {progressValue < 5 ? 
                        <ProgressBar size={PB_MD} visibilityPolicy={PB_VISIBLE_ALWAYS} barClassName={progressClass} value={progressValue}/> :
                        <ProgressBar size={PB_MD} visibilityPolicy={PB_VISIBLE_ALWAYS} barClassName={progressClass} value={progressValue} text={progressText}/>}
                    </span>
                </div>
            </td>
            
        )
    }
}