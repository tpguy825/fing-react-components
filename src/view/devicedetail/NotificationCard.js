import React, {Component} from 'react';
import intl from 'react-intl-universal';
import Select from 'react-select';
import PremiumBadge from '../security/PremiumBadge';

const MIN_IN_MILLIS = 60000;

const SELECT_STYLES = {
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
        opacity: state.isDisabled ? ".5" : "1",
        backgroundColor: "transparent",
        zIndex: "999",
        marginBottom: '15px'
    })
};


export default class NotificationCard extends Component {

    constructor(props) {
        super(props);
        this.onChangeTimeout = this.onChangeTimeout.bind(this);
        this.state = {
            presetTimeoutValues: [
                { value: 0, label: intl.get('generic_automatic') },
                { value: 1 * MIN_IN_MILLIS, label: intl.get('dateformat_min_long', { amount: 1 }) },
                { value: 2 * MIN_IN_MILLIS, label: intl.get('dateformat_mins_long', { amount: 2 }) },
                { value: 5 * MIN_IN_MILLIS, label: intl.get('dateformat_mins_long', { amount: 5 }) },
                { value: 10 * MIN_IN_MILLIS, label: intl.get('dateformat_mins_long', { amount: 10 }) },
                { value: 15 * MIN_IN_MILLIS, label: intl.get('dateformat_mins_long', { amount: 15 }) },
                { value: 20 * MIN_IN_MILLIS, label: intl.get('dateformat_mins_long', { amount: 20 }) },
                { value: 30 * MIN_IN_MILLIS, label: intl.get('dateformat_mins_long', { amount: 30 }) },
                { value: 40 * MIN_IN_MILLIS, label: intl.get('dateformat_mins_long', { amount: 45 }) },
                { value: 60 * MIN_IN_MILLIS, label: intl.get('dateformat_hour_long', { amount: 1 }) },
                { value: 90 * MIN_IN_MILLIS, label: intl.get('dateformat_hours_long', { amount: 1.5 }) },
                { value: 120 * MIN_IN_MILLIS, label: intl.get('dateformat_hours_long', { amount: 2 }) },
                { value: 240 * MIN_IN_MILLIS, label: intl.get('dateformat_hours_long', { amount: 4 }) },
                { value: 480 * MIN_IN_MILLIS, label: intl.get('dateformat_hours_long', { amount: 8 }) },
            ]
        }
    }

    onChangeTimeout(selectedValue) {
        if (this.props.onChangeTimeout) {
            this.props.onChangeTimeout(selectedValue);
        }
    }

    render() {
        const {title, subtitle, description, netNode, disabled} = this.props;
        const timeoutInMillis = netNode && netNode.stateChangeTimeout ? netNode.stateChangeTimeout : 0;
        const timeoutInMinutes = timeoutInMillis / 60 / 1000;
        let options;
        let currentTimeoutValue;

        if (timeoutInMillis) {
            const preset = this.state.presetTimeoutValues.filter(timeout => timeout.value === timeoutInMillis)[0];
            if (preset) {
                // Found a preset value, pick it.
                currentTimeoutValue = preset;
                options = this.state.presetTimeoutValues;
            } else if (timeoutInMillis > 0) {
                // Found a fixed value not in the preset list. Add it on top.
                currentTimeoutValue = {
                    value: timeoutInMillis,
                    label: intl.get('device_detail_notification_set_millis', { time: (timeoutInMinutes) })
                };
                options = [...this.state.presetTimeoutValues];
                options.unshift(currentTimeoutValue);
            } else if (timeoutInMillis === 0) {
                // Found default "Automatic" value. Add it on top.
                currentTimeoutValue = this.state.presetTimeoutValues[0];
                options = [...this.state.presetTimeoutValues];
            } else if (timeoutInMillis < 0) {
                // Found an "Automatic" value elaborated by the backend. Add it on top.
                currentTimeoutValue = {
                    value: timeoutInMillis,
                    label: intl.get('device_detail_notification_set_automatic', { time: (-timeoutInMinutes) })
                };
                options = [...this.state.presetTimeoutValues];
                options.unshift(currentTimeoutValue);
            }
        } else {
            currentTimeoutValue = this.state.presetTimeoutValues[0];
            options = [...this.state.presetTimeoutValues];
        }
        const bgClass = disabled ? "bg-soft-secondary" : "";
        return (
            <div className={"card border " + bgClass}>
                <PremiumBadge/>
                <div className="card-body">
                    <h4 className="mb-0">{title}</h4>
                    {this.props.children}
                    <p className="small">{subtitle}</p>
                    <Select
                        styles={SELECT_STYLES}
                        value={currentTimeoutValue}
                        isDisabled={disabled}
                        onChange={this.onChangeTimeout}
                        options={this.state.presetTimeoutValues}
                    />
                </div>
            </div>
        );
    }
}