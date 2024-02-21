import React, {Component} from 'react';
import intl from 'react-intl-universal';
import SegmentedChart, { SC_DIM_SMALL } from '../charts/SegmentedChart';
import Header from '../header/Header';

const COLORS = [
    '#F7CA45',
    '#DECF4B',
    '#C5D251',
    '#91D251',
    '#36CE33',
]

export default class SummarySecurityScore extends Component {
    render() {
        const {leftText, rightText, infoTitle, infoText, score} = this.props;
        const coloringFn = (idx) => {
            if (idx >= 0 && idx < COLORS.length) return COLORS[idx];
        }

        return (
            <Header className="bg-soft-primary overflow-hidden">
                <div className="container pb-1 pt-3 px-2">
                    <div className="row">
                        <div className="col-xl-4 col-12">
                            <h4>{intl.get("security_score_score")}</h4>
                            <div className="pb-1 pt-2" style={{width: "300px"}}>
                                <SegmentedChart className="text-dark"
                                    coloringFn={coloringFn}
                                    value={score} 
                                    length={5}
                                    dimension={SC_DIM_SMALL}
                                    leftText={leftText} 
                                    rightText={rightText}/>
                            </div>
                        </div>
                        <div className="col-xl-8 col-12 pb-1 text-dark">
                            <div className="pb-1 mb-0 font-weight-normal">{infoTitle}</div>
                            <div style={{ lineHeight: 1.3 }}>{infoText}</div>
                        </div>
                    </div>
                </div>
            </Header>
        );
    }
}
