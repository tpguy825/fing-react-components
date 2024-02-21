import IAMDefinition from "./IAMDefinition";
import IAMMessageView from "./IAMMessageView";
import IAMTarget from "./IAMTarget";

const IAM_MESSAGES = "messages";
const MIN_HOURS_TO_PASS_FOR_DEFINITIONS_REFRESH = 6;

/**
 * @callback stringToVoidCallback
 * @param {string} str
 */

/**
 * @callback requestFunction
 * @param {string} URL
 * @returns {Promise}
 */

/**
 * @typedef {IAMManager.Environment}
 * @property {string} URL
 * @property {stringToVoidCallback|undefined} onMessage
 * @property {requestFunction} request
 * @property {stringToVoidCallback|undefined} logger
 * @property {boolean|undefined} isDev
 * @property {Prefs} prefs
 * @property {IAMTarget.Profile} profile
 */

class IAMManagerEnvironment {
    static TargetProfile = IAMTarget.Profile;

    URL;                // the target URL
    onMessage;          // a callback fired when a message should be shown
    request;            // should return a promise with a JSON response, or an error
    logger;             // a callback fired when the manager wants to log its activity
    isDev;              // if the manager should run in development mode
    prefs;              // prefs interface to persist information
    profile;            // IAMTarget.Profile that aggregates all actual user information needed for targeting
    language;           // current app language
    appFirstOpen;       // current installation first open time

    log(what) {
        this.logger && this.logger(what);
    }

    validate() {
        if (!(this.URL && this.prefs)) {
            throw new Error("Incomplete arguments for IAM Manager");
        }
    }
}

class IAMManager {
    static Environment = IAMManagerEnvironment;
    
    messages;
    lastUpdateTime;

    constructor(env) {
        this.env = env || {};
        this.env.validate();
    }

    syncDefinitions() {
        if (this.hasntUpdatedYet()) {
            const backup = this.env.prefs.getLocalBackup();
            const isBackupThere = backup && backup.length > 0;

            if (isBackupThere) {
                this.loadMessagesFrom(backup);
            }

            this.refreshDefinitions();
        } else if (this.hoursPassedFromLastUpdate() > MIN_HOURS_TO_PASS_FOR_DEFINITIONS_REFRESH) {
            this.refreshDefinitions();
        } else if (this.hasPendingMessages()) {
            this.sendMessage();
        }
    }

    hasntUpdatedYet() {
        return !this.lastUpdateTime;
    }

    hoursPassedFromLastUpdate() {
        return new Date(Date.now() - this.lastUpdateTime).getHours();
    }

    getMessageForLocation(locationId) {
        return this.getMessage(locationId);
    }

    getMessage(locationFilter) {
        const msg = this.findFirstValidDefinition(locationFilter);

        if (msg) {
            return new IAMMessageView(this.env.language, msg);
        }

        return null;
    }

    hasPendingMessages() {
        return this.findFirstValidDefinition() !== null;
    }

    findFirstValidDefinition(locationFilter) {
        if (!this.messages) {
            return null;
        }
       
        const lastShowDateForAnyMessage = this.env.prefs.getLastShowDateForAnyMessage();

        for (const msg of this.messages) {
            if (locationFilter && locationFilter !== msg.locationId) {
                continue;
            }

            const showCount = this.env.prefs.getShowCount(msg.id);
            const showDate = this.env.prefs.getLastShowDate(msg.id);

            const schedulingArgs = {
                showCount,
                showDate,
                lastShowDateForAnyMessage,
                appFirstOpen: this.env.appFirstOpen
            };

            if (msg.matches(this.env.profile, schedulingArgs)) {
                return msg;
            }
        }

        return null;
    }

    refreshDefinitions() {
        if (!this.env.request || !this.env.URL) {
            if (this.hasPendingMessages()) {
                this.sendMessage();
            }

            return;
        }

        this.env.request(this.env.URL).then(response => {
            this.env.log("Remote definitions downloaded");
            const messagesJson = response[IAM_MESSAGES];

            if (messagesJson) {
                this.loadMessagesFrom(messagesJson);
                
                if (this.messages) {
                    this.env.prefs.setLocalBackup(this.messages.length > 0 ? messagesJson : "");
                }
            }

            if (this.hasPendingMessages()) {
                this.sendMessage();
            }
        }).catch(error => {
            this.env.log(error);

            if (this.hasPendingMessages()) {
                this.sendMessage();
            }
        });
    }

    sendMessage() {
        if (!this.env.onMessage) {
            return;
        }

        const msg = this.getMessage();
        
        if (msg) {
            this.env.onMessage(msg);
        }
    }

    loadMessagesFrom(json) {
        try {
            this.messages = this.parseJson(json);
            this.lastUpdateTime = Date.now();
        } catch (error) {
            this.messages = [];
            this.lastUpdateTime = false;
            this.env.log(error);
        }
    }

    parseJson(messages) {
        if (!messages) {
            return [];
        }

        return messages.map(message => new IAMDefinition(message));
    }

    setLanguage(lang) {
        this.env.language = lang;
    }
}

export default IAMManager;