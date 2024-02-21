import intl from 'react-intl-universal';
import React, { Component } from 'react';
import ModalDialog, { ModalDialogBody, ModalDialogFooter } from '../../../component/ModalDialog';
import EmptyState from '../../../component/EmptyState';
import StatusIcon, {
    SI_SHAPE_CIRCLE,
    SI_STATUS_SUCCESS,
    SI_STATUS_ERROR
} from '../../../component/icons/StatusIcon';
import ActionButton from '../../../component/ActionButton';

export default class WakeOnLanDialog extends Component {
    
    constructor(props, context) {
        super(props, context);
        this.onCloseDialog = this.onCloseDialog.bind(this);
    }
    
    onCloseDialog() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const { responseWOL, id, PacketSent } = this.props;
        if(!responseWOL) return ''
        if(responseWOL.woken){
            return (
                <ModalDialog id={id} title={intl.get('generic_completed')} onClose={this.onCloseDialog}>
                    <ModalDialogBody>
                        <EmptyState
                            title={
                                <div className="d-flex align-items-center justify-content-center my-3">
                                    <StatusIcon 
                                        shape={SI_SHAPE_CIRCLE} 
                                        status={SI_STATUS_SUCCESS} 
                                        pulse={true}/>
                                    <h3 className="ml-2 mb-0">{intl.get('device_detail_wol_modal_title_success')}</h3>
                                </div>
                            }
                            image={PacketSent}
                            caption={intl.get('device_detail_wol_success')}
                            subtitle={intl.get('device_detail_wol_success')}/>
                    </ModalDialogBody>
                    <ModalDialogFooter>
                        <ActionButton
                            action={this.onCloseDialog}
                            title={'OK'}/>
                    </ModalDialogFooter>
                </ModalDialog>
            )
        }
        
        return <ModalDialog id={id} title={intl.get('generic_failed')} onClose={this.onCloseDialog}>
            <ModalDialogBody>
                <EmptyState
                    title={
                        <div className="d-flex align-items-center justify-content-center my-3">
                            <StatusIcon 
                                shape={SI_SHAPE_CIRCLE} 
                                status={SI_STATUS_ERROR} 
                                pulse={true}/>
                            <h3 className="ml-2 mb-0">{intl.get('device_detail_wol_modal_title_fail')}</h3>
                        </div>
                    }
                    image={PacketSent}
                    subtitle={intl.get('device_detail_wol_failed')}/>
            </ModalDialogBody>
        </ModalDialog>;
    }
}