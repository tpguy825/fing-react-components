/**
 * Created by marco on 5/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, {ModalDialogBody, ModalDialogFooter} from "../../component/ModalDialog";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../../component/ActionButton";
import PresenceAutoFillTable from "./PresenceAutoFillTable";
import ModalDialogInfoNote from "../../component/ModalDialogInfoNote";
import PresenceAvatarStrip from "./PresenceAvatarStrip";

export default class PresenceAutoFillDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {contacts: this.props.detectedContacts.slice(0)}
    }

    componentDidMount() {
        window.initTooltips();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detectedContacts.length !== this.props.detectedContacts.length ||
                prevProps.detectedContacts.map(c=> c.contactId).join(",") !== this.props.detectedContacts.map(c=> c.contactId).join(",")) {
            this.setState({contacts: this.props.detectedContacts.slice(0)},
                () => {window.initTooltips()});
        }
    }

    render() {
        const {id, emptyStateImage, onClose, onConfirm} = this.props;
        const {contacts} = this.state;

        const onTableUpdate = (newContacts) => { this.setState( {contacts: newContacts})};
        const onSave = () => {
            if (onConfirm)
                onConfirm(contacts);
        };

        const title = intl.get('presence_autofill_dialog_title');
        const hasContacts = contacts && contacts.length > 0;

        return <ModalDialog id={id} title={title} size="modal-lg" onClose={onClose}>
            <ModalDialogBody>
                <PresenceAutoFillTable detectedContacts={contacts}
                                       emptyStateImage={emptyStateImage}
                                       onUpdate={onTableUpdate} />
                {hasContacts &&
                    <ModalDialogInfoNote icon={"fa-info-circle"} text={intl.get('presence_autofill_dialog_notfound_message')} />
                }
            </ModalDialogBody>
            <ModalDialogFooter>
                {this.renderExistingAvatars()}
                <ActionButton action={onClose} title={intl.get('generic_close')} type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK}/>
                {hasContacts && <ActionButton action={onSave} title={intl.get('generic_save')}/>}
            </ModalDialogFooter>
        </ModalDialog>
    }

    renderExistingAvatars() {
        const {existingContacts} = this.props;
        return <PresenceAvatarStrip className="mr-auto"
                                    title={intl.get("presence_autofill_already_in_net")}
                                    contacts={existingContacts} />
    }

}