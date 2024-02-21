import React, {Component} from 'react';

export default class SolutionBadge extends Component {
    
    render() {
        const {text, icon, disabled, action} = this.props;
        const colorText = disabled ? "text-muted" : "text-primary";
        const colorBg = disabled ? "badge-soft-secondary" : "badge-soft-primary";

        return disabled ?
            <span style={{borderRadius: "50px"}} 
                className={"badge w-100 p-2 my-2 d-flex align-items-center justify-content-lg-start " + colorBg}>
                <span className="d-flex align-items-center justify-content-center legend-indicator bg-light p-2 mr-2" style={{width:30,height:30}}>
                    <i className={icon}/>
                </span>
                <h5 className={"mb-0 " + colorText}>
                    {text}
                </h5>
            </span> :
            <a role="button">
                <span onClick={action} style={{borderRadius: "50px"}} 
                    className={"badge w-100 p-2 my-2 d-flex align-items-center justify-content-lg-start " + colorBg}>
                    <span className="d-flex align-items-center justify-content-center legend-indicator bg-light p-2 mr-2" style={{width:30,height:30}}>
                        <i className={icon}/>
                    </span>
                    <h5 className={"mb-0 " + colorText}>
                        {text}
                    </h5>
                </span>
            </a>
                
        
    }
}