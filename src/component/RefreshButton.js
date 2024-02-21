/**
 * Created by marco on 17/11/2019.
 *
 * (C) Copyright Fing
 */

import React, { Component } from 'react';
import intl from 'react-intl-universal';
import ActionButton, { BTN_TYPE_GHOST, BTN_SIZE_BIG, BTN_TINT_PRIMARY } from './ActionButton';

export default class RefreshButton extends Component {

    render() {
        const { action, running, disabled } = this.props;

        return (
            <ActionButton
                action={action}
                title={intl.get('generic_refresh')}
                running={running}
                disabled={disabled}
                icon={"fas fa-redo mr-1"}
                size={BTN_SIZE_BIG}
                type={BTN_TYPE_GHOST}
                tint={BTN_TINT_PRIMARY}/>
        );
    }

}
