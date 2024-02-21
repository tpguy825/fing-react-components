/**
 * (C) Copyright Fing
 */
import NetNode from "../../model/NetNode";
import Contact from "../../model/Contact";

/**
 * Converts the network contacts and network discovery into a list of <code>Contact</code> objects
 * that retain the current status.
 *
 * @param netContacts Array of Network Contacts
 * @param netDiscovery Network Discovery object
 * @return {[Contact]}
 */
export function convertToContactList(snapshot) {
    const netContacts = snapshot?.contacts?.contacts || [];
    const contactStates = calculateContactStates(snapshot);
    return netContacts.map(netContact => mergeContactWithState(netContact, contactStates[netContact.identifier]));
}

/**
 * Holds the current state for a contact. Not exported, internal only.
 */
class ContactState {
    contactId;
    presenceNode;
    online;
    lastChange;
    otherNodes;
    activeScheduleItemIds;
}

/**
 * Calculates the status (online/offline and when) of a person, based on all the presence
 * devices the user might have in the network.
 *
 * @param contacts The list of contact objects
 * @param discovery The network discovery object
 * @return Map contactId->ContactState
 */
function calculateContactStates(snapshot) {
    const discovery = snapshot?.discovery?.discovery;
    const stateById = {};
    const netNodes = discovery.nodes
        .filter(node => node.contactId !== null && node.contactId !== undefined)
        .map(node => new NetNode().applyFromAgentData(node).applyFromDiscovery(snapshot));

    const presenceNetNodes = netNodes.filter(node => node.digitalPresence === true);
    const otherNetNodes = netNodes.filter(node => node.digitalPresence === false);

    for (const netNode of presenceNetNodes) {
        const prevState = stateById[netNode.contactId];
        const newState = new ContactState();
        newState.contactId = netNode.contactId;
        newState.presenceNode = netNode;
        newState.online = netNode.isUp();
        newState.lastChange = Math.max(netNode.firstSeenTime || 0,
            netNode.isDown() ? netNode.getLastOnlineToDownTime() : netNode.getLastDownToOnlineTime());

        if (prevState === null || prevState === undefined) {
            // First device > Just use it
            stateById[newState.contactId] = newState;
        } else if (newState.online === prevState.online) {
            // DOWN+DOWN or UP+UP -> Use the latest time
            newState.lastStateChange = Math.max(newState.lastChange, prevState.lastChange);
            stateById[newState.contactId] = newState;
        } else if (newState.isOnline()) {
            // DOWN+UP -> Use UP (new one)
            stateById[newState.contactId] = newState;
        }   // UP+DOWN -> Leave UP (previous one)
    }

    for (const netNode of otherNetNodes) {
        const prevState = stateById[netNode.contactId];
        if (prevState === null || prevState === undefined) {
            const newState = new ContactState();
            newState.contactId = netNode.contactId;
            newState.otherNodes = [netNode];
            stateById[newState.contactId] = newState;
        } else {
            const otherNodes = prevState.otherNodes ? prevState.otherNodes : [];
            prevState.otherNodes = otherNodes.concat([netNode]);
            stateById[prevState.contactId] = prevState;
        }
    }

    appendInternetDowntime(stateById, snapshot);

    return stateById;
}

function mergeContactWithState(netContact, contactState) {
    const result = new Contact();
    result.contactId = netContact.identifier;
    result.contactName = netContact.displayName;
    if (netContact.pictureUrl)
        result.imageURL = netContact.pictureUrl;
    else if (netContact.pictureImageData)
        result.imageURL = "data:image/jpeg;base64," + netContact.pictureImageData;
    result.contactType = netContact.contactType;
    result.gender = netContact.gender;

    if (contactState) {
        result.online = contactState.online === true;
        result.lastChange = contactState.lastChange;
        result.presenceDevices = contactState.presenceNode ? [contactState.presenceNode] : [];
        result.otherDevices = contactState.otherNodes ? contactState.otherNodes : [];
        result.activeScheduleItemIds = contactState.activeScheduleItemIds;
    } else {
        result.online = false;
        result.lastChange = 0;
        result.presenceDevices = [];
        result.otherDevices = [];
    }

    return result;
}

function appendInternetDowntime(stateById, snapshot) {
    const discovery = snapshot?.discovery?.discovery;

    if (!discovery || !discovery.scheduleConfig || discovery.scheduleConfig.length === 0 || !snapshot.scheduleResult || !snapshot.scheduleResult.activeSchedules) {
        Object.values(state => state.isDowntimeActive = false);
        return;
    }

    const activeSchedules = snapshot.scheduleResult.activeSchedules.reduce((map, id) => {
        map[id] = true;
        return map;
    }, {});

    Object.entries(stateById).forEach(([contactId, state]) => {
        const scheduleItems = discovery.scheduleConfig
            .filter(sched => sched.action && sched.action.targets && sched.action.targets.includes(contactId))
            .map(sched => sched.id)
        ;

        state.activeScheduleItemIds = scheduleItems.filter(id => activeSchedules[id]);
    });
}