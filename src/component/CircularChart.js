import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    TINT_PRIMARY,
    TINT_SUCCESS,
    TINT_WARNING,
    TINT_DANGER,
    TINT_NAVY,
    TINT_DARK
} from '../model/Constants';

export const CC_DIM_SMALL = "DIM_SMALL";
export const CC_DIM_DEFAULT = "DIM_DEFAULT";
export const CC_DIM_LARGE = "DIM_LARGE";

export const CC_ANIM_FAST = "ANIM_FAST";
export const CC_ANIM_SLOW = "ANIM_LOW";

export const CC_RADIUS_SMALL = "RADIUS_SMALL";
export const CC_RADIUS_DEFAULT = "RADIUS_DEFAULT";
export const CC_RADIUS_LARGE = "RADIUS_LARGE";


export default class CircularChart extends Component {
    state = {}
    componentDidMount() {
        // For initial animation
        setTimeout(() => {
            this.setState({ startAnimationComponent: true });
        });
        
    }
    getValueLabel(){
        return this.props.initState ? '0' : this.props.valueLabel
    }
    getProgress(){
        return this.props.initState ? '0' : this.props.progress
    }

    tintToColorClass(tint){
        if (!tint) return "stroke-primary";
        switch (tint) {
            case TINT_PRIMARY: return "stroke-primary";
            case TINT_SUCCESS: return "stroke-success";
            case TINT_WARNING: return "stroke-warning";
            case TINT_DANGER: return "stroke-danger";
            case TINT_NAVY: return "stroke-navy";
            case TINT_DARK: return "stroke-dark";
            default: return "stroke-primary";
        }
    }
    tintToSpinnerColorClass(tint){
        if (!tint) return "text-primary";
        switch (tint) {
            case TINT_PRIMARY: return "text-primary";
            case TINT_SUCCESS: return "text-success";
            case TINT_WARNING: return "text-warning";
            case TINT_DANGER: return "text-danger";
            case TINT_NAVY: return "text-navy";
            case TINT_DARK: return "text-dark";
            default: return "text-primary";
        }
    }

    getTotalDimension(dim){
        if (!dim) return 180;
        switch (dim) {
            case CC_DIM_DEFAULT: return 180;
            case CC_DIM_LARGE: return 230;
            case CC_DIM_SMALL: return 130;
            default: return 180;
        }
    }

    getAnimation(anim){
        let path = (duration) => `all ${duration}s cubic-bezier(0.58, 0.16, 0.5, 1.14)`;
        if (!anim) return path(0.2);
        switch (anim) {
            case CC_ANIM_FAST: return path(0.2);
            case CC_ANIM_SLOW: return path(1);
            default: return path(0.2);
        }
    }

    getRadius(rad){
        if (!rad) return 70;
        switch (rad) {
            case CC_RADIUS_DEFAULT: return 70;
            case CC_RADIUS_LARGE: return 80;
            case CC_RADIUS_SMALL: return 60;
            default: return 70;
        }
    }

    getStrokeWidth(dim){
        if (!dim) return 18;
        switch (dim) {
            case CC_DIM_DEFAULT: return 18;
            case CC_DIM_LARGE: return 20;
            case CC_DIM_SMALL: return 16;
            default: return 18;
        }
    }
    render() {
        const { className, failed, loading} = this.props; // progress, color, animated, dimension, radius, animation, min, max, value

        // Ensure the user value is always between 0 and 100
        const value = Math.max(0, Math.min(this.getProgress(), 100));

        const userMax = 100;  // Value scaled outside the component
        const circleMax = 75;   // Value scaled inside the component
        const scaledValue = ((value * circleMax) / userMax);

        const circleRadius = Math.min(this.getRadius(this.props.radius), 85);
        const circumference = 2 * 3.14 * circleRadius;
        const strokeLength = this.state.startAnimationComponent ? circumference / 100 * scaledValue : 0;

        // Change this part of code to change the type of the circle(full/half/ecc.ecc.)
        const strokeLengthFull = this.state.startAnimationComponent ? circumference / 100 * 75 : 0;

        return (
            <svg viewBox="0 0 180 180" 
                 width={this.getTotalDimension(this.props.dimension)} 
                 height={this.getTotalDimension(this.props.dimension)}
                 className={className || ""}>

                {this.renderCircle(circleRadius,strokeLengthFull, circumference, true)}
                {failed ? '' : this.renderCircle(circleRadius,strokeLength, circumference, false)}
                {loading ? this.renderSpinner() : this.getValueLabel() && this.renderText(50,50, 30, "middle", failed ? '--' : this.props.valueLabel)}
                {this.props.minLabel && this.renderText(15,93, 14, "start", this.props.minLabel)}
                {this.props.maxLabel && this.renderText(85,93, 14, "end", this.props.maxLabel)}
            </svg>
        );
    }
    renderSpinner(){
        return (
            <foreignObject textAnchor="middle" className="node" x="22%" y="40%" width="100px" height="100px">
                <div className={"spinner-border text-center "+this.tintToSpinnerColorClass(this.props.color)} role="status">
                    <span className="sr-only">Loading...</span>
                </div>              
            </foreignObject>
        );
    }
    renderText(x, y, fontSize, anchor, text) {
        return (
            <text
                fontSize={fontSize || 15}
                x={x+"%"}
                dominantBaseline="central"
                y={y+"%"} 
                textAnchor={anchor || "middle"}>
                {text}
            </text>
        );
    }

    renderCircle(circleRadius, stroke, circumference, path) {
        return (
            <circle
                style={
                    path ? {
                        "transform": "rotate(135deg)",
                        "transformOrigin": "center",
                        "opacity": this.props.failed ? "0.4" : "0.05"
                    } : (   
                        !this.props.animated ? {
                            "transform": "rotate(135deg)",
                            "transformOrigin": "center"
                        } : {
                            "transform": "rotate(135deg)",
                            "transformOrigin": "center",
                            "transition": this.getAnimation(this.props.animation),
                        }
                    )
                }
                className={path ? "stroke-dark" : this.tintToColorClass(this.props.color)}
                strokeWidth={this.getStrokeWidth(this.props.dimension)}
                strokeDasharray={`${stroke},${circumference}`}
                strokeLinecap="round"
                fill="none"
                cx="90"
                cy="90"
                r={circleRadius}
            />
        );
    }
}

CircularChart.propTypes = {
    loading: PropTypes.bool,
    failed: PropTypes.bool,
    className: PropTypes.string,
    minLabel: PropTypes.string,
    maxLabel: PropTypes.string,
    valueLabel: PropTypes.any,
    radius: PropTypes.oneOf([CC_RADIUS_SMALL,CC_RADIUS_LARGE,CC_RADIUS_DEFAULT]),
    animated: PropTypes.bool,
    animation: PropTypes.oneOf([CC_ANIM_FAST, CC_ANIM_SLOW]),
    color: PropTypes.oneOf([TINT_DANGER,TINT_NAVY,TINT_PRIMARY,TINT_SUCCESS,TINT_WARNING]),
    progress: PropTypes.any,
    dimension: PropTypes.oneOf([CC_DIM_SMALL,CC_DIM_LARGE,CC_DIM_DEFAULT])
};