/**
 * Created by marco on 3/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';

import ModalDialog, {ModalDialogBody, ModalDialogFooter} from "../../component/ModalDialog";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../../component/ActionButton";
import ModalDialogInfoNote from "../../component/ModalDialogInfoNote";

export default class DiagnosticShareDialog extends Component {

    render() {
        const { id, dialogImage, dialogImageCaption, onClose, onConfirm } = this.props;
        const title = intl.get('healthcheck_report_askhelp_title');

        return <ModalDialog id={id} title={title} onClose={onClose}>
            <ModalDialogBody>
                <div className="row">
                    <div className="col-7">
                        <p className="py-4">{intl.get('healthcheck_report_askhelp_description')}</p>
                    </div>
                    <div className="col-5">
                        <img className="mx-auto" src={dialogImage}
                             alt={dialogImageCaption || intl.get('empty_state_title_fallback')} />
                    </div>
                </div>
                <ModalDialogInfoNote icon={"fa-info-circle"} text={intl.get('healthcheck_report_askhelp_privacy')} />
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={onClose} title={intl.get('generic_close')} type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} />
                <ActionButton action={() => onConfirm()} title={intl.get('healthcheck_report_askhelp_modal_share_action')} chevron={"fa-share"} />
            </ModalDialogFooter>
        </ModalDialog>;
    }

}