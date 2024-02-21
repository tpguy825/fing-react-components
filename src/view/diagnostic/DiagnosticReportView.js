/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import ActionButton, {BTN_TINT_DARK, BTN_TINT_PRIMARY, BTN_TYPE_SOFT} from "../../component/ActionButton";
import SegmentedBar from "../../component/SegmentedBar";
import {
    HC_IMAGE_TYPE_CDN,
    HC_IMAGE_TYPE_CONTEXT_ICON,
    HC_IMAGE_TYPE_DEVICE_ICON,
    HC_IMAGE_TYPE_FONTAWESOME,
    HC_IMAGE_TYPE_NETWORK_ICON,
    HC_STATE_FAIL,
    HC_STATE_INFO,
    HC_STATE_OK,
    HC_STATE_SKIP,
    HC_STATE_WARN,
    HC_STATES_GOOD
} from "./DiagnosticLogic";
import StatusBadge from "../../component/StatusBadge";
import NetworkTypeIcon from "../../component/icons/NetworkTypeIcon";
import NetworkContextIcon from "../../component/icons/NetworkContextIcon";
import DeviceTypeIcon from "../../component/icons/DeviceTypeIcon";
import intl from 'react-intl-universal';
import NetworkContextPicker from "../../component/NetworkContextPicker";
import EmptyState from "../../component/EmptyState";

const GROUP_ALL = "ALL";
const GROUP_PREMIUM = "PREMIUM";

/**
 * A view showing the report of health check analysis.
 */
