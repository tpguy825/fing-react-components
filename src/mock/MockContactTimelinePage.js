import React, {Component} from "react";
import NavigationBar from "../component/NavigationBar";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST,} from "../component/ActionButton";
import MockSidebar from "./MockSidebar";
import ContactData from "./data/DataContact.json";
import Contact from "../model/Contact";
import NetNode from "../model/NetNode";
import NetEvent, {NetEventChangeState} from "../model/NetEvent";
import {EVT_DEVICE_CHANGE, NS_DOWN, NS_UP} from "../model/Constants";
import PresenceTimeline from "../view/presence/PresenceTimeline";

export default class MockContactTimelinePage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: [],
            bottomHit: false,
            contacts: [],
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

    static getFilteredContactList(contacts, props) {
        if (props.match && props.match.params && props.match.params.contactId)
            return contacts.filter(contact => contact.contactId === props.match.params.contactId);
        else
            return contacts;
    }

    componentDidMount() {
        const contactList = MockContactTimelinePage.getFilteredContactList(
            MockContactTimelinePage.getMockContactList(), this.props);
        const events = this.generateRandomEvents(contactList, new Date().getTime(), 20);
        this.setState({contacts:contactList, events:events})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.contactId !== prevProps.match.params.contactId) {
            this.setState({
                contacts: MockContactTimelinePage.getFilteredContactList(
                    MockContactTimelinePage.getMockContactList(), this.props)
            });
        }
    }

    // --------------------------------------------------------------------------------

    render() {
        return (
            <>
                <MockSidebar active="HOME" />
                <header id="header" className="header header-sticky-top bg-white container-fluid p-2 app-header">
                    <NavigationBar
                        left={<ActionButton route="/mock/discovery" title="People" icon='fa-arrow-left'
                                            type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true} />}
                        title={"User timeline of events"}
                        />
                </header>
                <main className="app-main">
                    <div className="container space-2">
                        {this.renderTimeline()}
                    </div>
                </main>
            </>
        );
    }

    renderTimeline() {
        const {events, bottomHit} = this.state;
        return (<div>
            <PresenceTimeline netEvents={events} />

            {!bottomHit && <div className="text-center"><ActionButton
                title={"Show older events"}
                action={() => {this.readOlderEvents()}
            } /></div> }
        </div>);
    }

    generateRandomEvents(contacts, now, days) {
        const randomDays = (n) => Math.floor(Math.random() * n * 24 * 3600 * 1000);
        const events = [];

        for (let i = 0; i < 30; i++) {
            const state = Math.random() < 0.5 ? NS_UP : NS_DOWN;
            const distance = randomDays(days);
            const oppositeStateDistance = randomDays(days);

            const evt = new NetEvent();
            evt.eventType = EVT_DEVICE_CHANGE;
            evt.timestamp = now - distance;
            evt.sharpTime = evt.timestamp;
            evt.onInspect = () => {
            };
            evt.content = new NetEventChangeState(state, oppositeStateDistance);

            // if (Math.random() < 0.3) { // 30% change of being about a contact
                const contactIdx = Math.floor(Math.random() * contacts.length);
                evt.contact = contacts[contactIdx];
            // } else {
            //     evt.netNode = new NetNode();
            //     evt.netNode.bestName = "LG 1020"
            //     evt.netNode.bestType = "MOBILE"
            // }

            events.push(evt);
        }

        events.sort((e1, e2) => e2.timestamp < e1.timestamp ? -1 : 1);
        return events;
    }


    readOlderEvents() {
        let time = new Date().getTime();
        const {events, contacts} = this.state;
        if (events) {
            time = events[this.state.events.length - 1].timestamp;
        }
        const newEvents = this.generateRandomEvents(contacts, time, 20);
        const allEvents = events.concat(newEvents);
        this.setState({events: allEvents, bottomHit: allEvents.length > 100});
    }
}
