/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * A horizontal control that consists of multiple segments, each segment functioning as a discrete button.
 * The outcome of selecting an item in the SegmentedBar is to switch another view being presented.
 */
export default class SegmentedBar extends Component {

    constructor(props, context) {
        super(props, context);
        const activeIndex = this.props.activeIndex || 0;
        this.state = { activeIndex: activeIndex }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeIndex !== null && prevProps.activeIndex !== this.props.activeIndex)
            this.setState({activeIndex: this.props.activeIndex || 0});
    }

    render() {
        const {items, className, accessory} = this.props;
        const {activeIndex} = this.state;

        if (!items || items.length === 0)
            return '';

        const accessoryUI = this.renderAccessory(accessory);
        const calculatedClass = className || "nav-segment nav-pills justify-content-center";
        const separatorClass = this.props.children && this.props.children.length >= items.length ? "mb-3" : ""
        return (
            <>
                <ul className={`nav ${calculatedClass} ${separatorClass}`}>
                    {items.map((item, idx) => this.renderItem(item, idx))}
                    {accessoryUI}
                </ul>
                <div>
                    {this.props.children && this.props.children.length >= items.length ?
                        this.props.children[activeIndex] : ""
                    }
                </div>
            </>
        );
    }

    renderItem(item, idx) {
        if (!item) return '';

        const active = idx === this.state.activeIndex;
        const disabled = item.disabled && item.disabled === true;

        const iconUI = this.renderIcon(item, idx);
        const labelUI = this.renderLabel(item, idx);
        const badgeUI = this.renderBadge(item, idx);

        const onClick = (e) => {
            e.preventDefault();
            if (disabled) return;
            this.setState({activeIndex: idx});
            if (this.props.onItemSelected) {
                this.props.onItemSelected(idx);
            }
        };

        return (
            <li className="nav-item" key={"segmented_bar_"+idx}>
                <a className={"nav-link py-1" + (active ? ' active' : '') + (disabled ? ' disabled' : '')}
                   onClick={onClick} href="/#">{iconUI}{labelUI}{badgeUI}</a>
            </li>
        );
    }

    renderIcon(item, idx) {
        return item.icon ? <i className={`fas ${item.icon} nav-icon`}/> : '';
    }

    renderLabel(item, idx) {
        return item.label || '';
    }

    renderBadge(item, idx) {
        const badgeClass = item.badgeClass || "badge-pill badge-soft-primary";
        return item.badge !== null ? <span className={`badge ${badgeClass} ml-2 align-text-bottom`}>{item.badge}</span> : '';
    }

    renderAccessory(accessory) {
        if (accessory) {
            return <li className="ml-auto align-self-end py-1">{accessory}</li>
        } else {
            return '';
        }
    }

}

SegmentedBar.propTypes = {
    activeIndex: PropTypes.number,
    items: PropTypes.array,
    className: PropTypes.string,
    accessory: PropTypes.node,
    onItemSelected: PropTypes.func,
    children: PropTypes.array
};