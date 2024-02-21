import React, {Component} from "react";
import intl from "react-intl-universal";
import ActionButton, {
    BTN_SIZE_BIG,
    BTN_TYPE_SOFT,
} from '../component/ActionButton';
import EmptyState from "../component/EmptyState";

import SegmentedBar from '../component/SegmentedBar';

import ContactCard from "../view/presence/ContactCard";
import {hideDialogById, showDialogById} from "../component/ModalDialog";
import PresenceAutoFillDialog from "../view/presence/PresenceAutoFillDialog";
import {Link} from "react-router-dom";
import ContactData from "./data/DataContact.json";
import HeatMap from "react-heatmap-grid";
import ContactAvatar, {AVT_SIZE_MINI} from "../view/presence/ContactAvatar";
import PresenceProfileEditDialog from "../view/presence/PresenceProfileEditDialog";
import {newContactWithId} from "../model/Contact";
import DropdownButton from "../component/DropdownButton";

import EmptyStateImage from "../assets/svg/storyset/people-group.svg";
import ReportSentImage from "../assets/svg/storyset/mail-sent.svg";
import DiscoveryState from "./data/DataDiscoveryState.json";
import NetNode from "../model/NetNode";
import SendReportDialog from "../component/SendReportDialog";
import { createMockContactsList } from "./generators/PeopleContactsListGenerator";

