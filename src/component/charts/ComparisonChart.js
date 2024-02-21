import React, {Component} from 'react';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types';

const color = "#26A65D";

export default class ComparisonChart extends Component {

    render() {
        const {topItem, bottomItem, height} = this.props;

        return (
            <div className="text-center overflow-hidden h-100">
                <svg width="100%" height={height}>
                    {this.renderScale()}
                    {this.renderLegend()}

                    {this.renderTopItemLine(topItem)}
                    {this.renderBottomItemLine(bottomItem)}

                    {this.renderTopItemText(topItem)}
                    {this.renderBottomItemText(bottomItem)}
                </svg>
            </div>

        );
    }

    renderTopItemLine(item) {
        const x = `${item.getValue()}%`;
        return <>
            <line x1={x} y1="0" x2={x} y2="50%" transform="translate(0,15)" className="stroke-charcoal" />
            <circle cx={x} cy={15} r={5} className="fill-charcoal" />
        </>;
    }

    renderBottomItemLine(item) {
        const x = `${item.getValue()}%`;
        return <>
            <line x1={x} y1="50%" x2={x} y2="100%" transform="translate(0,-15)" className="stroke-charcoal"/>
            <circle cx={x} cy={"100%"} r={5} transform="translate(0,-15)" className="fill-charcoal"/>
        </>;
    }

    renderTopItemText(item) {
        const x = `${item.getValue()}%`;
        const shouldAnchorLeft = item.getValue() > 60;
        const dx = shouldAnchorLeft ? -16 : 16;
        return <>
            <text x={x} dx={dx} y="0%" dy={20} textAnchor={shouldAnchorLeft ? "end" : "start"}>
                <tspan className="font-weight-bolder">{item.getTitle()}</tspan>
                <tspan className="small fill-dark" x={x} dx={dx} dy="1.5em">{item.getSubTitle()}</tspan>
                <tspan className="small fill-secondary" x={x} dx={dx} dy="1.1em">{item.getExtra()}</tspan>
            </text>
        </>;
    }

    renderBottomItemText(item) {
        const x = `${item.getValue()}%`;
        const shouldAnchorLeft = item.getValue() > 60;
        const dx = shouldAnchorLeft ? -16 : 16;
        return (
            <text x={x} dx={dx} y="100%" dy={-42} textAnchor={shouldAnchorLeft ? "end" : "start"}>
                <tspan className="font-weight-bolder">{item.getTitle()}</tspan>
                <tspan className="small fill-dark" x={x} dx={dx} dy="1.5em">{item.getSubTitle()}</tspan>
                <tspan className="small fill-secondary" x={x} dx={dx} dy="1.1em">{item.getExtra()}</tspan>
            </text>
        );
    }

    renderScale() {
        return <>
            <linearGradient gradientTransform="rotate(-90)" id="scale_chart_gradient" gradientUnits="objectBoundingBox"
                            x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{"stopColor": color, "stopOpacity": 0}}/>
                <stop offset="1" style={{"stopColor": color}}/>
            </linearGradient>
            <rect x="0" y="50%" width="100%" height={30} rx="5"
                  transform="translate(0,-15)" fill="url(#scale_chart_gradient)" />
        </>;
    }

    renderLegend() {
        return (
            <>
                <text className="small fill-charcoal" x="8" y="50%" dy={5}>{intl.get('generic_worst')}</text>
                <text className="small fill-white" x="100%" dx={-8} y="50%" dy={5} textAnchor="end">{intl.get('generic_best')}</text>
            </>)
    }
}

ComparisonChart.propTypes = {
    topItem: PropTypes.object, // ComparisonChartItem
    bottomItem: PropTypes.object, // ComparisonChartItem
    height: PropTypes.number,
   
};

/**
 * Represents an item on the scale.
 */
export class ComparisonChartItem {
    value;
    title;
    subtitle;
    extra;

    constructor(value, title, subtitle, extra) {
        this.value = value;
        this.title = title;
        this.subtitle = subtitle;
        this.extra = extra;
    }

    getValue() {
        if (!this.value) return 0
        return Math.max(0, Math.min(this.value, 100))
    }

    getTitle() {
        return this.title || ''
    }

    getSubTitle() {
        return this.subtitle || ''
    }

    getExtra() {
        return this.extra || ''
    }
}