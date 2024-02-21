/**
 * Created by marco on 5/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, {ModalDialogBody, ModalDialogFooter} from "../../component/ModalDialog";
import ActionButton, {BTN_TINT_DANGER, BTN_TINT_DARK, BTN_TYPE_GHOST} from "../../component/ActionButton";

export default class PresenceConfirmDeleteDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onConfirmDialog = this.onConfirmDialog.bind(this);
    }

    onCloseDialog() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    onConfirmDialog() {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.props.contact);
        }
    }

    // --------------------------------------------------------------------------------

    render() {
        const {id, contact} = this.props;

        const title = intl.get("presence_delete_dialog_title");
        return <ModalDialog id={id} title={title} onClose={this.props.onCloseDialog}>
            <ModalDialogBody>
                {intl.getHTML("presence_delete_dialog_body", {contactName: contact ? contact.contactName: ""})}
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={this.onCloseDialog} title={intl.get('generic_close')} type={BTN_TYPE_GHOST}
                              tint={BTN_TINT_DARK}/>
                <ActionButton action={this.onConfirmDialog} title={intl.get('generic_delete')} tint={BTN_TINT_DANGER}/>
            </ModalDialogFooter>
        </ModalDialog>;
    }

}