import React, {Component} from "react";
import NavigationBar from "../component/NavigationBar";
import ActionButton, {
    BTN_TINT_DANGER,
    BTN_TINT_DARK,
    BTN_TINT_PRIMARY, BTN_TINT_SECONDARY,
    BTN_TYPE_GHOST,
    BTN_TYPE_SOFT
} from "../component/ActionButton";
import MockSidebar from "./MockSidebar";
import DeviceTypeIcon from "../component/icons/DeviceTypeIcon";
import ContactData from "./data/DataContact.json";
import DiscoveryData from "./data/DataDiscoveryState.json";
import ContactAvatar, {AVT_SIZE_BIG, AVT_SIZE_SMALL} from "../view/presence/ContactAvatar";
import {Link} from "react-router-dom";
import Contact from "../model/Contact";
import NetNode from "../model/NetNode";
import NetEvent, {NetEventChangeState} from "../model/NetEvent";
import {NS_DOWN, NS_UP, TINT_SECONDARY, TINT_SUCCESS} from "../model/Constants";
import PresenceTimelineTable from "../view/presence/PresenceTimelineTable";
import {getContactHierarchy} from "../helpers/ContactTypeHelper";
import {hideDialogById, showDialogById} from "../component/ModalDialog";
import PresenceProfileEditDialog from "../view/presence/PresenceProfileEditDialog";
import PresenceConfirmDeleteDialog from "../view/presence/PresenceConfirmDeleteDialog";
import StatusBadge from "../component/StatusBadge";
import intl from "react-intl-universal";

const EDIT_USER_DIALOG = "EDIT_USER_DIALOG";
const DELETE_USER_DIALOG = "DELETE_USER_DIALOG";

