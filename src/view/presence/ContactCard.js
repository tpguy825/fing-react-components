/**
 * Created by marco on 3/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import { getStatusContact, isTracking } from '../../helpers/ContactTypeHelper';
import { TINT_SECONDARY, TINT_SUCCESS } from '../../model/Constants';
import ContactAvatar, { AVT_SIZE_SMALL } from "./ContactAvatar";
export default class ContactCard extends Component {

    render() {
        if (!this.props.contact) return "";
        return this.renderContactCard()
    }

    renderContactCard() {
        const {contact, width, genericStatus, activeClass} = this.props;

        const status = getStatusContact(contact, genericStatus);
        return (
            <div key={`contact_card_${contact.id}`}
                 className={"card card-frame-s mb-2 mr-2 border " + activeClass}
                 style={{width: width || "8rem", height: "100%"}}>
                <div className="card-body p-2 py-3 text-center">
                    <ContactAvatar className="mb-2" size={AVT_SIZE_SMALL} contact={contact}/>
                    <h5 className="text-lh-sm mb-0 text-nowrap overflow-hidden">{contact.contactName}</h5>
                    {status && <small>{status}</small>}
                </div>
            </div>
        );
    }

}