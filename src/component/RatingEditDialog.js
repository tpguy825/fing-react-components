import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, {ModalDialogBody, ModalDialogFooter} from "./ModalDialog";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "./ActionButton";
import RatingBar, {RB_LARGE} from './RatingBar';
import PropTypes from 'prop-types';
import {
    TINT_WARNING,
    TINT_SUCCESS,
    TINT_PRIMARY,
    TINT_NAVY,
    TINT_DANGER
} from '../model/Constants';
import {RTI_BOLT, RTI_DOT, RTI_HEART, RTI_STAR} from './icons/RatingTypeIcon';

export default class RatingEditDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClearDialog = this.onClearDialog.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onConfirmDialog = this.onConfirmDialog.bind(this);

        this.state = {
            value: this.props.value || 0, 
            comment: this.props.comment || ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value || prevProps.comment !== this.props.comment) {
            this.setState({
                value: this.props.value || 0, comment: this.props.comment || ''
            });
        }
    }

    onClearDialog() {

        this.setState({
            value: 0, comment: ''
        });
        if (this.props.onClear) {
            this.props.onClear();
        }
    }

    onCloseDialog() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    onConfirmDialog() {
        if (this.props.onConfirm) {
            this.props.onConfirm({
                name: this.props.subjectName,
                value: this.getCurrentValue(),
                comment: this.getCurrentComment()
            });
        }
    }

    getCurrentValue() {
        return this.state.value ;
    }

    getCurrentComment() {
        return this.state.comment;
    }

    render() {
        const {id, subjectName} = this.props;
        return <ModalDialog id={id}
                            title={intl.get("rating_title", {ispName: subjectName || ''})}
                            onClose={this.onCloseDialog}>
            <ModalDialogBody>
                {this.renderBody()}
            </ModalDialogBody>
            <ModalDialogFooter className="border-0">
                <ActionButton action={this.onClearDialog} title={intl.get('generic_clear')}
                              type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} className="mr-auto"/>
                <ActionButton action={this.onCloseDialog} title={intl.get('generic_close')}
                              type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK}/>
                <ActionButton action={this.onConfirmDialog} title={intl.get('generic_save')} disabled={this.getCurrentValue() === 0}/>
            </ModalDialogFooter>
        </ModalDialog>;
    }

    renderImage() {
        const {subjectImageBanner, subjectImageLogo, subjectName} = this.props;
        return (
            <div className="align-middle">
                <img src={subjectImageLogo || subjectImageBanner}
                    height="96"
                    width={subjectImageLogo ? 96 : 192}
                    className="m-4"
                    alt={subjectName || ''}
                />
            </div>
        );
    }

    renderBody(title,message) {
        const {ratingColor, type, id} = this.props;
        const {comment, value} = this.state;
        return (
            <form>
                <div className="form-group text-center justify-content-center">
                    {this.renderImage()}
                    {title && 
                        <h3 className={'m-2'}>{title}</h3>}
                    <div className="d-flex justify-content-center">
                        <RatingBar onRatingChanged={(newRating) => {
                            this.setState({value: newRating})
                        }}
                                   editable={true}
                                   tint={ratingColor}
                                   length={5}
                                   value={value}
                                   type={type}
                                   size={RB_LARGE}/>
                    </div>
                    <hr className="mx-4" />
                    {message ? 
                        <h5 className={'m-2'}>{message}</h5> :
                        <div className={'m-2'}>{intl.get(this.getMessage())}</div>}
                    <textarea 
                        id={id}
                        onChange={(input) => this.setState({comment: input.target.value})}
                        rows="3"
                        value={comment}
                        className="form-control form-control-sm"
                        placeholder={intl.get('rating_comments')}/>

                </div>
            </form>
        )
    }

    getMessage() {
        switch (this.getCurrentValue()) {
            case 1:
                return "rating_hate_because";
            case 2:
                return "rating_dislike_because";
            case 3:
                return "rating_ok_because";
            case 4:
                return "rating_like_because";
            case 5:
                return "rating_love_because";
        }
        return "waiting_rate";
    }
}

RatingEditDialog.propTypes = {
    id: PropTypes.string,
    value: PropTypes.number,
    comment: PropTypes.string,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    onClear: PropTypes.func,
    subjectImageLogo: PropTypes.string,
    subjectImageBanner: PropTypes.string,
    type: PropTypes.oneOf([RTI_HEART, RTI_BOLT, RTI_STAR, RTI_DOT]),
    ratingColor: PropTypes.oneOf([TINT_DANGER, TINT_NAVY, TINT_PRIMARY, TINT_SUCCESS, TINT_WARNING]),
};