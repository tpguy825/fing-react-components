/**
 * This class merges the properties of a Contact with the device data the contact has on a network.
 */
export default class Contact {
    contactId;                  // "0ba47fad-4a92-41e1-a870-786fefb01fed",
    contactName;                // "Marco"
    contactType;                // "HIM"
    gender;                     // "MALE", "FEMALE"
    imageURL;                   // "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    online;                     // boolean
    lastChange;                 // Millis of last change occurred across presence nodes
    presenceDevices;            // The Array<NetNode> objects that are used for presence. At most one
    otherDevices;               // The Array<NetNode> objects that are NOT used for presence
    activeScheduleItemIds;      // List of IDs of active schedule items for this contact

    applyDataContact({contactId, contactName, contactType, gender, imageURL, online, lastChange, presenceDevices, otherDevices}) {
        this.contactId = contactId;
        this.contactName = contactName;
        this.contactType = contactType;
        this.gender = gender;
        this.imageURL = imageURL;
        this.online = online;
        this.lastChange = lastChange;
        this.presenceDevices = presenceDevices;
        this.otherDevices = otherDevices;
    }

    getPictureUrl() {
        const url = this.imageURL;
        return url && (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("images/")) ?
            url : null;
    }

    getPictureImageData() {
        const url = this.imageURL;
        if (!url) return null;

        const formats = ["png", "jpeg"];
        for (const format of formats) {
            const preamble = `data:image/${format};base64,`;
            if (url.startsWith(preamble)) {
                return url.substring(preamble.length);
            }
        }

        return null;
    }

    isScheduledInternetDowntimeActive() {
        return this.getActiveScheduleItems().length > 0;
    }

    getActiveScheduleItems() {
        return this.activeScheduleItemIds || [];
    }
}

export function newContactWithId() {
    const c = new Contact();
    c.contactId = uuidv4();
    return c;
}

// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
