/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as ShieldSuccess} from "../../assets/svg/status/shield_check_24.svg";
import {ReactComponent as ShieldWarning} from "../../assets/svg/status/shield_warn_24.svg";
import {ReactComponent as ShieldError} from "../../assets/svg/status/shield_error_24.svg";
import {ReactComponent as ShieldSync} from "../../assets/svg/status/shield_sync_24.svg";
import {ReactComponent as CircleSuccess} from "../../assets/svg/status/circle_check_24.svg";
import {ReactComponent as CircleWarning} from "../../assets/svg/status/circle_warn_24.svg";
import {ReactComponent as CircleError} from "../../assets/svg/status/circle_error_24.svg";
import {ReactComponent as CircleSync} from "../../assets/svg/status/circle_sync_24.svg";
import {ReactComponent as SvgInfoIcon} from "../../assets/svg/status/info_black_24.svg";
import {ReactComponent as SvgPlusIcon} from "../../assets/svg/status/add_shield_black_24.svg";

export const SI_SHAPE_CIRCLE = "circle";
export const SI_SHAPE_SHIELD = "shield";
export const SI_SHAPE_INFO = "info";
export const SI_SHAPE_PLUS = "plus";

export const SI_STATUS_SUCCESS = "success";
export const SI_STATUS_WARNING = "warning";
export const SI_STATUS_ERROR = "error";
export const SI_STATUS_SYNC = "sync";
export const SI_STATUS_DANGER = "danger";

const defaultIconSize = "24px";

export default class StatusIcon extends Component {

    render() {
        const { shape, status, size, pulse } = this.props;

        if (shape !== SI_SHAPE_CIRCLE &&
            shape !== SI_SHAPE_SHIELD &&
            shape !== SI_SHAPE_INFO &&
            shape !== SI_SHAPE_PLUS)
            return "";

        if (status !== SI_STATUS_SUCCESS &&
            status !== SI_STATUS_WARNING &&
            status !== SI_STATUS_DANGER &&
            status !== SI_STATUS_ERROR &&
            status !== SI_STATUS_SYNC)
            return "";

        const className = this.props.className || '';
        const iconSize = size || defaultIconSize;

        if (shape === SI_SHAPE_CIRCLE) {
            return <figure className={`svg-icon ${className}`}>{this.renderCircle(status, iconSize, pulse)}</figure>;
        } else if (shape === SI_SHAPE_SHIELD) {
            return <figure className={`svg-icon ${className}`}>{this.renderShield(status, iconSize, pulse)}</figure>;
        } else if (shape === SI_SHAPE_INFO) {
            return <figure className={`svg-icon ${className}`}>{this.renderInfo(status, iconSize, pulse)}</figure>;
        } else if (shape === SI_SHAPE_PLUS) {
            return <figure className={`svg-icon ${className}`}>{this.renderPlus(status, iconSize, pulse)}</figure>;
        } else {
            return "";
        }
    }

    renderCircle(status, iconSize, pulse) {
        if (!status) return "";

        switch (status) {
            case SI_STATUS_SUCCESS:
                return <CircleSuccess className={`fill-success ${pulse ? "btn-pulse-success bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_WARNING:
                return <CircleWarning className={`fill-warning ${pulse ? "btn-pulse-warning bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_ERROR:
            case SI_STATUS_DANGER:
                return <CircleError className={`fill-danger ${pulse ? "btn-pulse-danger bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_SYNC:
                return <CircleSync className={`fill-primary ${pulse ? "btn-pulse-primary bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            default:
                return "";
        }
    }

    renderShield(status, iconSize, pulse) {
        if (!status) return "";

        switch (status) {
            case SI_STATUS_SUCCESS:
                return <ShieldSuccess className={`fill-success ${pulse ? "btn-pulse-success bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_WARNING:
                return <ShieldWarning className={`fill-warning ${pulse ? "btn-pulse-warning bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_ERROR:
            case SI_STATUS_DANGER:
                return <ShieldError className={`fill-danger ${pulse ? "btn-pulse-danger bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_SYNC:
                return <ShieldSync className={`fill-primary ${pulse ? "btn-pulse-primary bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            default:
                return "";
        }
    }

    renderInfo(status, iconSize, pulse) {
        if (!status) return "";

        switch (status) {
            case SI_STATUS_SUCCESS:
                return <SvgInfoIcon className={`fill-success ${pulse ? "btn-pulse-success bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_WARNING:
                return <SvgInfoIcon className={`fill-warning ${pulse ? "btn-pulse-warning bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_ERROR:
            case SI_STATUS_DANGER:
                return <SvgInfoIcon className={`fill-danger ${pulse ? "btn-pulse-danger bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_SYNC:
                return <SvgInfoIcon className={`fill-primary ${pulse ? "btn-pulse-primary bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            default:
                return "";
        }
    }

    renderPlus(status, iconSize, pulse) {
        if (!status) return "";

        switch (status) {
            case SI_STATUS_SUCCESS:
                return <SvgPlusIcon className={`fill-success ${pulse ? "btn-pulse-success bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_WARNING:
                return <SvgPlusIcon className={`fill-warning ${pulse ? "btn-pulse-warning bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_ERROR:
            case SI_STATUS_DANGER:
                return <SvgPlusIcon className={`fill-danger ${pulse ? "btn-pulse-danger bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            case SI_STATUS_SYNC:
                return <SvgPlusIcon className={`fill-primary ${pulse ? "btn-pulse-primary bg-transparent" : ""}`} width={iconSize} height={iconSize} />;
            default:
                return "";
        }
    }
}

StatusIcon.propTypes = {
    shape: PropTypes.oneOf([SI_SHAPE_CIRCLE, SI_SHAPE_SHIELD, SI_SHAPE_INFO, SI_SHAPE_PLUS]),
    status: PropTypes.oneOf([SI_STATUS_SUCCESS, SI_STATUS_DANGER, SI_STATUS_WARNING, SI_STATUS_ERROR, SI_STATUS_SYNC]),
    size: PropTypes.string,
    pulse: PropTypes.bool
};