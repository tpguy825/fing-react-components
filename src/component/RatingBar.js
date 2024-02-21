import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RatingTypeIcon, {
    RTI_EMPTY,
    RTI_FULL,
    RTI_HALF,
    RTI_DOT,
    RTI_HEART,
    RTI_BOLT,
    RTI_STAR
} from './icons/RatingTypeIcon';
import {
    TINT_WARNING,
    TINT_SUCCESS,
    TINT_PRIMARY,
    TINT_NAVY,
    TINT_DANGER,
    TINT_SECONDARY
} from '../model/Constants';

export const RB_SMALL = "small";
export const RB_LARGE = "large";
export const RB_TINY = "tiny";
export const RB_DEFAULT = "default";

export default class RatingBar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentValue: props.value
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value !== prevProps.value) {
            this.setState({
                currentValue: this.props.value
            });
        }
    }

    render() {
        const {length, size, type, tint} = this.props; // editable, onRatingChanged, value
        let icons = [];
        const valueBar = Math.min(length, Math.max(0, this.state.currentValue));
        const iconSize = this.getSize(size);
        const isDecimal = valueBar % 1 !== 0;

        if (isDecimal) {
            const rate = Math.floor(valueBar);

            for (let i = 0; i < rate; i++) {
                icons.push(
                    <RatingTypeIcon onClick={() => { this.onClickIcon(valueBar)}}
                                    onMouseEnter={() => { this.changeValue(i + 1)}}
                                    size={iconSize}
                                    className="mr-1 d-flex"
                                    key={i + 1}
                                    tint={tint}
                                    type={type}
                                    variant={RTI_FULL}/>
                );
            }
            icons.push(
                <RatingTypeIcon onClick={() => {this.onClickIcon(valueBar)}}
                                onMouseEnter={() => { this.changeValue(rate) }}
                                size={iconSize}
                                className="mr-1 d-flex"
                                key={valueBar}
                                tint={tint}
                                type={type}
                                variant={RTI_HALF}/>
            );
            for (let i = 0; i < length - rate - 1; i++) {
                icons.push(
                    <RatingTypeIcon onClick={() => { this.onClickIcon(valueBar)}}
                                    onMouseEnter={() => { this.changeValue(rate + i + 2)}}
                                    size={iconSize}
                                    className="mr-1 d-flex"
                                    key={rate + i + 2}
                                    tint={tint}
                                    type={type}
                                    variant={RTI_EMPTY}/>
                );
            }
        } else {
            for (let i = 0; i < length; i++) {
                valueBar > i ?
                    icons.push(
                        <RatingTypeIcon onClick={() => {this.onClickIcon(valueBar)}}
                                        onMouseEnter={() => {
                                            this.changeValue(i + 1)
                                        }}
                                        size={iconSize}
                                        className="mr-1 d-flex"
                                        key={i + 1}
                                        tint={tint}
                                        type={type}
                                        variant={RTI_FULL}/>
                    ) :
                    icons.push(
                        <RatingTypeIcon onClick={() => {this.onClickIcon(valueBar)}}
                                        onMouseEnter={() => {
                                            this.changeValue(i + 1)
                                        }}
                                        key={i + 2}
                                        className="mr-1 d-flex"
                                        tint={tint}
                                        size={iconSize}
                                        type={type}
                                        variant={RTI_EMPTY}/>
                    );
            }
        }


        return (
            <div className="d-flex align-items-center"
                 onMouseLeave={() => {
                     this.resetValue()
                 }}>
                {icons}
            </div>
        )
    }

    onClickIcon(valueBar) {
        if (this.props.editable && this.props.onRatingChanged) {
            this.props.onRatingChanged(valueBar)
        }
    }

    resetValue() {
        if (this.props.editable) {
            this.setState({currentValue: this.props.value})
        }
    }

    changeValue(value) {
        if (this.props.editable) {
            this.setState({currentValue: value})
        }
    }


    getSize(size) {
        switch (size) {
            case RB_DEFAULT:
                return 24;
            case RB_SMALL:
                return 16;
            case RB_TINY:
                return 12;
            case RB_LARGE:
                return 32;
            default:
                return 24;
        }
    }
}


RatingBar.propTypes = {
    onRatingChanged: PropTypes.func,
    editable: PropTypes.bool,
    length: PropTypes.number,
    value: PropTypes.any,
    tint: PropTypes.oneOf([TINT_DANGER, TINT_SECONDARY, TINT_NAVY, TINT_PRIMARY, TINT_SUCCESS, TINT_WARNING]),
    type: PropTypes.oneOf([RTI_HEART, RTI_BOLT, RTI_STAR, RTI_DOT]),
    size: PropTypes.oneOf([RB_SMALL, RB_DEFAULT, RB_LARGE, RB_TINY])
};