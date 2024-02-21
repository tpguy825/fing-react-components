import Contact from "../../model/Contact";
import NetNode from "../../model/NetNode";

export function createMockContactsList(data) {
    const contacts = data.map(json => Object.assign(new Contact(), json));
    const now = new Date().getTime();
    contacts.forEach(contact => contact.lastChange = now - Math.random() * 1000 * 60 * 60 * 24 * (contact.online ? 1 : 7));
    contacts.forEach(
        contact => {
            contact.presenceDevices = (contact.presenceDevices || []).map(node => Object.assign(new NetNode(), node));
            contact.otherDevices = (contact.otherDevices || []).map(node => Object.assign(new NetNode(), node));
        }
    );

    return contacts;
}