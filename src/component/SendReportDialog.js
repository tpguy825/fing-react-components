/**
 * Created by marco on 5/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types';
import ModalDialog, { ModalDialogBody, ModalDialogFooter } from './ModalDialog';
import ActionButton, { BTN_TINT_DARK, BTN_TYPE_GHOST } from './ActionButton';

export default class SendReportDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.emailInputRef = React.createRef();
    }

    render() {
        const {id, completed, onClose, title} = this.props;

        return (
            <ModalDialog id={id} title={title} onClose={onClose}>
                {completed ? this.renderCompleted() : this.renderEmailForm()}
            </ModalDialog>
        );
    }

    renderCompleted() {
        const {emptyState, onClose} = this.props;
        return <>
            <ModalDialogBody>{emptyState}</ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={onClose} title={intl.get('generic_close')}/>
            </ModalDialogFooter>
        </>;
    }

    renderEmailForm() {
        const {email, canChangeEmail, onClose, onConfirm, bodyText} = this.props;
        const onSend = () => {
            const email = this.emailInputRef.current.value;
            if (onConfirm)
                onConfirm(email);
        }
        return <>
            <ModalDialogBody>
                <p>{bodyText}</p>
                <form>
                    <div className="form-group">
                        <label htmlFor="emailInput">{intl.get("generic_email")}</label>
                        <input id="emailInput"
                            ref={this.emailInputRef}
                            type="text"
                            className="form-control form-control-sm"
                            aria-describedby="emailInput"
                            placeholder={intl.get("placeholder_email")}
                            defaultValue={email}
                            disabled={!canChangeEmail}
                        />
                    </div>
                </form>
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton   action={onClose} 
                                title={intl.get('generic_close')} 
                                type={BTN_TYPE_GHOST}
                                tint={BTN_TINT_DARK}/>
                <ActionButton action={onSend} title={intl.get('generic_send')}/>
            </ModalDialogFooter>
        </>;
    }
}

SendReportDialog.propTypes = {
    email: PropTypes.string, 
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
    emptyState: PropTypes.node,
    canChangeEmail: PropTypes.bool, 
    onClose: PropTypes.func, 
    onConfirm: PropTypes.func, 
    bodyText: PropTypes.string
};