export default class MockContactPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            contact: MockContactPage.getMockContactList()
                .find(contact => contact.contactId === this.props.match.params.contactId)
        };
    }

    static getMockContactList() {
        const contacts = ContactData.map(json => Object.assign(new Contact(), json));
        contacts.forEach(contact => {
            contact.presenceDevices = (contact.presenceDevices || []).map(node => Object.assign(new NetNode(), node));
            contact.otherDevices = (contact.otherDevices || []).map(node => Object.assign(new NetNode(), node));
        });

        return contacts;
    }

    // --------------------------------------------------------------------------------

    render() {
        const {contact} = this.state;
        return (
            <>
                <MockSidebar active="HOME" />
                <header id="header" className="header header-sticky-top bg-white container-fluid p-2 app-header">
                    <NavigationBar
                        left={<ActionButton route="/mock/discovery" title="People" icon='fa-arrow-left'
                                            type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true} />}
                        title={"User summary"}
                        />
                </header>
                <main className="app-main">
                    <div className="container-fluid space-2 px-7">
                        <div className="row">
                            <div className="col-lg-8">
                                {this.renderContact(contact)}
                            </div>
                            <div className="col-lg-4 card card-bordered">
                                {this.renderOthers(contact)}
                            </div>
                        </div>
                    </div>
                </main>
                {this.renderEditUserDialog()}
                {this.renderDeleteUserDialog()}
            </>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.contactId !== prevProps.match.params.contactId) {
            this.setState({
                contact: MockContactPage.getMockContactList()
                    .find(contact => contact.contactId === this.props.match.params.contactId)
            });
        }
    }

    renderContact(contact) {
        return <>
            <div className="px-md-4">
                {this.renderContactIntro(contact)}
                {this.renderContactActions(contact)}
                {this.renderDevices(contact)}
                {this.renderTimeline(contact)}
            </div>
        </>;
    }

    renderOthers(current) {
        const contactsData = MockContactPage.getMockContactList();
        return <div className="py-3 px-1">
            <div className="mb-2 border-bottom">
                <h4>Online users</h4>
            </div>
            {contactsData.filter(c => c.online === true).map(item =>
                <Link key={`link_to_contact_${item.contactId}`} to={`/mock/contact/${item.contactId}`}>{this.renderSidebarContactIntro(item)}</Link>)}

            <div className="mt-2 mb-2 border-bottom">
                <h4>Offline users</h4>
            </div>
            {contactsData.filter(c => c.online === false).map(item =>
                <Link to={`/mock/contact/${item.contactId}`}>{this.renderSidebarContactIntro(item)}</Link>)}
            </div>
    }

    renderSidebarContactIntro(contact) {

        return (
            <div className="media align-items-center py-3">
                <ContactAvatar size={AVT_SIZE_SMALL} contact={contact}/>

                <div className="media-body ml-3">
                    <h5 className="mb-0">{contact.contactName}</h5>
                    <ul className="list-inline list-separator mb-0 font-size-1">
                        <li className="list-inline-item">
                            <i className="fas fa-clock mr-1"/>
                            {contact.online ? "Arrived at 10:00" : "Left at 10:00"}</li>
                    </ul>
                </div>
            </div>
        );
    }

    renderContactIntro(contact) {
        const contactHierarchy = getContactHierarchy(contact.contactType);
        return (
            <div className="media align-items-center pt-5">
                <ContactAvatar size={AVT_SIZE_BIG} contact={contact} />

                <div className="media-body ml-3">
                    <small className="d-block small font-weight-bold text-cap">{contactHierarchy.join(" / ")}</small>
                    <h2 className="mb-0">{contact.contactName}</h2>
                    <ul className="list-inline list-separator mb-0 font-size-1">
                        <li className="list-inline-item">
                            {contact.online ? "Online" : "Offline"}</li>
                        <li className="list-inline-item">
                            <i className="fas fa-clock text-primary mr-1"/>
                            {contact.online ? "Arrived at 10:00" : "Left at 10:00"}</li>
                        <li className="list-inline-item">
                            <i className="fas fa-hourglass-start text-primary mr-1"/>
                            2h15m ago</li>
                    </ul>
                </div>
            </div>
        );
    }

    renderContactActions(contact) {
        return (
            <div className="media align-items-center pt-2 pb-5">
                <div className="avatar avatar-circle avatar-xl" style={{height: "inherit"}}>
                </div>
                <div className="media-body ml-3">
                    <ActionButton action={() => {
                        // Create a duplicate to force the dialog to redraw from scratch
                        this.setState({dialogContact: Object.assign(new Contact(), contact)},
                            () => { showDialogById(EDIT_USER_DIALOG);});
                    }} title={"Edit"} type={BTN_TYPE_SOFT} className={"mr-2"} />
                    <ActionButton title={"Delete"} action={()=> {
                        this.setState({dialogContact: contact},
                            () => { showDialogById(DELETE_USER_DIALOG);});
                    }}  type={BTN_TYPE_SOFT} tint={BTN_TINT_DANGER} className={"mr-2"} />
                    •
                    <ActionButton title={"Alerts off"} type={BTN_TYPE_SOFT} className={"mx-2"} icon={"fa-bell"} />
                </div>
            </div>
        );
    }

    renderDevices(contact) {
        return (
            <div className="mb-6">
                <div className="mb-3 border-bottom">
                    <h3>Assigned devices</h3>
                </div>
                <div className="list-group list-group-lg list-group-flush list-group-no-gutters">
                    {contact.presenceDevices && contact.presenceDevices.map(device => this.renderDevice(device))}
                    {contact.otherDevices && contact.otherDevices.map(device => this.renderDevice(device))}
                </div>
            </div>
        )
    }

    /**
     * @param {NetNode} device
     */
    renderDevice(device) {
        return (
            <div key={device.hwAddress} className="list-group-item">
                <div className="media">
                    <span className="list-group-icon"><DeviceTypeIcon type={device.bestType}/></span>
                    <div className="media-body">
                        <div className="row align-items-center">
                            <div className="col-sm mb-1 mb-sm-0">
                                <h6 className="mb-0">{device.bestName}</h6>
                                <small>Huawei • P10</small>
                            </div>

                            <div className="col-sm-auto">
                                {device.digitalPresence ?
                                    <StatusBadge className="badge-primary" label={intl.get('presence_badge_tracking')} icon="fa-user" /> :
                                    <StatusBadge className="badge-secondary" label={intl.get('presence_badge_other')} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderTimeline(contact) {
        const randomDays = (n) => Math.floor(Math.random() * n * 24 * 3600 * 1000);

        const n1 = new NetEvent();
        n1.contact = contact;
        n1.eventType = "NodeStateChange";
        n1.timestamp = new Date().getTime() - randomDays(1);
        n1.content = new NetEventChangeState(NS_UP, randomDays(1));
        n1.sharpTime = n1.timestamp;
        n1.onInspect = () => {};

        const n2 = new NetEvent();
        n2.netNode = new NetNode();
        n2.netNode.bestName = "LG 1020"
        n2.netNode.bestType = "MOBILE"
        n2.eventType = "NodeStateChange";
        n2.content = new NetEventChangeState(NS_UP, randomDays(2));
        n2.timestamp = new Date().getTime() - randomDays(2);
        n2.sharpTime = n2.timestamp;
        n2.onInspect = () => {};

        const n3 = new NetEvent();
        n3.netNode = new NetNode();
        n3.netNode.bestName = "LG 1020"
        n3.netNode.bestType = "MOBILE"
        n3.eventType = "NodeStateChange";
        n3.content = new NetEventChangeState(NS_DOWN, randomDays(3));
        n3.timestamp = new Date().getTime() - randomDays(3);
        n3.sharpTime = n3.timestamp;
        n3.onInspect = () => {};

        return (
            <div className="mb-6">
                <div className="mb-3 border-bottom">
                    <h3>Timeline</h3>
                </div>

                <PresenceTimelineTable netEvents={[n1, n2, n3]} />
            </div>
        );

    }

    renderEditUserDialog() {
        const {dialogContact} = this.state;
        const onClose = () => { hideDialogById(EDIT_USER_DIALOG); };
        const onConfirm = (newContact) => {
            hideDialogById(EDIT_USER_DIALOG);
            this.setState({contact: newContact});
        };

        const discovery = DiscoveryData.discovery.discovery;
        const netNodes = discovery.nodes.map(netNode => new NetNode().applyFromAgentData(netNode));
        return <PresenceProfileEditDialog id={EDIT_USER_DIALOG}
                                          netContext={discovery.network.context}
                                          defaultContact={dialogContact}
                                          netNodes={netNodes}
                                          onClose={onClose}
                                          onConfirm={onConfirm} />
    }

    renderDeleteUserDialog() {
        const {dialogContact} = this.state;
        const onClose = () => { hideDialogById(DELETE_USER_DIALOG); };
        const onConfirm = (newContact) => {
            hideDialogById(DELETE_USER_DIALOG);
            // Just go back
        };

        return <PresenceConfirmDeleteDialog id={DELETE_USER_DIALOG}
                                            contact={dialogContact}
                                            onClose={onClose}
                                            onConfirm={onConfirm}/>
    }

}
