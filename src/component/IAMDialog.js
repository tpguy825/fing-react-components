import React from "react";
import PropTypes from 'prop-types';
import ModalDialog, { ModalDialogBody, ModalDialogFooter } from "./ModalDialog";
import ActionButton, { BTN_SIZE_JUMBO, BTN_TINT_DARK, BTN_TYPE_GHOST } from "./ActionButton";
import IAMStyle from "../model/iam/IAMStyle";

export default class IAMDialog extends React.Component {
    render() {
        const onAction = action => {
            this.props.onAction && this.props.onAction(action);
            this.props.onClose && this.props.onClose();
        };

        const messageStyle = this.props.message;
        const layout = messageStyle.layout;

        if (layout === IAMStyle.IAMLayout.SIDE_BANNER) {
            return null;
        }

        const DialogComponent = this.getDialogComponentForLayout(layout);

        let dialogProps = {
            id: this.props.id,
            onClose: this.props.onClose,
            onHide: this.props.onHide,
            onAction: onAction,
            image: messageStyle.image,
            buttonAction: messageStyle.primaryButton && messageStyle.primaryButton.action
        };

        if (layout !== IAMStyle.IAMLayout.IMAGE) {
            dialogProps.title = messageStyle.title;
            dialogProps.text = messageStyle.body;
        }

        if (layout !== IAMStyle.IAMLayout.TOP_BANNER) {
            dialogProps.buttonTitle = messageStyle.primaryButton.text;
        }

        return <DialogComponent {...dialogProps} />;
    }

    getDialogComponentForLayout(layout) {
        if (layout === IAMStyle.IAMLayout.MODAL) {
            return Modal;
        } else if (layout === IAMStyle.IAMLayout.IMAGE) {
            return Image;
        } else if (layout === IAMStyle.IAMLayout.CARD) {
            return Card;
        } else if (layout === IAMStyle.IAMLayout.TOP_BANNER) {
            return TopBanner;
        }

        return null;
    }
}

class Modal extends React.Component {
    render() {    
        return <ModalDialog 
            id={this.props.id} 
            title={this.props.title}
            onHide={this.props.onHide}
            centerVertically
            centerTitle
        >
            <hr className="w-100 b-0 mb-0" />
            <ModalDialogBody noPadding className="text-center overflow-hidden p-3">
                <img className="bg-img-start w-100 mb-3" src={this.props.image} />
                {this.props.text}
            </ModalDialogBody>
            <DialogButtons 
                onClose={this.props.onClose}
                onAction={this.props.onAction} 
                actionTitle={this.props.buttonTitle} 
                action={this.props.buttonAction} 
            />
        </ModalDialog>;
    }
}

class Image extends React.Component {
    render() {
        return <ModalDialog 
            id={this.props.id}
            onHide={this.props.onHide}
            centerVertically
            centerTitle
        >
            <ModalDialogBody noPadding className="text-center overflow-hidden p-0">
                <img className="bg-img-start w-100" src={this.props.image} />
            </ModalDialogBody>
            <DialogButtons 
                onClose={this.props.onClose}
                onAction={this.props.onAction} 
                actionTitle={this.props.buttonTitle} 
                action={this.props.buttonAction} 
            />
        </ModalDialog>;
    }
}

class Card extends React.Component {
    render() {
        return <ModalDialog 
            id={this.props.id}
            onHide={this.props.onHide}
            centerVertically
            centerTitle
        >
            <div className="card bg-light">
                <img className="card-img-top" src={this.props.image}/>
                <div className="card-body">
                    <h3 className="card-title mb-2">{this.props.title}</h3>
                    <p className="card-text">{this.props.text}</p>
                </div>
            </div>
            <DialogButtons 
                onClose={this.props.onClose}
                onAction={this.props.onAction} 
                actionTitle={this.props.buttonTitle} 
                action={this.props.buttonAction} 
            />
        </ModalDialog>;
    }
}

class TopBanner extends React.Component {
    render() {
        return <ModalDialog 
            id={this.props.id}
            onHide={this.props.onHide}
            onClick={this.props.onAction ? () => this.props.onAction(this.props.buttonAction) : undefined}
        >
            <ModalDialogBody noPadding className="container bg-dark p-3">
                <div className="row overflow-hidden">
                    <img className="col-2 pr-0" src={this.props.image} />
                    <div className="col-10">
                        <h5 className="modal-title text-light mb-1">{this.props.title}</h5>
                        <p className="text-white h6">{this.props.text}</p>
                    </div>
                </div>
            </ModalDialogBody>
        </ModalDialog>;
    }
}

class DialogButtons extends React.Component {
    render() {
        let onAction = null;

        if (this.props.onAction) {
            onAction = () => {
                this.props.onAction(this.props.action);
            };
        }

        return <ModalDialogFooter noPadding className="btn-group">
            <ActionButton 
                className="border-right m-0 rounded-0 p-3" 
                action={this.props.onClose} 
                title="Close" 
                type={BTN_TYPE_GHOST} 
                tint={BTN_TINT_DARK} 
                size={BTN_SIZE_JUMBO}
            />
            <ActionButton 
                className="m-0 rounded-0 p-3"
                action={onAction} 
                title={this.props.actionTitle}
                type={BTN_TYPE_GHOST} 
                size={BTN_SIZE_JUMBO}
            />
        </ModalDialogFooter>;
    }
}

IAMDialog.propTypes = {
    id: PropTypes.string,
    message: PropTypes.object,
    onAction: PropTypes.func,
    onClose: PropTypes.func,
    onHide: PropTypes.func
};