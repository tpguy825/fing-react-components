/**
 * Created by marco on 3/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import {HC_SEGMENT_VIRTUAL, HC_STATE_SKIP} from "./DiagnosticLogic";
import ModalDialog, {ModalDialogBody, ModalDialogFooter} from "../../component/ModalDialog";
import SegmentedBar from "../../component/SegmentedBar";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../../component/ActionButton";
import StatusBadge from "../../component/StatusBadge";

export default class DiagnosticHelpDialog extends Component {

    render() {
        const {id, item, onClose, onConfirm} = this.props;
        if (!item) return '';

        const itemCode = item.code;
        const isVirtual = item.segment === HC_SEGMENT_VIRTUAL;
        let dialogTitle, checkTitle, failedDescr, segmentDescr, techDescr, easyDescr;

        if (isVirtual) {
            dialogTitle =  intl.get('healthcheck_report_checkinfo_modal_title');
            checkTitle = intl.get(`healthcheck_v_${itemCode}_I`);
            techDescr = intl.getHTML(`healthcheck_v_${itemCode}_tech`);
            easyDescr = intl.getHTML(`healthcheck_v_${itemCode}_easy`);
        } else {
            dialogTitle = intl.get('healthcheck_report_checkinfo_modal_checkcode_title', {code: itemCode});
            checkTitle = intl.get('healthcheck_generic_code', {code: itemCode}) +
                intl.get(`healthcheck_${itemCode}_G`);
            failedDescr = intl.get(`healthcheck_${itemCode}_B`);
            segmentDescr = intl.get(`healthcheck_${item.segment}`);
            techDescr = intl.getHTML(`healthcheck_${itemCode}_tech`);
            easyDescr = intl.getHTML(`healthcheck_${itemCode}_easy`);
        }

        const fixDescr = intl.getHTML(`healthcheck_${itemCode}_fix`);

        const barItems = [];
        if (techDescr) barItems.push({label: intl.get('healthcheck_help_dialog_tab_techdef'), icon: "fa-book-open"});
        if (easyDescr) barItems.push({label: intl.get('healthcheck_help_dialog_tab_means'), icon: "fa-lightbulb"});
        if (fixDescr) barItems.push({label: intl.get('healthcheck_help_dialog_tab_howfix'), icon: "fa-wrench"});

        const badge = (title, className) => <div className="ml-auto text-right small min-w-15rem">
            <span className={`display-1 badge badge-soft-${className}`}>
                <i className="fa fa-fw fa-arrow-left"/>{title}</span>
        </div>;

        // Trick to understand if it's not a premium user => premium check got skipped
        const showPromoPremium = item.premium && item.status === HC_STATE_SKIP;
        const promoView = <div className="mb-3"><StatusBadge className="badge-dark" label={intl.get("healthcheck_report_customtarget_modal_nopremium_title")} icon="fa-star" /></div>

        return <ModalDialog id={id} title={dialogTitle} size="modal-lg" onClose={onClose}>
            <ModalDialogBody>
                <div className="callout callout-primary mx-n4 p-4 mb-3">
                    {showPromoPremium && promoView}
                    <div className="pb-2 border-bottom mb-2">
                        <div className="d-flex align-items-center">
                            <h4 className="mb-0">{item.itemTitle}</h4>
                            {badge(intl.get('generic_result'), "primary")}
                        </div>
                        {segmentDescr &&
                        <div className="d-flex align-items-center">
                            <div className="text-dark">{segmentDescr}</div>
                            {segmentDescr && badge(intl.get('generic_source'), "secondary")}
                        </div>
                        }
                    </div>
                    <div className="d-flex align-items-center">
                        {item.itemSubtitle &&
                        <>
                            <div className="text-dark">{item.itemSubtitle}</div>
                            {failedDescr ?
                                badge(intl.get('healthcheck_help_dialog_successbadge'), "success") :
                                badge(intl.get('generic_description'), "secondary")}
                        </>
                        }
                    </div>
                    {failedDescr &&
                    <div className="d-flex align-items-center">
                        <div className="text-dark">{failedDescr}</div>
                        {failedDescr && badge(intl.get('healthcheck_help_dialog_failurebadge'), "danger")}
                    </div>
                    }
                </div>

                <SegmentedBar className="nav-classic nav-sm" items={barItems}>
                    {techDescr && <p>{techDescr}</p>}
                    {easyDescr && <p>{easyDescr}</p>}
                    {fixDescr && <p>{fixDescr}</p>}
                </SegmentedBar>

            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={onClose} title={intl.get('generic_close')} type={BTN_TYPE_GHOST}
                              tint={BTN_TINT_DARK}/>
                {showPromoPremium ?
                    <ActionButton action={onConfirm} title={intl.get('generic_upgrade')} tint={BTN_TINT_DARK} /> :
                    <ActionButton action={onConfirm} title={intl.get('healthcheck_help_dialog_action')} chevron={"fa-share"}/>
                }
            </ModalDialogFooter>
        </ModalDialog>;
    }

}