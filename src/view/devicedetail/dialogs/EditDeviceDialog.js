import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, { ModalDialogBody, ModalDialogFooter } from '../../../component/ModalDialog';
import ActionButton, {
    BTN_TYPE_LINK
} from '../../../component/ActionButton';
import Select from 'react-select';
import NetNode from '../../../model/NetNode';

export default class EditDeviceDialog extends Component {
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            customLocation: '',
            setOfLocations: [
                { value: "DEFAULT", label: intl.get('device_place_Default') },
                { value: "LIVING_ROOM", label: intl.get('device_place_Living_Room') },
                { value: "DINING_ROOM", label: intl.get('device_place_Dining_Room') },
                { value: "BEDROOM", label: intl.get('device_place_Bedroom') },
                { value: "BATHROOM", label: intl.get('device_place_Bathroom') },
                { value: "KITCHEN", label: intl.get('device_place_Kitchen') },
                { value: "STUDY", label: intl.get('device_place_Study') },
                { value: "BASEMENT", label: intl.get('device_place_Basement') },
                { value: "CELLAR", label: intl.get('device_place_Cellar') },
                { value: "HALLWAY", label: intl.get('device_place_Hallway') },
                { value: "LAUNDRY_ROOM", label: intl.get('device_place_Laundry Room') },
                { value: "RECREATION_ROOM", label: intl.get('device_place_Recreation Room') },
                { value: "POOL", label: intl.get('device_place_Pool') },
                { value: "GYM", label: intl.get('device_place_Gym') },
                { value: "GARAGE", label: intl.get('device_place_Garage') },
                { value: "GARDEN", label: intl.get('device_place_Garden') },
                { value: "CLOSET", label: intl.get('device_place_Closet') },
                { value: "OFFICE", label: intl.get('device_place_Office') },
                { value: "UTILITY_ROOM", label: intl.get('device_place_Utility Room') },
                { value: "LOBBY", label: intl.get('device_place_Lobby') },
                { value: "SAFE_ROOM", label: intl.get('device_place_Safe Room') },
                { value: "GENERIC_INDOORS", label: intl.get('device_place_Indoors') },
                { value: "GENERIC_OUTDOORS", label: intl.get('device_place_Outdoors') }
            ],
        }
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    onSave(){
        let newDevice = this.props.device instanceof NetNode ? new NetNode() : {};

        newDevice = Object.assign(newDevice, this.props.device);
        newDevice.customName = this.netNameInput.value;
        newDevice.customNote = this.netNotesInput.value;
        newDevice.customLocation = this.state.customLocation;
        
        if(this.props.onSave){
            this.props.onSave(newDevice);
        }
    }
    onCloseDialog() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const {id, title, device} = this.props;
        const {setOfLocations} = this.state;

        const handleChange = (selectedLocation) => {
            const { setOfLocations } = this.state;
            const location = setOfLocations.find(loc => loc.value === selectedLocation.value);
            this.setState({customLocation: location.value});
        }        

        const reactSelectStyles = {
            indicatorsContainer: (base, state) => ({
                ...base,
                marginBottom: "8px",
            }),
            indicatorSeparator: (base, state) => ({
                ...base,
                backgroundColor: "transparent",
            }),
            container: (base, state) => ({
                ...base,
                backgroundColor: "transparent",
                zIndex: "999"
            })
        };

        const name = device && device.customName ? device.customName : '';
        const notes = device && device.customNote ? device.customNote : '';
        let customLocation = device && device.customLocation ? setOfLocations.filter(location => location.value === device.customLocation)[0] : setOfLocations[0];
        if(this.state.customLocation){
            customLocation = setOfLocations.filter(location => location.value === this.state.customLocation)[0]
        }

        return <ModalDialog id={id} title={title || ''} onClose={this.onCloseDialog}>
            <ModalDialogBody>
                <form>
                    <div className="form-group">
                        <label htmlFor="netLocationInput">
                            {intl.get('device_detail_edit_modal_placementinput_label')}
                        </label>
                        <Select
                            styles={reactSelectStyles}
                            value={customLocation}
                            onChange={(selectedLocation) => handleChange(selectedLocation)}
                            options={setOfLocations}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="netNameInput">
                            {intl.get('generic_name')}
                        </label>
                        <input id="netNameInput"
                            ref={(input) => this.netNameInput = input}
                            type="text"
                            className="form-control form-control-sm"
                            aria-describedby="netNameHelp"
                            placeholder={intl.get('device_detail_edit_modal_nameinput_placeholder')}
                            defaultValue={name}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="netNotesInput">
                            {intl.get('device_detail_edit_modal_notesinput_label')}
                        </label>
                        <textarea id="netNotesInput"
                            ref={(input) => this.netNotesInput = input}
                            type="text"
                            rows="3"
                            className="form-control form-control-sm"
                            aria-describedby="netNotesHelp"
                            placeholder={intl.get('device_detail_edit_modal_notesinput_placeholder')}
                            defaultValue={notes}
                        />
                    </div>
                </form>
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton 
                    action={this.onCloseDialog} 
                    title={intl.get('generic_close')} 
                    type={BTN_TYPE_LINK}/>
                <ActionButton 
                    action={this.onSave} 
                    title={intl.get('generic_save')}/>
            </ModalDialogFooter>
        </ModalDialog>;
    }

}
