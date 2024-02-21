/**
 * Created by marco on 11/06/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ContactAvatar, {AVT_SIZE_MINI} from "./ContactAvatar";

export default class PresenceAvatarStrip extends Component {

    render() {
        const {className, title, contacts} = this.props;
        return (
            <div className={className || ""}>
                {this.renderExistingAvatars(title, contacts)}
            </div>
        )
    }

    renderExistingAvatars(title, contacts) {
        if (!contacts || contacts.length === 0) return "";

        const moreUserCount = contacts.length - 3;
        const moreUserLabel = intl.get("presence_autofill_dialog_more_users", {amount: moreUserCount});
        return <div className="avatar-group mb-1 align-items-center">
            {title && <span className="mr-2 small">{<title></title>}</span>}
            {contacts.slice(0, 3).map(contact => <ContactAvatar
                key={`contact_thumbnail_${contact.contactId}`}
                size={AVT_SIZE_MINI}
                contact={contact}
            />)}
            {contacts.length > 3 &&
            <ContactAvatar
                key={`contact_thumbnail_more`}
                size={AVT_SIZE_MINI}
                name={moreUserLabel}
                tooltip={moreUserLabel}
                initials={`+${moreUserCount}`}
            />
            }
        </div>;
    }

}