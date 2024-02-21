import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const SC_DIM_SMALL = "DIM_SMALL";
export const SC_DIM_DEFAULT = "DIM_DEFAULT";
export const SC_DIM_LARGE = "DIM_LARGE";

export const DEFAULT_COLOR = '#abadb3';



export default class SegmentedChart extends Component {

    getHeight(dim){
        if (!dim) return 30;
        switch (dim) {
            case SC_DIM_DEFAULT: return 24;
            case SC_DIM_LARGE: return 32;
            case SC_DIM_SMALL: return 16;
            default: return 24;
        }
    }


    render() {
        const { leftText, rightText, dimension, length, className, value, coloringFn} = this.props; 
        const barHeight = this.getHeight(dimension);
        const countSegments = length - 1  || 4; 
        const cName = className || 'w-100';
        let segments = [];
        for(let i = 0; i <= countSegments; i++){
            const color = coloringFn(i);
            const segmentColored = i <= value - 1 ? color : DEFAULT_COLOR;
            const style = this.renderStyleSegment(segmentColored)
            const single = <div className="h-100 flex-grow-1 flex-shrink-1" style={style}></div>
            segments.push(single)
        }
        
            
        return (
            <div className={cName}>
                <div style={{height:barHeight}} className="d-flex align-items-center justify-content-center">
                    {React.Children.toArray(segments)}
                </div>
                {(leftText || rightText) &&
                    <div className="d-flex align-items-center justify-content-between my-2">
                        {leftText && <div className="mx-1">{leftText}</div>}
                        {rightText && <div className="mx-1">{rightText}</div>}
                    </div>
                }
            </div>
        );
    }

    renderStyleSegment(color){
        return {
            backgroundColor: color,
            borderRadius: '4px',
            marginRight: '2px'
        }
    }
}

SegmentedChart.propTypes = {
    coloringFn: PropTypes.func,
    value: PropTypes.number, 
    className: PropTypes.string,
    leftText: PropTypes.string, 
    rightText: PropTypes.string, 
    length: PropTypes.number,
    dimension: PropTypes.oneOf([SC_DIM_SMALL,SC_DIM_LARGE,SC_DIM_DEFAULT])
};