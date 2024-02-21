import React, {Component} from 'react';
import SegmentedChart, { SC_DIM_SMALL } from '../charts/SegmentedChart';

const COLORS = [
    '#F7CA45',
    '#DECF4B',
    '#C5D251',
    '#91D251',
    '#36CE33',
]

export default class SummaryInternetScore extends Component {
    render() {
        const {leftText, rightText, score, infoText} = this.props;
        const coloringFn = (idx) => {
            if (idx >= 0 && idx < COLORS.length) return COLORS[idx];
        }
        return (
            <SummaryInternetCard background={'bg-light'}>
                <SummaryInternetCardBody>
                    <div className="container pb-3">
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className="d-flex align-items-center justify-content-center h-100">
                                    <div style={{width: '300px'}}>
                                        <SegmentedChart
                                            coloringFn={coloringFn}
                                            value={score} 
                                            length={5}
                                            dimension={SC_DIM_SMALL}
                                            leftText={leftText} 
                                            rightText={rightText}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 pl-lg-6">
                                <p className="text-dark">{infoText}</p>
                                {React.Children.toArray(this.props.children)}
                            </div>
                        </div>
                    </div>
                </SummaryInternetCardBody>
            </SummaryInternetCard>
        )
    }
}

class SummaryInternetCard extends Component {
    render() {
        const {background, badgeIcon} = this.props;

        return (
            <div className={`card card-bordered shadow-none h-100 ${background || ''}`}>
                {badgeIcon}
                {this.props.children}
            </div>
        )
    }
}

class SummaryInternetCardBody extends Component {
    render() {
        const {className} = this.props;

        return (
            <div className={`card-body px-3 pt-4 pb-2 ${className || ''} `}>
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}