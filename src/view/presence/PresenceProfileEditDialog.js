/**
 * Created by marco on 5/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, {ModalDialogBody, ModalDialogFooter} from "../../component/ModalDialog";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../../component/ActionButton";
import ContactTypePicker from "./ContactTypePicker";
import Contact, {newContactWithId} from "../../model/Contact";
import ContactAvatar, {AVT_SIZE_DEFAULT} from "./ContactAvatar";
import {
    contactTypesMatching,
    CT_ALL_TYPES,
    CT_FAMILY_HER,
    CT_FAMILY_HIM,
    DT_GENERIC,
    DT_PRESENCE_DISCARD_TYPES,
    DT_PRESENCE_TYPES,
    GND_FEMALE,
    GND_MALE,
    NC_ALL_TYPES
} from "../../model/Constants";
import DeviceTypeIcon from "../../component/icons/DeviceTypeIcon";
import StatusBadge from "../../component/StatusBadge";

const WIZARD_STEP_USER_FORM = 0;
const WIZARD_STEP_SELECT_DEVICES = 1;

export default class PresenceProfileEditDialog extends Component {

    constructor(props, context) {
        super(props, context);

        this.saveContactWithNetNode = this.saveContactWithNetNode.bind(this);
        this.onContactNameInputChanged = this.onContactNameInputChanged.bind(this);
        this.onContactTypePicked = this.onContactTypePicked.bind(this);
        this.onMaleGenderSelected = this.onMaleGenderSelected.bind(this);
        this.onFemaleGenderSelected = this.onFemaleGenderSelected.bind(this);
        this.onOtherGenderSelected = this.onOtherGenderSelected.bind(this);
        this.dialogGoToDeviceStep = this.dialogGoToDeviceStep.bind(this);
        this.dialogSaveContact = this.dialogSaveContact.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onClearPicture = this.onClearPicture.bind(this);
        this.onDeviceSelected = this.onDeviceSelected.bind(this);
        this.onDeviceTogglePresence = this.onDeviceTogglePresence.bind(this);
        this.onUserProvidedImage = this.onUserProvidedImage.bind(this);

        const contact = this.createContactFromProps();
        this.state = {
            contact: contact,
            wizardStep: WIZARD_STEP_USER_FORM,
            formIncomplete: false,
            devicesIncomplete: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currentContactId = this.props.defaultContact && this.props.defaultContact.contactId;
        const prevContactId = prevProps.defaultContact && prevProps.defaultContact.contactId;
        if (currentContactId !== prevContactId) {
            const contact = this.createContactFromProps();
            this.setState({
                contact: contact,
                wizardStep: WIZARD_STEP_USER_FORM
            });
        }
    }

    // --------------------------------------------------------------------------------
    // Convert PROPS into current state
    // --------------------------------------------------------------------------------

    createContactFromProps() {
        if (this.props.defaultContact) {
            return Object.assign(new Contact(), this.props.defaultContact);
        } else {
            return newContactWithId();
        }
    }

    // --------------------------------------------------------------------------------
    // Handle Form changes
    // --------------------------------------------------------------------------------

    onContactNameInputChanged(evt) {
        if (!evt.currentTarget)
            return;

        const newName = evt.currentTarget.value;
        this.setState((prevState) => {
            const newContact = Object.assign(new Contact(), prevState.contact);
            newContact.contactName = newName;
            return {
                contact: newContact
            };
        });
    }

    onContactTypePicked(newContactType) {
        this.setState((prevState) => {
            const newContact = Object.assign(new Contact(), prevState.contact);
            newContact.contactType = newContactType;
            if (newContactType === CT_FAMILY_HIM) newContact.gender = GND_MALE;
            if (newContactType === CT_FAMILY_HER) newContact.gender = GND_FEMALE;
            return {
                contact: newContact
            };
        });
    }

    onMaleGenderSelected() {
        this.onGenderSelected(GND_MALE);
    }

    onFemaleGenderSelected() {
        this.onGenderSelected(GND_FEMALE);
    }

    onOtherGenderSelected() {
        this.onGenderSelected(null);
    }

    onGenderSelected(newGender) {
        this.setState((prevState) => {
            const newContact = Object.assign(new Contact(), prevState.contact);
            newContact.gender = newGender;
            return {
                contact: newContact
            };
        });
    }

    onClearPicture() {
        this.setState((prevState) => {
            const newContact = Object.assign(new Contact(), prevState.contact);
            newContact.imageURL = null;
            return {
                contact: newContact
            };
        });
    }

    onCloseDialog() {
        if (this.props.onClose) {
            this.props.onClose();
        }
        // Reset dialog for next show()
        this.setState({
            wizardStep: WIZARD_STEP_USER_FORM,
            formIncomplete: false,
            devicesIncomplete: false
        });
    }

    onDeviceSelected(evt) {
        if (!evt.currentTarget) return;

        // This corresponds to "data-hwaddress" property of the input
        const hwAddress = evt.currentTarget.dataset.hwaddress;
        if (!hwAddress) return;

        const netNode = this.props.netNodes.find(netNode => netNode.hwAddress === hwAddress);
        if (!netNode) return;

        const selected = evt.currentTarget.checked;
        const isPresence = (dev) => DT_PRESENCE_TYPES.includes(dev.bestType);
        const appendToArray = (arr, val) => arr ? arr.concat([val]) : [val];

        this.setState((prevState) => {
            const newContact = Object.assign(new Contact(), prevState.contact);

            if (selected) {
                if (isPresence(netNode)) {
                    if (newContact.presenceDevices && newContact.presenceDevices.length > 0) {
                        newContact.otherDevices =  appendToArray(newContact.otherDevices, netNode)
                    } else {
                        newContact.presenceDevices = [netNode];
                    }
                } else {
                    newContact.otherDevices =  appendToArray(newContact.otherDevices, netNode)
                }
            } else {
                if (newContact.presenceDevices  && newContact.presenceDevices.length > 0) {
                    newContact.presenceDevices = newContact.presenceDevices.filter(dev => dev.hwAddress !== hwAddress);

                    // If we're left without presence device, see if any of the other devices can be
                    // promoted to presence. At most ONE!
                    if (newContact.presenceDevices.length === 0 && newContact.otherDevices && newContact.otherDevices.length > 0) {
                        for (let i=0; i < newContact.otherDevices.length; i++) {
                            const otherDevice = newContact.otherDevices[i];
                            if (isPresence(otherDevice)) {
                                newContact.presenceDevices = [otherDevice];
                                // Splice returns the array of delete elements
                                newContact.otherDevices.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
                if (newContact.otherDevices) {
                    newContact.otherDevices = newContact.otherDevices.filter(dev => dev.hwAddress !== hwAddress);
                }
            }
            return {
                contact: newContact
            };
        });
    }

    onDeviceTogglePresence(evt) {
        if (!evt.currentTarget) return;

        // This corresponds to "data-hwaddress" property of the link
        const hwAddress = evt.currentTarget.dataset.hwaddress;
        if (!hwAddress) return;

        const netNode = this.props.netNodes.find(netNode => netNode.hwAddress === hwAddress);
        if (!netNode) return;

        const appendToArray = (arr, val) => arr ? arr.concat([val]) : [val];

        this.setState((prevState) => {
            const newContact = Object.assign(new Contact(), prevState.contact);

            let devIndex = newContact.presenceDevices && newContact.presenceDevices.length > 0 ?
                newContact.presenceDevices.findIndex(netNode => netNode.hwAddress === hwAddress) : -1;
            if (devIndex >= 0) {
                newContact.presenceDevices.splice(devIndex, 1);
                newContact.otherDevices = appendToArray(newContact.otherDevices, netNode);
            } else {
                let devIndex = newContact.otherDevices && newContact.otherDevices.length > 0 ?
                    newContact.otherDevices.findIndex(netNode => netNode.hwAddress === hwAddress) : -1;
                if (devIndex >= 0) {
                    newContact.otherDevices.splice(devIndex, 1);
                    // Only one Presence device at most, so we move all presence devices to other before setting the
                    // netNode as the new "presence" device
                    if (newContact.presenceDevices && newContact.presenceDevices.length > 0)
                        newContact.otherDevices = newContact.otherDevices.concat(newContact.presenceDevices);
                    newContact.presenceDevices = [netNode];
                }
            }

            return {
                contact: newContact
            };
        });
    }

    onUserProvidedImage(event) {
        const self = this;
        const canvas = document.getElementById('canvas');
        const image = new Image();
        image.src = URL.createObjectURL(event.target.files[0]);
        image.onload = function () {
            const canvasContext = canvas.getContext('2d');
            const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
            const w = image.width * scale;
            const h = image.height * scale;
            const left = canvas.width / 2 - w / 2;
            const top = canvas.height / 2 - h / 2;

            canvasContext.drawImage(image, left, top, w, h);
            const dataURL = canvas.toDataURL("image/jpg");

            self.setState((prevState) => {
                const newContact = Object.assign(new Contact(), prevState.contact);
                newContact.imageURL = dataURL;
                return {
                    contact: newContact
                }
            })
        };
    }

    // --------------------------------------------------------------------------------

    dialogGoToDeviceStep() {
        const {contact} = this.state;
        if (!contact.contactId || !contact.contactName || !contact.contactType) {
            this.setState({formIncomplete: true});
            return;
        }

        this.setState({formIncomplete: false, wizardStep: WIZARD_STEP_SELECT_DEVICES});
    }

    saveContactWithNetNode(netNode){
        const {contact} = this.state;
        const newContact = contact;
        newContact.presenceDevices = [netNode];
        if (this.props.onConfirm){
            this.setState({formIncomplete: false, devicesIncomplete: false, wizardStep: WIZARD_STEP_USER_FORM});
            this.props.onConfirm(newContact);
        }
    }

    dialogSaveContact() {
        const {netNodes} = this.props;
        const {contact} = this.state;
        const isPresence = (dev) => DT_PRESENCE_TYPES.includes(dev.bestType);
        const nodes = netNodes.filter(netNode => !DT_PRESENCE_DISCARD_TYPES.includes(netNode.bestType)).sort((n1, n2) => {
            const p1 = isPresence(n1), p2 = isPresence(n2);
            return p1 === p2 ? 0 : p2 ? 1 : -1;
        });

        /*
        const available = nodes ? nodes.filter(netNode => !netNode.contactId || netNode.contactId === contact.contactId) : [];
        if(available.length === 1){
            const newContact = contact;
            newContact.presenceDevices = [available[0]];
            if (this.props.onConfirm){
                this.props.onConfirm(newContact);
            }
            this.setState({formIncomplete: false, devicesIncomplete: false, wizardStep: WIZARD_STEP_USER_FORM});
            return;
        }*/
        
        let hasPresenceDevices = contact.presenceDevices && contact.presenceDevices.length > 0;
        let hasOtherDevices = contact.otherDevices && contact.otherDevices.length > 0;
        
        if (!hasPresenceDevices && !hasOtherDevices) {
            this.setState({devicesIncomplete: true});
            return;
        }
        if (this.props.onConfirm)
            this.props.onConfirm(contact);
        this.setState({formIncomplete: false, devicesIncomplete: false, wizardStep: WIZARD_STEP_USER_FORM});
    }

    // --------------------------------------------------------------------------------

    render() {
        const {id, defaultContact} = this.props;
        const {wizardStep} = this.state;

        if (wizardStep === 1) {
            return <ModalDialog id={id} title={intl.get("presence_devices_dialog_title")} onClose={this.onCloseDialog}>
                {this.renderDevicePage()}
            </ModalDialog>
        } else {
            const title = defaultContact && defaultContact.contactName ?
                intl.get("presence_edit_dialog_title") : intl.get("presence_add_dialog_title");
            return <ModalDialog id={id} title={title} onClose={this.onCloseDialog}>
                {this.renderFormPage()}
            </ModalDialog>
        }
    }

    renderFormPage() {
        const {netNode} = this.props;
        const {contact, formIncomplete} = this.state;
        return <>
            <ModalDialogBody>
                {formIncomplete === true &&
                    <div className="mb-2"><span className="badge badge-soft-danger d-block">{intl.get("presence_error_incomplete")}</span></div>}
                {this.renderForm(contact)}
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={this.onCloseDialog} title={intl.get('generic_close')} type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK}/>
                <ActionButton 
                    action={netNode? () => this.saveContactWithNetNode(netNode) : this.dialogGoToDeviceStep} 
                    chevron="fa-arrow-right" 
                    title={intl.get('generic_continue')}/>
            </ModalDialogFooter>
        </>;
    }

    renderDevicePage() {
        const {contact, devicesIncomplete} = this.state;

        const {netNodes} = this.props;
        const contactId = contact ? contact.contactId : null;
        const goBack = () => {this.setState({wizardStep: WIZARD_STEP_USER_FORM})};

        const isPresence = (dev) => DT_PRESENCE_TYPES.includes(dev.bestType);
        const nodes = netNodes.filter(netNode => !DT_PRESENCE_DISCARD_TYPES.includes(netNode.bestType)).sort((n1, n2) => {
            const p1 = isPresence(n1), p2 = isPresence(n2);
            return p1 === p2 ? 0 : p2 ? 1 : -1;
        });
        const available = nodes ? nodes.filter(netNode => !netNode.contactId || netNode.contactId === contactId) : [];
        const assignedToOther = nodes ? nodes.filter(netNode => netNode.contactId && netNode.contactId !== contactId) : [];
        return <>
            <ModalDialogBody>
                {devicesIncomplete === true ?
                    <div className="mb-2"><span className="badge badge-soft-danger d-block">{intl.get("presence_edit_at_least_one_device")}</span></div> :
                    <div className="mb-2"><span className="small">{intl.get("presence_edit_multi_device")}</span></div>
                }
                <table className="table table-align-middle">
                    <tbody>
                        {available.map(netNode => this.renderNetNode(netNode, available.length === 1))}
                        {assignedToOther && assignedToOther.length > 0 && <tr><td colSpan={4} className="text-center">{intl.get("presence_edit_already_assigned_devices")}</td></tr>}
                        {assignedToOther && assignedToOther.map(netNode => this.renderNetNode(netNode))}
                    </tbody>
                </table>
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={goBack} title={intl.get('generic_back')} type={BTN_TYPE_GHOST}
                              tint={BTN_TINT_DARK}/>
                <ActionButton action={this.dialogSaveContact} title={intl.get('generic_save')}/>
            </ModalDialogFooter>
        </>;
    }

    renderForm(contact) {
        const contactPictureUrl = contact && contact.imageURL ? contact.imageURL : null;
        const contactName = contact && contact.contactName ? contact.contactName : null;
        const contactType = contact && contact.contactType ? contact.contactType : null;
        const isMale = contact && contact.gender === GND_MALE;
        const isFemale = contact && contact.gender === GND_FEMALE;
        const isOther = !isMale && !isFemale;

        const allowedContexts = this.props.netContext && NC_ALL_TYPES.includes(this.props.netContext) ?
            contactTypesMatching(null, this.props.netContext) : CT_ALL_TYPES;

        return (
            <form>
            <div className="row form-group">
                <label className="col-sm-3 col-form-label input-label">{intl.get("presence_profile_photo")} <span className="input-label-secondary">({intl.get("generic_optional")})</span></label>

                <div className="col-sm-9">
                    <div className="media align-items-center">
                        <label className="avatar avatar-lg avatar-circle mr-4" htmlFor="avatarUploader">
                            <canvas id="canvas" width="128" height="128" style={{border: "1px solid black", display: "none"}} />
                            <ContactAvatar
                                id="avatarImg"
                                size={AVT_SIZE_DEFAULT}
                                name={contactName}
                                url={contactPictureUrl}
                            />
                        </label>

                        <div className="media-body">
                            <div className="btn btn-xs btn-primary file-attachment-btn mb-2 mb-sm-0 mr-2">{intl.get("presence_upload_profile_photo")}
                                <input id="avatarUploader" type="file"
                                       className="js-file-attach file-attachment-btn-label"
                                       onChange={this.onUserProvidedImage}
                                       data-hs-file-attach-options='{
                                                  "textTarget": "#avatarImg",
                                                  "mode": "image",
                                                  "targetAttr": "src"
                                                  "allowTypes": [".png", ".jpeg", ".jpg"]
                                               }' />
                            </div>

                            <ActionButton action={this.onClearPicture} title={intl.get('generic_clear')} type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK}/>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="row form-group">*/}
            {/*    <label htmlFor="firstNameLabel" className="col-sm-3 col-form-label input-label">Full name <i className="far fa-question-circle text-body ml-1" data-toggle="tooltip" data-placement="top" title="Displayed on public forums, such as Front."/></label>*/}

            {/*    <div className="col-sm-9">*/}
            {/*        <div className="input-group">*/}
            {/*            <input type="text" className="form-control" name="firstName" id="firstNameLabel" placeholder="Clarice" aria-label="Clarice" value="Natalie" />*/}
            {/*            <input type="text" className="form-control" name="lastName" id="lastNameLabel" placeholder="Boone" aria-label="Boone" value="Curtis" />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="row form-group">
                <label htmlFor="displayNameLabel" className="col-sm-3 col-form-label input-label">{intl.get("presence_display_name")}</label>

                <div className="col-sm-9">
                    <input type="text" className="form-control"
                           name="displayName" id="displayNameLabel" placeholder="Clarice" aria-label="Clarice"
                           value={contactName || ""}
                           onChange={this.onContactNameInputChanged}
                    />
                </div>
            </div>

            <div className="row form-group">
                <label htmlFor="displayNameLabel" className="col-sm-3 col-form-label input-label">{intl.get("presence_contact_type")}</label>

                <div className="col-sm-9">
                    <ContactTypePicker allowedContexts={allowedContexts} contactType={contactType}
                                       className="z-index-9999 mt-1"
                                       onContactTypePicked={this.onContactTypePicked}/>
                </div>
            </div>

            <div className="row form-group">
                <label className="col-sm-3 col-form-label input-label">{intl.get("presence_gender")} <span className="input-label-secondary">({intl.get("generic_optional")})<i className="far fa-question-circle text-body ml-1" data-toggle="tooltip" data-placement="top" title={intl.get("presence_gender_explanation")}/></span></label>

                <div className="col-sm-9">
                    <div className="input-group input-group-md-down-break">
                        <div className="form-control">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input"
                                       name="genderTypeRadio" id="genderTypeRadio1" checked={isMale} onChange={this.onMaleGenderSelected}/>
                                <label className="custom-control-label" htmlFor="genderTypeRadio1">{intl.get("gender_male")}</label>
                            </div>
                        </div>

                        <div className="form-control">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input"
                                       name="genderTypeRadio" id="genderTypeRadio2" checked={isFemale} onChange={this.onFemaleGenderSelected} />
                                <label className="custom-control-label" htmlFor="genderTypeRadio2">{intl.get("gender_female")}</label>
                            </div>
                        </div>

                        <div className="form-control">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input"
                                       name="genderTypeRadio" id="genderTypeRadio3" checked={isOther} onChange={this.onOtherGenderSelected}/>
                                <label className="custom-control-label" htmlFor="genderTypeRadio3">{intl.get("gender_other")}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        );
    }

    /**
     * Renders a NetNode.
     *
     * @param {NetNode} netNode
     * @return {JSX.Element}
     */
    renderNetNode(netNode, assigned) {
        const {contact} = this.state;

        const isPresenceDevice = netNode.hwAddress &&
            contact && contact.presenceDevices &&
            contact.presenceDevices.find(dev => dev.hwAddress === netNode.hwAddress);

        const isOtherDevice = netNode.hwAddress &&
            contact && contact.otherDevices &&
            contact.otherDevices.find(dev => dev.hwAddress === netNode.hwAddress);

        const nodeIsAssignedToCurrentContact = assigned || isPresenceDevice || isOtherDevice;
        const nodeIsAssignedToOtherContact = netNode.contactId && netNode.contactId !== contact.contactId;

        const name = netNode.bestName || netNode.hwAddress;
        const makeAndModel = netNode.getBestMakeAndModelAsArray().join("•") || netNode.ipAddresses[0];
        return (
            <tr key={`row_${netNode.hwAddress}`}>
                <td className="px-0">
                    {
                        nodeIsAssignedToOtherContact ?
                            <input key={`checkbox_${netNode.hwAddress}`}
                                   type="checkbox"
                                   data-hwaddress={netNode.hwAddress}
                                   checked={true}
                                   onChange={null}
                                   disabled={true}/> :
                            <input key={`checkbox_${netNode.hwAddress}`}
                                   type="checkbox"
                                   data-hwaddress={netNode.hwAddress}
                                   checked={nodeIsAssignedToCurrentContact}
                                   onChange={this.onDeviceSelected}
                            />
                    }
                </td>
                <td style={{width: "3rem"}} className="text-center">
                    <DeviceTypeIcon type={netNode.bestType || DT_GENERIC} />
                </td>
                <td>
                    <div className="text-dark">{name}</div>
                    <div>{makeAndModel}</div>
                </td>
                <td className="text-right">
                    {isPresenceDevice ?
                        <a style={{cursor: "pointer"}}
                           data-hwaddress={netNode.hwAddress}
                           onClick={this.onDeviceTogglePresence}><StatusBadge label={intl.get("presence_badge_tracking")} className="badge-primary" /></a> :
                        isOtherDevice ?
                            <a style={{cursor: "pointer"}}
                               data-hwaddress={netNode.hwAddress}
                               onClick={this.onDeviceTogglePresence}><StatusBadge label={intl.get("presence_badge_other")} className="badge-secondary" /></a> :
                        netNode.isDown() ?
                            <StatusBadge label={intl.get("generic_offline")} className="badge-soft-secondary" /> : ""}
                </td>
            </tr>
        )
    }
}