/**
 * Created by Steph on 5/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, {ModalDialogBody, ModalDialogFooter} from "../../component/ModalDialog";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../../component/ActionButton";

export default class DiagnosticEditDialog extends Component {

    render() {
        const { id, itemCode, reachCustomTargets, onClose, onConfirm } = this.props;
        if (!itemCode) return '';

        let dialogTitle, checkTitle, failedDescr;

        dialogTitle = intl.get("healthcheck_report_checkinfo_modal_checkcode_title", { code: itemCode });
        checkTitle = intl.get("healthcheck_generic_code", { code: itemCode }) + intl.get(`healthcheck_${itemCode}_G`);
        failedDescr = intl.get(`healthcheck_${itemCode}_B`);

        const targets = reachCustomTargets ? reachCustomTargets.targets.join("\n") : "";

        return <ModalDialog id={id} title={dialogTitle} size="modal-lg" onClose={onClose}>
            <ModalDialogBody>
                <form>
                    <div className="form-group">
                        <label className="input-label" htmlFor="checkCustomTargetsInput">{intl.get('healthcheck_report_customtarget_modal_area_label')}</label>
                        <textarea id="checkCustomTargetsInput"
                            ref={(input) => this.checkCustomTargetsInput = input}
                            rows="3"
                            className="form-control form-control-sm"
                            aria-describedby="netNotesHelp"
                            placeholder={intl.get('healtcheck_edit_dialog_placeholder')}
                            defaultValue={targets}
                        />
                        <small id="netNotesHelp"
                            className="form-text text-muted">{intl.get('healthcheck_report_customtarget_modal_area_small')}
                        </small>
                    </div>
                </form>
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={onClose} title={intl.get('generic_close')} type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} />
                <ActionButton action={() => onConfirm(this.checkCustomTargetsInput.value)} title={intl.get('generic_save')} />
            </ModalDialogFooter>
        </ModalDialog>;
    }

}