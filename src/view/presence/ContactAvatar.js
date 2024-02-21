/**
 * Created by marco on 3/22/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import { TINT_DANGER, TINT_SECONDARY, TINT_SUCCESS, TINT_WARNING } from '../../model/Constants';
import Contact from "../../model/Contact";

export const AVT_SIZE_MINI = "SIZE_MINI";
export const AVT_SIZE_SMALL = "SIZE_SMALL";
export const AVT_SIZE_DEFAULT = "SIZE_DEFAULT";
export const AVT_SIZE_BIG = "SIZE_BIG";
export const AVT_SIZE_JUMBO = "SIZE_JUMBO";

const UI_MIN_RGB = 0.05;
const UI_MAX_RGB = 0.95;

export default class ContactAvatar extends Component {

    sizeToClass(size) {
        if (!size) return "avatar-lg";
        switch (size) {
            case AVT_SIZE_MINI: return "avatar-xs";
            case AVT_SIZE_SMALL: return "";
            case AVT_SIZE_DEFAULT: return "avatar-lg";
            case AVT_SIZE_BIG: return "avatar-xl";
            case AVT_SIZE_JUMBO: return "avatar-xxl";
            default: return "avatar-lg";
        }
    }

    statusSizeToClass(size) {
        if (!size) return "avatar-sm-status";
        switch (size) {
            case AVT_SIZE_MINI:
            case AVT_SIZE_SMALL:
            case AVT_SIZE_DEFAULT: return "avatar-sm-status";
            case AVT_SIZE_BIG: return "";
            case AVT_SIZE_JUMBO: return "avatar-lg-status";
            default: return "avatar-sm-status";
        }
    }

    statusColor(contact){
        if(contact){
            const online = contact.online;
            const netNodes = [];

            if(contact.presenceDevices && contact.presenceDevices.length > 0){
                netNodes.push(...contact.presenceDevices);
            }
            /*if(contact.otherDevices && contact.otherDevices.length > 0){
                netNodes.push(...contact.otherDevices);
            }*/

            const isScheduledInternetDowntimeActive = contact.isScheduledInternetDowntimeActive && contact.isScheduledInternetDowntimeActive();
            const filteredNetNodes = netNodes.filter(n => n.isBlocked() || n.isPaused());
            
            if(isScheduledInternetDowntimeActive || filteredNetNodes.length > 0){
                return "avatar-danger";
            } else if(online){
                return "avatar-success";
            }
        }
        return "avatar-secondary";
    }

    getAvatarInitials(name, initials){
        if(name){
            return name.split(" ").map(part => part.charAt(0)).join('');
        } else if(initials){
            return initials;
        }
        return null;
    }

    getBackgroundColor(name){
        if (name){
            return this.colorFromPattern(name);
        }
        return "lightgray";
    }

    render() {
        let { name, url, initials, size, tooltip, className, contact, status, statusVisible} = this.props;

        const sizeClass = this.sizeToClass(size);
        const statusSizeClass = this.statusSizeToClass(size);
        const outerClass = className || '';
        const displayStatus = statusVisible || true;
        url = contact ? contact.imageURL : url;
        name = contact ? contact.contactName : name;
        tooltip = contact ? contact.contactName : name;

        let avatarInitials = this.getAvatarInitials(name, initials);
        if(url){
            avatarInitials = null;
        }
        const backgroundColor = this.getBackgroundColor(name);
        const statusColor = status || this.statusColor(contact);

        return <span className={`avatar avatar-circle ${sizeClass} ${outerClass}`} style={{backgroundColor: backgroundColor}}
                     data-toggle="tooltip" data-placement="top" title={tooltip}>
                {url && <img className="avatar-img" src={url} alt={name || ""}/>}
                {avatarInitials && <span className="avatar-initials text-white">{avatarInitials}</span>}
                {displayStatus && contact && <span className={`avatar-status ${statusSizeClass} ${statusColor}`}/>}
            </span>
    }

    hashCode(string) {
        let hash = 0, i, chr;
        if (string.length === 0) return hash;
        for (i = 0; i < string.length; i++) {
            chr   = string.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    colorFromPattern(pattern) {
        const hash = this.hashCode(pattern);
        const r = Math.floor(Math.max(Math.min((((hash & 0xFF0000) >> 16) / 255.0), UI_MAX_RGB), UI_MIN_RGB) * 255.0);
        const g = Math.floor(Math.max(Math.min((((hash & 0x00FF00) >> 8) / 255.0), UI_MAX_RGB), UI_MIN_RGB) * 255.0);
        const b = Math.floor(Math.max(Math.min((hash & 0x0000FF) / 255.0, UI_MAX_RGB), UI_MIN_RGB) * 255.0);

        return `rgb(${r},${g},${b})`;
    }

}

ContactAvatar.propTypes = {
    name: PropTypes.string,
    initials: PropTypes.string,
    tint: PropTypes.oneOf([TINT_DANGER, TINT_WARNING, TINT_SECONDARY, TINT_SUCCESS]),
    size: PropTypes.oneOf([AVT_SIZE_MINI, AVT_SIZE_SMALL, AVT_SIZE_DEFAULT, AVT_SIZE_BIG, AVT_SIZE_JUMBO]),
    className: PropTypes.string,
    tooltip: PropTypes.string,
    contact: PropTypes.instanceOf(Contact)
};