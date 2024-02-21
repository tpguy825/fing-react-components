import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, { ModalDialogBody } from '../../../component/ModalDialog';
import DeviceTypes from '../../../assets/json/device_types.json';
import { TINT_DARK, TINT_WHITE } from '../../../model/Constants';
import DeviceTypeIcon from '../../../component/icons/DeviceTypeIcon';
import LinkCard from '../../tools/LinkCard';
import Badge, { BADGE_TINT_PRIMARY } from '../../../component/Badge';


const SORT_GROUPS = [
    "Automatic",
    "Mobile",
    "Audio & Video",
    "Home & Office",
    "Smart Home",
    "Network",
    "Server",
    "Engineering",
    "Industrial"
];

export default class DeviceDetailIconPickerDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.onChangeDeviceType = this.onChangeDeviceType.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.state = {
            searchText: '',
            groupSelected: []
        }
    }
    onCloseDialog() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }
    onChangeDeviceType(type) {
        if (this.props.onChangeDeviceType) {
            this.props.onChangeDeviceType(type);
        }
    }

    

    render() {
        const {id} = this.props;

        const onChangeDeviceName = () => {
            const text = this.deviceInput.value;
            this.setState({searchText: text});
        }


        return <ModalDialog id={id} title={intl.get('device_detail_icon_picker_title')} onClose={this.onCloseDialog}>
            <ModalDialogBody>
                <div className="form-group">
                    <input id="deviceInput"
                        ref={(input) => this.deviceInput = input}
                        onChange={onChangeDeviceName}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder={intl.get('device_detail_icon_picker_hint')}
                    />
                </div>
                {this.renderBadges()}
                {this.renderSections()}
            </ModalDialogBody>
        </ModalDialog>;
    }

    renderSections(){
        let groups = []
        if(this.state.groupSelected.length > 0){
            this.state.groupSelected.forEach(val=>groups.push(val));
        } else {
            Object.keys(DeviceTypes).forEach(key => {
                if(this.state.searchText !== ''){
                    if(DeviceTypes[key]['caption'].toUpperCase().includes(this.state.searchText.toUpperCase()) && 
                    DeviceTypes[key]['group'] !== '' && !groups.includes(DeviceTypes[key]['group'])){
                        groups.push(DeviceTypes[key]['group']);
                    }
                } else { 
                    groups = SORT_GROUPS;
                }
            });
        }

        if(groups.length === 0){
            return this.props.emptyState;
        }
        
        return groups.map(val=>{
            return (
                <section className="my-2">
                    <h5 className="mb-0">{val}</h5>
                    {React.Children.toArray(this.renderTableDevices(val))}
                    <hr/>
                </section>
            )
        })
    }

    renderTableDevices(group){
        const {deviceType} = this.props;

        let devices = []
        Object.keys(DeviceTypes).forEach(key => {
            if(this.state.searchText !== ''){
                if(DeviceTypes[key]['caption'].toUpperCase().includes(this.state.searchText.toUpperCase()) && 
                DeviceTypes[key]['group'] !== '' && DeviceTypes[key]['group'] === group){
                    devices.push(DeviceTypes[key]);
                }
            } else { 
                if(DeviceTypes[key]['group'] !== '' && DeviceTypes[key]['group'] === group){
                    devices.push(DeviceTypes[key]);
                }
            }
            
        });
        devices = devices.filter((v,i,a)=>a.findIndex(v2=>(v2.caption===v.caption))===i)

        const tableDevices = [];
        for (let i = 0; i < devices.length; i += 4) {
            
            tableDevices.push(
                <div className="row">
                    {React.Children.toArray(devices.slice(i, i + 4).map(val=>{
                        let type = val['name'].toUpperCase();
                        
                        const bgColor = deviceType !== type || val['caption'] === 'Automatic' ? "" : "bg-primary";
                        const tint = deviceType !== type || val['caption'] === 'Automatic' ? TINT_DARK : TINT_WHITE;
                        const textColor = deviceType !== type || val['caption'] === 'Automatic' ? "text-dark" : "text-white";
                        const onChangeDeviceType = () =>  this.onChangeDeviceType(val);
                        
                        return (
                            <div className="col-3">
                                <LinkCard action={onChangeDeviceType}>
                                    <div style={{borderRadius: "12px"}} className={"d-block px-auto p-2 m-2 " + bgColor}>
                                        <DeviceTypeIcon className="text-center" size={36} type={val['name'].toUpperCase()} tint={tint}/>
                                        <p className={"mb-0 small text-center " + textColor}>{val['caption']}</p>
                                    </div>
                                </LinkCard>
                                
                            </div>
                            
                        )
                    }))}
                </div>
            );
        }
        if(tableDevices.length === 0){
            return this.props.emptyState;
        }
        return tableDevices;
    }

    renderBadges(){
        const groups = [];
        if(this.state.groupSelected.length > 0){
            this.state.groupSelected.forEach(val=>groups.push(val));
        }
        Object.keys(DeviceTypes).forEach(key => {
            if(this.state.searchText !== ''){
                if(DeviceTypes[key]['caption'].toUpperCase().includes(this.state.searchText.toUpperCase()) && 
                DeviceTypes[key]['group'] !== '' && !groups.includes(DeviceTypes[key]['group'])){
                    groups.push(DeviceTypes[key]['group']);
                }
            } else { 
                if(DeviceTypes[key]['group'] !== '' && !groups.includes(DeviceTypes[key]['group'])){
                    groups.push(DeviceTypes[key]['group']);
                }
            }
        });

        groups.sort((a, b) => a.localeCompare(b));

        return groups.map(val=>{
            const onClickBadge = () => {
                const {groupSelected} = this.state;
                let newGroupSelected = [];
        
                if(groupSelected.includes(val)){
                    groupSelected.forEach(group => {
                        if(val !== group){
                            newGroupSelected.push(group);
                        }
                    })
                } else {
                    newGroupSelected = groupSelected;
                    newGroupSelected.push(val);
                }
                this.setState({groupSelected: newGroupSelected});
            }            
            return (
                <a role="button" onClick={onClickBadge}>
                    <Badge className="m-2" pill text={val} tint={BADGE_TINT_PRIMARY} soft={!this.state.groupSelected.includes(val)}/>
                </a>
            )
        })
    }

}
