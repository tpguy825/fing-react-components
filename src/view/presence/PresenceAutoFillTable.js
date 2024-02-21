/**
 * Created by marco on 5/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import intl from 'react-intl-universal';
import ActionButton, {BTN_TYPE_SOFT} from "../../component/ActionButton";
import {CT_ALL_TYPES} from "../../model/Constants";
import DeviceTypeIcon from "../../component/icons/DeviceTypeIcon";
import EmptyState from "../../component/EmptyState";
import {getContactTypeDepth, getContactTypeName} from "../../helpers/ContactTypeHelper";
import ContactTypePicker from "./ContactTypePicker";

export default class PresenceAutoFillTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.selectOptions = CT_ALL_TYPES.map(type => {
            return {
                value: type,
                label: getContactTypeName(type)
            };
        });
    }

    render() {
        const items = this.props.detectedContacts;
        return items && items.length > 0 ? this.renderTable(items) : this.renderNoContacts();
    }

    renderNoContacts() {
        return <>
            <EmptyState className="my-2 w-60 mx-auto"
                        image={this.props.emptyStateImage}
                        caption={intl.get("presence_autofill_empty_caption")}
                        title={intl.get("presence_autofill_empty_title")}
                        subtitle={intl.get("presence_autofill_empty_subtitle")}
            />
        </>;
    }

    renderTable(items) {
        return (
            <>
                <table className="table table-borderless table-thead-bordered table-nowrap table-responsive-flip">
                    <thead>
                    <tr>
                        <th>{this.headerForColumn(0)}</th>
                        <th>{this.headerForColumn(1)}</th>
                        <th>{this.headerForColumn(2)}</th>
                        <th style={{width: "3em"}}/>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item,idx) => this.renderTableRow(item, idx))}
                    </tbody>
                </table>
            </>
        );
    }

    headerForColumn(idx) {
        if (idx === 0) return intl.get('generic_name');
        if (idx === 1) return intl.get('generic_type');
        if (idx === 2) return intl.get('presence_autofill_table_headerdevice');
        if (idx === 3) return intl.get('generic_actions');
        return '';
    }

    renderTableRow(item, index) {
        return <tr key={item.contactId}>
            <td data-title={this.headerForColumn(0)}>
                {this.renderNameEditor(item)}
            </td>
            <td data-title={this.headerForColumn(1)}>
                {this.renderContactType(item)}
            </td>
            <td data-title={this.headerForColumn(2)}>
                {this.renderPresenceDevices(item)}
            </td>
            <td data-title={this.headerForColumn(3)}>
                {this.renderActions(item, index)}
            </td>
        </tr>;
    }

    renderNameEditor(contact) {
        return <input type="text" className="form-control form-control-sm" defaultValue={contact.contactName}
                      placeholder={intl.get('presence_autofill_table_nameplaceholder')}/>;
    }

    renderContactType(contact) {
        return <ContactTypePicker contactType={contact ? contact.contactType : null} />
    }

    renderPresenceDevices(contact) {
        return <>
            {contact.presenceDevices && contact.presenceDevices.map((device,index) =>
                <div className="d-block my-1" key={`presence_device_${index}`}>
                    <DeviceTypeIcon type={device.bestType} className="d-inline-block mr-2"/>
                <span>{device.bestName}</span>
            </div>)}
            {contact.otherDevices && contact.otherDevices.map((device,index) =>
                <div className="d-block my-1" key={`presence_device_${index}`}>
                    <DeviceTypeIcon type={device.bestType} className="d-inline-block mr-2"/>
                <span>{device.bestName}</span>
            </div>)}
        </>;
    }

    renderActions(contact, index) {
        // Upon click, the previous list is taken, item removed from the array and update sent to the caller via onUpdate
        const onDelete = () => {
            this.props.detectedContacts.splice(index, 1);
            if (this.props.onUpdate) {
                this.props.onUpdate(this.props.detectedContacts);
            }
        };

        return <ActionButton action={onDelete}
                             icon={"fa-trash"}
                             type={BTN_TYPE_SOFT}
                             rounded={true}
                             title={intl.get("generic_delete")}
                             titleClass="d-md-none"/>;
    }
}

PresenceAutoFillTable.propTypes = {
    detectedContacts: PropTypes.array
};