const AUTOFILL_USERS_DIALOG = "AUTOFILL_USERS_DIALOG";
const ADD_USER_DIALOG = "ADD_USER_DIALOG";
const SEND_REPORT_DIALOG = "SEND_REPORT_DIALOG";
export default class MockPeoplePage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {contacts: []};
    }

    render() {
        const contacts = this.state.contacts;
        return <>
            {contacts && contacts.length > 0 ?
                this.renderContacts(contacts) :
                this.renderNoContacts()
            }
            {this.renderAutofillDialog()}
            {this.renderAddUserDialog()}
            {this.renderSendReportDialog()}
        </>
    }

    renderNoContacts() {
        return <>
            <EmptyState className="my-8 w-60 mx-auto"
            image={EmptyStateImage}
            caption="No contacts"
            title="Start tracking users of your network"
            subtitle="Let Fing automatically detect users from personal devices, or add them manually."
            action={<ActionButton size={BTN_SIZE_BIG} title="Detect network users"
                                  action={() => {showDialogById(AUTOFILL_USERS_DIALOG);}} />}
            />
        </>;
    }

    renderContacts(contacts) {
        const xLabels = [
            "0am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am",
            "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm",
        ].map(x => <small>{x}</small>);
        const xLabelsVisibility = new Array(24)
            .fill(0)
            .map((_, i) => (i % 2 === 0));

        const yLabels = contacts.map(item => <small className="overflow-hidden text-nowrap">
            <ContactAvatar className="mr-2" size={AVT_SIZE_MINI} contact={item}/>
        </small>);
        const data = new Array(yLabels.length)
            .fill(0)
            .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));

        let currentHour = new Date().getHours();

        const onSendReport = (idx) => {
            this.setState(
                {sendReportTime: 0, sendReportCompleted: false},
                () => showDialogById(SEND_REPORT_DIALOG))}
        return (
            <>
                <section className="pt-2">
                    <div className="d-flex mb-2">{contacts.map(item => this.renderContactCard(item))}</div>
                    <div>
                        <ActionButton className="mr-2" title="Detect users" icon="fa-users" type={BTN_TYPE_SOFT}
                                      action={() => {showDialogById(AUTOFILL_USERS_DIALOG);}} />
                        <ActionButton className="mr-2" title="Add user" icon="fa-plus" type={BTN_TYPE_SOFT}
                                      action={() => {
                                          this.setState({dialogContact: newContactWithId()},
                                              () => { showDialogById(ADD_USER_DIALOG) });
                                      }}
                        />
                    </div>
                </section>
                <hr className="pt-2"/>
                <div className="d-flex flex-wrap">
                    <div>
                        <h4 className="mb-0">Who's at home</h4>
                        <p>Based on user's presence devices.</p>
                    </div>
                    <div className="ml-lg-auto">
                        <SegmentedBar items={[
                            {label: "Today"},
                            {label: "Yesterday"},
                            {label: "1 weeks"},
                            {label: "2 weeks"},
                        ]}/>
                    </div>
                </div>
                <div className="my-4 w-lg-80 mx-auto">
                    <HeatMap
                        height={20}
                        yLabelWidth={48}
                        xLabels={xLabels}
                        xLabelsVisibility={xLabelsVisibility}
                        yLabels={yLabels}
                        data={data}
                        cellStyle={(background, value, min, max, data, x, y) => ({
                            background: x > currentHour ? "repeating-linear-gradient(" +
                                "  -45deg," +
                                "  rgba(0, 0, 0, 0.0)," +
                                "  rgba(0, 0, 0, 0.0) 4px," +
                                "  rgba(0, 0, 0, 0.2) 4px," +
                                "  rgba(0, 0, 0, 0.2) 6px" +
                                ")" : value < 10 ?
                                "rgba(0,0,0,0.1)" :
                                `rgba(0, 109, 44, ${value > 75 ? 1.0 : value >= 35 ? 0.75 : 0.5})`,
                            fontSize: "11px",
                            marginTop: "10px",
                            marginBottom: "10px",
                        })}
                    />
                </div>
                <div>
                    <ActionButton route="/mock/timeline" className="mr-2" title="Timeline" icon="fa-clock" type={BTN_TYPE_SOFT} />
                    <DropdownButton className="mr-2" title="Report" icon="fa-file-export" type={BTN_TYPE_SOFT}
                        onItemSelected={onSendReport}>
                        <span>This month</span>
                        <span>Last month</span>
                    </DropdownButton>
                </div>
            </>);
    }

    renderContactCard(contact) {
        return <Link key={`mock_contact_${contact.contactId}`} to={`/mock/contact/${contact.contactId}`}><ContactCard contact={contact} /></Link>
    }

    renderAutofillDialog() {
        const onClose = () => { hideDialogById(AUTOFILL_USERS_DIALOG); };
        const onConfirm = (newContacts) => {
            hideDialogById(AUTOFILL_USERS_DIALOG);
            newContacts.forEach(contact => contact.status = contact.online ? "Arrived at 12:00" : "Left at 10:30");
            const onStateUpdated = () => {
                if (!this.dropdownInitalized) {
                    window.initDropdown();
                    this.dropdownInitalized = true;
                }
            };
            this.setState((state, props) => ({
                contacts: state.contacts.concat(newContacts)
            }), onStateUpdated);
        };

        const currentContactIds = this.state.contacts.map(c => c.contactId);
        const newContacts = createMockContactsList(ContactData).filter(c => !currentContactIds.includes(c.contactId));
        return <PresenceAutoFillDialog id={AUTOFILL_USERS_DIALOG}
                                       existingContacts={this.state.contacts}
                                       detectedContacts={newContacts}
                                       emptyStateImage={EmptyStateImage}
                                       onClose={onClose} onConfirm={onConfirm} />
    }

    renderAddUserDialog() {
        const onClose = () => { hideDialogById(ADD_USER_DIALOG); };
        const onConfirm = (newContact) => {
            hideDialogById(ADD_USER_DIALOG);
            this.setState((state) => ({
                contacts: state.contacts.concat([newContact])
            }));
        };
        const discovery = DiscoveryState.discovery.discovery;
        const netNodes = discovery.nodes.map(netNode => new NetNode().applyFromAgentData(netNode).applyFromDiscovery(DiscoveryState.discovery));
        return <PresenceProfileEditDialog id={ADD_USER_DIALOG}
                                          netContext={discovery.network.context}
                                          netNodes={netNodes}
                                          defaultContact={this.state.dialogContact}
                                          onClose={onClose} onConfirm={onConfirm} />
    }

    renderSendReportDialog() {
        const email = "marco@fing.com";
        const hasPremium = true;
        const onClose = () => { hideDialogById(SEND_REPORT_DIALOG); };
        const onConfirm = (email) => {
            console.log("Sending report to " + email);
            this.setState({sendReportCompleted: true});
        };
        const emptyState = <EmptyState  className="my-2 w-80 mx-auto"
                                        image={ReportSentImage}
                                        caption={intl.get("presence_send_report_empty_caption")}
                                        title={intl.get("presence_send_report_empty_title")}
                                        subtitle={intl.get("presence_send_report_empty_subtitle")}/>
        return <SendReportDialog    id={SEND_REPORT_DIALOG} 
                                    email={email}
                                    title={intl.get('presence_send_report_title')}
                                    emptyState={emptyState}
                                    bodyText={intl.get("presence_send_report_body")}
                                    hasPremium={hasPremium}
                                    completed={this.state.sendReportCompleted}
                                    onClose={onClose} onConfirm={onConfirm} />
    }

}
