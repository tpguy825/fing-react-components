import React, {Component} from 'react';
import intl from 'react-intl-universal';
import ModalDialog, {ModalDialogBody, ModalDialogFooter} from "./ModalDialog";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "./ActionButton";
import PropTypes from 'prop-types';
import { currentLocaleUsers24Hours } from '../helpers/LocaleHelper';


export default class ScheduleHoursDialog extends Component {
    constructor(props, context) {
        super(props, context);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onClearDialog = this.onClearDialog.bind(this);
        this.onConfirmDialog = this.onConfirmDialog.bind(this);
        this.onClickNumber = this.onClickNumber.bind(this);

        this.state = {
            values: this.props.values.slice(0)
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.values !== prevProps.values) {
            this.setState({
                values: this.props.values.slice(0)
            });
        }
    }

    onCloseDialog() {
        if (this.props.onCloseDialog) {
            this.props.onCloseDialog();
        }
        this.setState({values: this.props.values.slice(0)})
    }

    onClearDialog() {
        this.setState({values: []})
    }

    onConfirmDialog() {
        if (this.props.onConfirmDialog) {
            this.props.onConfirmDialog(this.state.values);
        }
    }

    onClickNumber(number){
        if (this.props.editable === false)
            return;

        const numbers = this.state.values
        if (numbers.includes(number)) {   
            const index = numbers.indexOf(number);
            if (index > -1) {
                numbers.splice(index,1);
                this.setState({values: numbers})
            }
        } else{
            numbers.push(number);
            this.setState({values: numbers})        
        }
    }

    canEnable(max){
        return this.state.values.length > max;
    }

    render() {
        const {id, title, subtitle, max} = this.props; // values, onConfirmDialog, onCloseDialog
        const maxValue = max || 4;
        const titleValue = title || intl.get('schedule_hours')
        const subtitleValue = subtitle || intl.get('schedule_max_run',{max:maxValue})
        return <ModalDialog id={id} title={titleValue} onClose={this.onCloseDialog}>
            <ModalDialogBody>
                {subtitleValue && <p>{subtitleValue}</p>}
                {this.renderBody()}
            </ModalDialogBody>
            <ModalDialogFooter  className="border-0">
                <ActionButton   action={this.onCloseDialog} 
                                title={intl.get('generic_close')} 
                                type={BTN_TYPE_GHOST}
                                tint={BTN_TINT_DARK}/>
                <ActionButton   action={this.onClearDialog}
                                title={intl.get('generic_clear')}
                                type={BTN_TYPE_GHOST}
                                tint={BTN_TINT_DARK}/>
                <ActionButton   action={this.onConfirmDialog}
                                disabled={this.state.values.length > maxValue}
                                title={intl.get('generic_save')}/>
            </ModalDialogFooter>
        </ModalDialog>;
    }

    renderBody() {
        const is24Hours = currentLocaleUsers24Hours()
        const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

        let middleIndex = Math.ceil(hours.length / 2);

        const halfAM = hours.splice(0, middleIndex);   
        const halfPM = hours.splice(-middleIndex);

        middleIndex = Math.ceil(halfAM.length / 2);

        const firstHalfAM = halfAM.splice(0, middleIndex);   
        const secondHalfAM = halfAM.splice(-middleIndex);

        middleIndex = Math.ceil(halfPM.length / 2);

        const firstHalfPM = halfPM.splice(0, middleIndex);   
        const secondHalfPM = halfPM.splice(-middleIndex);
        return (
            <div>
                <h4>{intl.get('generic_morning')}</h4>
                <div className="row">
                    {firstHalfAM.map(val => this.renderNumber(val,is24Hours))}
                    {secondHalfAM.map(val => this.renderNumber(val,is24Hours))}
                </div>
                <h4>{intl.get('generic_afternoon')}</h4>
                <div className="row">
                    {firstHalfPM.map(val => this.renderNumber(val,is24Hours))}
                    {secondHalfPM.map(val => this.renderNumber(val,is24Hours))}
                </div>
            </div>
        )
    }
    renderNumber(number, is24h){
        const value = is24h ? number : number % 12 !== 0 ? number % 12 : 12
        const classNumber = this.state.values.includes(number) ? 'icon-primary' : 'icon-soft-secondary'
        return (
            <div className={`col-2 text-center p-2 ${this.props.editable === false ? "opacity" : ""}`} key={number}>
                <a  role="button" 
                    onClick={() => this.onClickNumber(number)}
                    className={'icon icon-sm icon-circle ' + classNumber}>
                    {value}
                </a>
            </div>
        )
    }
}
ScheduleHoursDialog.propTypes = {
    onConfirmDialog: PropTypes.func,
    onCloseDialog: PropTypes.func,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    id: PropTypes.string,
    max: PropTypes.number,
    values: PropTypes.array,
    editable: PropTypes.bool
};