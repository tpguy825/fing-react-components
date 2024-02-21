/**
 * Created by marco on 3/19/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ModalDialogInfoNote extends Component {

    render() {
        const iconClass = this.props.icon || "fa-info-circle";
        const text = this.props.text || "";
        return <div className="alert alert-soft-info media d-flex align-items-center small" role="alert">
            <i className={`fas ${iconClass} mt-1 mr-2`}/>
            <div className="media-body" role="alert">
                {text}
            </div>
        </div>
    }

}

ModalDialogInfoNote.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string
}