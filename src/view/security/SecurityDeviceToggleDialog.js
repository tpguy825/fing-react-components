/**
 * Created by marco on 5/1/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import ModalDialog, { ModalDialogBody, ModalDialogFooter } from '../../component/ModalDialog';
import ActionButton, { BTN_TINT_DARK, BTN_TINT_PRIMARY, BTN_TYPE_GHOST, BTN_TYPE_SOFT } from '../../component/ActionButton';
import DeviceTypeIcon from '../../component/icons/DeviceTypeIcon';
import { DT_GENERIC } from '../../model/Constants';

/**
 * A generic dialog to toggle a property on/off, based on an external function that extracts and changes the
 * setting.
 */
export default class SecurityDeviceToggleDialog extends Component {

    constructor(props, context) {
        super(props, context);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onConfirmDialog = this.onConfirmDialog.bind(this);
        this.onNodePropertyChanged = this.onNodePropertyChanged.bind(this);

        if (this.props.netNodes && this.props.values) {
            this.state = {
                values: Object.assign({}, this.props.values),
                disabled: Object.assign({}, this.props.disabled)
            };
        } else {
            this.state = {values: {}, disabled: {} };
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const x = prevProps.values;
        const y = this.props.values;

        // Refresh state only if some value actually changes
        const hasSameKeyCount = Object.keys(x).length === Object.keys(y).length;
        const hasSameValues = Object.keys(x).reduce((isEqual, key) => isEqual && x[key] === y[key], true);
        if (!hasSameKeyCount || !hasSameValues) {
            this.setState({
                values: Object.assign({}, this.props.values),
                disabled: Object.assign({}, this.props.disabled)
            });
        }
    }

    onCloseDialog() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    onConfirmDialog() {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.state.values);
        }
    }

    // --------------------------------------------------------------------------------

    render() {
        const {id, netNodes, title, body, selectAllEnabled, deselectAllEnabled} = this.props;
        const {values, disabled} = this.state;

        const toggleAll = (newValue) => {
            this.setState((prevState) => {
                for (let key in prevState.values) {
                    if (prevState.values.hasOwnProperty(key)) {
                        prevState.values[key] = newValue;
                    }
                }
                return {values: prevState.values};
            })
        };

        return <ModalDialog id={id} title={title || ''} onClose={this.onCloseDialog}>
            <ModalDialogBody>
                {body && <p>{body}</p>}
                {
                    (selectAllEnabled || deselectAllEnabled) &&
                    <div className="d-flex align-items-center justify-content-center mb-2">
                        {selectAllEnabled &&
                        <ActionButton icon={"fa-check"} title={intl.get('generic_enable_all')}
                                    type={BTN_TYPE_SOFT} className="mr-2"
                                    action={(evt) => toggleAll(true)}
                        />}
                        {deselectAllEnabled &&
                        <ActionButton icon={"fa-times"} title={intl.get('generic_disable_all')}
                                    type={BTN_TYPE_SOFT}
                                    action={(evt) => toggleAll(false)}
                        />}
                    </div>
                }
                <table className="table table-align-middle">
                    <tbody>
                    { netNodes && netNodes.map(netNode => this.renderNetNode(
                        netNode, values[netNode.hwAddress] === true, disabled[netNode.hwAddress] === true)) }
                    </tbody>
                </table>

            </ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={this.onCloseDialog} title={intl.get('generic_close')} type={BTN_TYPE_GHOST}
                            tint={BTN_TINT_DARK}/>
                <ActionButton action={this.onConfirmDialog} title={intl.get('generic_save')}
                            tint={BTN_TINT_PRIMARY}/>
            </ModalDialogFooter>
        </ModalDialog>;
    }

    /**
     * Renders a NetNode.
     *
     * @param {NetNode} netNode
     * @return {JSX.Element}
     */
    renderNetNode(netNode, checked, disabled) {
        const name = netNode.bestName || netNode.hwAddress;
        const makeAndModel = netNode.getBestMakeAndModelAsArray().join(" • ") || netNode.ipAddresses[0];
        const id = `${this.props.id}_checkbox_${netNode.hwAddress}`;
        return (
            <tr key={`row_${netNode.hwAddress}`}>
                <td style={{width: "3rem"}} className="text-center">
                    <DeviceTypeIcon type={netNode.bestType || DT_GENERIC} />
                </td>
                <td>
                    <div className="text-dark">{name}</div>
                    <div>{makeAndModel}</div>
                </td>
                <td className="px-0 text-center">
                    {disabled ?
                        <span><i className="fa fa-fw fa-check-circle text-success"/></span> :
                        <div className="custom-control custom-switch">
                            <input id={id} key={id}
                                type="checkbox"
                                className="custom-control-input"
                                checked={checked}
                                onChange={(evt) => {
                                    if (!evt.currentTarget) return;
                                    const newEnabledValue = evt.currentTarget.checked;
                                    this.onNodePropertyChanged(netNode, newEnabledValue);
                                }}
                            />
                            <label className="custom-control-label" htmlFor={id}/>
                        </div>
                    }
                </td>
            </tr>
        )
    }

    onNodePropertyChanged(netNode, selected) {
        this.setState((prevState) => {
            const prevValues = prevState.values;
            prevValues[netNode.hwAddress] = selected;
            return {values: prevValues}
        })
    }
}

SecurityDeviceToggleDialog.propTypes = {
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    title: PropTypes.string,
    body: PropTypes.string,
    selectAllEnabled: PropTypes.bool,
    deselectAllEnabled: PropTypes.bool,
    values: PropTypes.object,
};