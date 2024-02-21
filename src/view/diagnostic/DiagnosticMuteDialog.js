/**
 * Created by Steph on 5/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, {ModalDialogBody, ModalDialogFooter} from "../../component/ModalDialog";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../../component/ActionButton";

export default class DiagnosticMuteDialog extends Component {

    render() {
        const { id, item, onClose, onConfirm } = this.props;
        if (!item) return '';

        const itemCode = item.code;
        const isMuted = item.muted;

        const checkTitle =
            intl.get('healthcheck_generic_code', { code: itemCode }) +
            intl.get("healthcheck_" + itemCode + "_B");
        const dialogTitle = isMuted ?
            intl.get('healthcheck_report_mute_dialog_unmutecheck') :
            intl.get('healthcheck_report_mute_dialog_mutecheck');
        const dialogText = isMuted ?
            intl.get('healthcheck_report_mute_dialog_unmutecheck_description') :
            intl.get('healthcheck_report_mute_dialog_mutecheck_description');

        const newItem = Object.assign({}, item);
        newItem.muted = !item.muted;

        return <ModalDialog id={id} title={`${dialogTitle} - ${checkTitle}`} onClose={onClose}>
            <ModalDialogBody>
                <div>
                    <div className='px-3'>
                        <h3 className="h6 text-secondary">{dialogText}</h3>
                    </div>
                </div>
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={onClose} title={intl.get('generic_close')}
                              type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} />
                {!isMuted &&
                    <ActionButton action={() => onConfirm(newItem)} icon={"fa-bell-slash"}
                                  title={intl.get('healthcheck_report_mute_action')} />
                }
                {isMuted &&
                    <ActionButton action={() => onConfirm(newItem)} icon={"fa-bell"}
                                  title={intl.get('healthcheck_report_unmute_action')}  />
                }
            </ModalDialogFooter>
        </ModalDialog>;
    }

}