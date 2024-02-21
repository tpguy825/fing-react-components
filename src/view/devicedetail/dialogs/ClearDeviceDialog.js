import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, { ModalDialogBody, ModalDialogFooter } from '../../../component/ModalDialog';
import ActionButton, {
    BTN_TYPE_LINK,
    BTN_TINT_DANGER
} from '../../../component/ActionButton';

export default class ClearDeviceDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(){
        if(this.props.onDelete){
            this.props.onDelete();
        }
    }
    onCloseDialog() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const {id, title} = this.props;


        return <ModalDialog id={id} title={title || ''} onClose={this.onCloseDialog}>
            <ModalDialogBody>
                {intl.getHTML('device_detail_delete_modal_body')}
                <div className="small text-muted my-2">
                    <span className="fas fa-info-circle fa-fw mr-2"/>
                    {intl.get('device_detail_delete_modal_body_small')}
                </div>
            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton 
                    action={this.onCloseDialog} 
                    title={intl.get('generic_close')}
                    type={BTN_TYPE_LINK}/>
                <ActionButton 
                    action={this.onDelete} 
                    tint={BTN_TINT_DANGER}
                    title={intl.get('generic_clear')}/>
            </ModalDialogFooter>
        </ModalDialog>;
    }

}
