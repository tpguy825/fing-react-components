/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

 import React, {Component} from 'react';
 import PropTypes from 'prop-types';
 
 // Re-usable functions to programmatically show/hide the dialog with the given HTML element ID
 // Only one modal dialog can be displayed in a page, at any given time
 export const showDialogById = (name) => { window.$(`#${name}`).modal('show'); };
 export const hideDialogById = (name) => { window.$(`#${name}`).modal('hide'); };
 
 /**
  * Standard modal dialog.
  */
 export default class ModalDialog extends Component {
     componentDidMount() {
         /**
          * IMPORTANT MODAL LIFECYCLE NOTE
          * 
          * Simply using onClose isn't sufficient because it's registered only to the header close button,
          * so when the user clicks the backdrop the managing component would not be notified.
          * A check could be added to run the onClose whenever this happens by means of a flag in the close
          * button handler. However this works until EVERY non-header close is a backdrop close, a fact that can't
          * be guaranteed. For instance, a common use case is adding a close button to the footer as well that
          * registers to the same onClose callback. In that case the onClose would be ran two times, a circumstance
          * that can range from irrelevant, say, a simple request for hideDialogById that is idempotent and functionally
          * equivalent, to disastrous ones such as sending a doubled analytics event.
          * To prevent that, since the dialog must be closed manually most (but not all) the times, the onClose should
          * be used for such cosmetic jobs. Point is, the onClose should be renamed to something in the likes of 
          * requestDialogClose as it's the user responsibility to do so, how and what, but to exclude breaking changes 
          * this can't be easily done. 
          * So a second callback prop is added, named onHide, to safely manage the proper callback-like situations like 
          * sending events or data remotely, that acts more like your typical onClose behavior.
          * 
          * To summarize: use onClose to register the associated hideDialogById call and onHide to do stuff as a
          * consequence of the modal closing itself
          */
        window.$(`#${this.props.id}`).on("hide.bs.modal", () => {
            if (this.props.onHide) {
                this.props.onHide();
            }
        });

        window.$(`#${this.props.id}`).on("show.bs.modal", () => {
            if (this.props.onShow) {
                this.props.onShow();
            }
        });
     }

     componentWillUnmount() {
         window.$(`#${this.props.id}`).unbind("hide.bs.modal");
         window.$(`#${this.props.id}`).unbind("show.bs.modal");
     }


    render() {
        const {
            id, className, headerClassName, size, title, onClose, subtitle, centerVertically, onClick, centerTitle, scrollable
        } = this.props;
        const headerClass = headerClassName || '';
        const outerClass = className || '';
        const sizeClass = size || '';
        const centeringClass = centerVertically ? "modal-dialog-centered" : "";
        const titleCenteringClass = centerTitle ? "w-100 text-center" : "";
        const showCloseButton = onClose !== null && onClose !== undefined;
        const isScrollable = scrollable !== undefined ? scrollable : true;

        return (
            <div id={id} className={`modal fade ${outerClass}`} tabIndex="-1" role="dialog" aria-modal={true}
                aria-labelledby="modalDialogLabel" aria-hidden="true" data-backdrop="true">
                <div className={`modal-dialog ${isScrollable ? "modal-dialog-scrollable" : ""} ${centeringClass} ${sizeClass}`} role="document" onClick={onClick}>
                    <div className="modal-content">
                        <ModalDialogHeader 
                            className={headerClass}
                            subtitle={subtitle}
                            showCloseButton={showCloseButton}
                            title={title}
                            titleCenteringClass={titleCenteringClass}
                            onClose={onClose}/>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

    

}

export class ModalDialogHeader extends Component {

    render() {
        const {className, showCloseButton, subtitle, title, titleCenteringClass, onClose} = this.props;
        if(title || showCloseButton){
            return (
                <div className={`modal-header ${className}`}>
                    <h5 className={`modal-title ${titleCenteringClass}`} id="modalDialogLabel">{title}</h5>
                    <p>{subtitle}</p>
                    {showCloseButton && this.renderCloseButton(onClose)}
                </div>
            )
        }
        return '';
        
    }
    renderCloseButton(onClose){
        return <button type="button" className="btn btn-xs btn-icon btn-soft-secondary"
            data-dismiss="modal" aria-label="Close" onClick={onClose}>
            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                    d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"/>
            </svg>
        </button>;
    }
}

/**
 * Standard modal dialog body.
 */
export class ModalDialogBody extends Component {

    render() {
        const {className, noPadding} = this.props;
        return (
            <div className={`${className || ''} modal-body ${noPadding ? "" : "py-3"}`}>
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}

/**
 * Standard modal dialog footer.
 */
export class ModalDialogFooter extends Component {

    render() {
        const {className, noPadding} = this.props;
        return (
            <div className={`${className || ''} modal-footer ${noPadding ? "p-0 b-0" : "py-3"}`}>
                {React.Children.toArray(this.props.children)}
            </div>
        )
    }
}

ModalDialog.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,   // Click on the entire dialog
    onClose: PropTypes.func,   // Close button on dialog header
    onHide: PropTypes.func,    // Runs when the dialog is hidden after a explicit/implicit close
    size: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    centerTitle: PropTypes.bool,
    centerVertically: PropTypes.bool,
    scrollable: PropTypes.bool
};