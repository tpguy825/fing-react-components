import React, {Component} from 'react';
import {GEN_BADGE, TINT_PURPLE} from "../../model/Constants";
import GenericIcon from "../../component/icons/GenericIcon";

export default class PremiumBadge extends Component {
    render() {
        return (
            <div style={{position: 'absolute',right: 24,top:-2}}>
                <GenericIcon type={GEN_BADGE} color={TINT_PURPLE} size={24}/>
            </div>
        )
        
    }
}