export default class DiagnosticReportView extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedCategoryIndex: -1
        };
    }

    render() {
        const { items, grouped } = this.props;

        const itemsByCategory = items.reduce((acc, item) => {
            acc[item.status] = acc[item.status] + 1 || 1;
            acc[GROUP_ALL] = acc[GROUP_ALL] + 1;
            acc[GROUP_PREMIUM] = acc[GROUP_PREMIUM] + (item.premium ? 1 : 0);
            return acc;
        }, { ALL: 0, PREMIUM: 0 });

        let tabIndex;
        if (this.state.selectedCategoryIndex >= 0) {
            tabIndex = this.state.selectedCategoryIndex;
        } else if (itemsByCategory[HC_STATE_FAIL] > 0) {
            tabIndex = 3;
        } else if (itemsByCategory[HC_STATE_WARN] > 0) {
            tabIndex = 2;
        } else {
            tabIndex = 0;
        }

        return (
            <>
                {grouped &&
                    <div className="text-center mt-2 mb-4">
                        {this.renderSegmentedBar(items, itemsByCategory, tabIndex)}
                    </div>
                }
                <div>
                    {items && items.length > 0 && this.renderTable(items, itemsByCategory, tabIndex)}
                </div>
            </>
        );
    }

    renderSegmentedBar(items, itemsByCategory, tabIndex) {
        const onItemSelected = (idx) => this.setState({ selectedCategoryIndex: idx });

        return (
            <SegmentedBar items={[
                { 
                    label: intl.get("healthcheck_report_radio_button_all"),
                    badge: itemsByCategory[GROUP_ALL] || 0,
                    badgeClass: "badge-pill badge-soft-primary text-dark"
                }, { 
                    label: intl.get("healthcheck_report_radio_button_info"),
                    badge: itemsByCategory[HC_STATE_INFO] || 0,
                    badgeClass: "badge-pill badge-soft-primary text-dark"
                }, { 
                    label: intl.get("healthcheck_report_radio_button_warn"), 
                    badge: itemsByCategory[HC_STATE_WARN] || 0,
                    badgeClass: "badge-pill badge-soft-primary text-dark"
                }, {
                    label: intl.get("healthcheck_report_radio_button_fail"),
                    badge: itemsByCategory[HC_STATE_FAIL] || 0,
                    badgeClass: "badge-pill badge-soft-danger"
                }, { 
                    label: intl.get("healthcheck_report_radio_button_premium"), 
                    badge: itemsByCategory[GROUP_PREMIUM] || 0,
                    badgeClass: "badge-pill badge-soft-primary text-dark"
                }
            ]} activeIndex={tabIndex} onItemSelected={onItemSelected} />
        );
    }

    renderTable(items, itemsByCategory, tabIndex) {
        const visibleItems = items
            .filter(item => tabIndex === 0 ||
                (tabIndex === 1 && item.status === HC_STATE_INFO) ||
                (tabIndex === 2 && item.status === HC_STATE_WARN) ||
                (tabIndex === 3 && item.status === HC_STATE_FAIL) ||
                (tabIndex === 4 && item.premium === true));

        if (visibleItems.length === 0)
            return this.renderEmptyState();
        else
            return <>
                <table className="table table-sm table-responsive-flip table-align-middle">
                    <thead>
                        <tr>
                            <th>{this.headerForColumn(0)}</th>
                            <th className="text-center">{this.headerForColumn(1)}</th>
                            <th>{this.headerForColumn(2)}</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {visibleItems.map(item => this.renderTableRow(item))}
                    </tbody>
                </table>
            </>;
    }

    renderTableRow(item) {
        let backgroundClass;
        if (HC_STATES_GOOD.includes(item.status)) {
            // Highlight skipped Premium checks => the user is not Premium
            backgroundClass = item.premium && item.status === HC_STATE_SKIP ? "bg-soft-dark" : "";
        } else if (item.status === HC_STATE_WARN) {
            backgroundClass = "bg-soft-warning";
        } else {
            backgroundClass = "bg-soft-danger";
        }

        return <tr key={"item_" + item.itemId} className={backgroundClass}>
            <td data-title={this.headerForColumn(0)}>{this.renderStatus(item)}</td>
            <td data-title={this.headerForColumn(1)}>{this.renderWhere(item)}</td>
            <td data-title={this.headerForColumn(2)}>{this.renderWhat(item)}</td>
            <td data-title={this.headerForColumn(3)} className="text-md-right">{this.renderActions(item)}</td>
        </tr>;
    }

    renderStatus(item) {
        const status = item.status;
        if (!status) return <span>&nbsp;</span>;

        switch (status) {
            case HC_STATE_OK: return <StatusBadge className="badge-success" label={intl.get('healthcheck_statusbadge_success')} icon="fa-check" />;
            case HC_STATE_INFO: return <StatusBadge className="badge-secondary" label={intl.get('healthcheck_statusbadge_info')} icon="fa-info" />;
            case HC_STATE_SKIP: return <StatusBadge className="badge-soft-secondary" label={intl.get('healthcheck_statusbadge_skipped')} icon="fa-asterisk" />;
            case HC_STATE_WARN: return <StatusBadge className="badge-warning" label={intl.get('healthcheck_statusbadge_warn')} icon="fa-exclamation" />;
            case HC_STATE_FAIL: return <StatusBadge className="badge-danger" label={intl.get('healthcheck_statusbadge_fail')} icon="fa-times" />;
            default: return <StatusBadge className="badge-light" label={""} icon="fa-asterisk" />;
        }
    }

    renderWhere(item) {
        const image = item.segmentImage, label = item.segmentText;
        if (!image && !label) return <span>&nbsp;</span>;

        // Render inline on small screens, render vertically (block) for screens >= MD size
        const alignerClass = "d-inline-block mr-2 d-md-block mr-md-0";
        return <div className="text-md-center">
            {image && image.ref && image.type === HC_IMAGE_TYPE_CDN &&
                <img className={`${alignerClass} mx-md-auto`} src={`https://cdn.fing.io/images${image.ref}`} height={24} alt={label} />}
            {image && image.ref && image.type === HC_IMAGE_TYPE_FONTAWESOME &&
                <i className={`${alignerClass} mt-md-2 text-dark fa ${image.ref}`} />}
            {image && image.ref && image.type === HC_IMAGE_TYPE_NETWORK_ICON &&
                <NetworkTypeIcon className={alignerClass} type={image.ref} />}
            {image && image.ref && image.type === HC_IMAGE_TYPE_CONTEXT_ICON &&
                <NetworkContextIcon className={alignerClass} type={image.ref} />}
            {image && image.ref && image.type === HC_IMAGE_TYPE_DEVICE_ICON &&
                <DeviceTypeIcon className={alignerClass} type={image.ref} />}
            <span className="small">{label}</span></div>
    }

    renderWhat(item) {
        if (item.noContext) {
            return this.renderWhatForMissingContext(item);
        }

        const title = item.itemTitle, subtitle = item.itemSubtitle;
        if (!title && !subtitle) return <span>&nbsp;</span>;

        return <>
            <div className="text-dark">{title || ''}</div>
            <div className="small">{subtitle || ''}</div>
        </>
    }

    renderWhatForMissingContext(item) {
        const title = item.itemTitle;
        return <>
            <div className="text-dark">{title || ''}</div>
            <div className="my-2">
                <NetworkContextPicker className="overflow-hidden" onContextSelected={this.props.onContextPicked} />
            </div>
        </>
    }

    renderActions(item) {
        const isPremium = item.premium === true;
        return <>
            {item.onMute &&
                <ActionButton action={item.onMute}
                    icon={item.muted ? "fa-bell" : "fa-bell-slash"}
                    type={BTN_TYPE_SOFT}
                    tint={isPremium ? BTN_TINT_DARK : BTN_TINT_PRIMARY}
                    rounded={true}
                    className="mr-2"
                    title={intl.get(item.muted ? "healthcheck_report_unmute_action" : "healthcheck_report_mute_action")}
                    titleClass="d-md-none" />}
            {item.onEdit &&
                <ActionButton action={item.onEdit}
                    icon="fa-cog"
                    disabled={false}
                    type={BTN_TYPE_SOFT}
                    tint={isPremium ? BTN_TINT_DARK : BTN_TINT_PRIMARY}
                    rounded={true}
                    className="mr-2"
                    title={intl.get("generic_edit")} titleClass="d-md-none" />}
            {item.onHelp &&
                <ActionButton action={item.onHelp}
                    icon={isPremium ? "fa-star" : "fa-question-circle"}
                    type={BTN_TYPE_SOFT}
                    tint={isPremium ? BTN_TINT_DARK : BTN_TINT_PRIMARY}
                    rounded={true}
                    className="mr-2"
                    title={intl.get(isPremium ? "generic_upgrade" : "generic_help")}
                    titleClass="d-md-none" />}
        </>;
    }

    headerForColumn(idx) {
        if (idx === 0) return intl.get("healthcheck_report_table_header_state");
        if (idx === 1) return intl.get("healthcheck_report_table_header_where");
        if (idx === 2) return intl.get("healthcheck_report_table_header_what");
        if (idx === 3) return intl.get("generic_actions");
        return '';
    }

    renderEmptyState() {
        let emptyStateText = "";
        switch (this.state.activeGroupIndex) {
            case 0:
                emptyStateText = intl.get('healthcheck_report_emptystate', { filter: "check" });
                break;
            case 1:
                emptyStateText = intl.get('healthcheck_report_emptystate', { filter: "info" });
                break;
            case 2:
                emptyStateText = intl.get('healthcheck_report_emptystate', { filter: "warning" });
                break;
            case 3:
                emptyStateText = intl.get('healthcheck_report_emptystate', { filter: "failure" });
                break;
            case 4:
                emptyStateText = intl.get('healthcheck_report_emptystate_premium');
                break;
        }

        return <EmptyState
            image={this.props.emptyStateImage}
            caption={emptyStateText}
            title={emptyStateText}
            subtitle={intl.get("healthcheck_report_emptystate_component_message")}
        />;
    }
}