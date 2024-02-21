import React, {Component} from 'react';
import SecurityCardButton from '../../view/security/SecurityCardButton';
import { BTN_TYPE_GHOST } from '../ActionButton';

export default class SummaryTitle extends Component {
    render() {
        return <div className={this.props.className || ""}>
            {this.renderTitle()}
        </div>;
    }

    renderTitle() {
        if (this.props.onUnlock) {
            return <ComplexTitle {...this.props} />;
        }

        return <SimpleTitle {...this.props} />;
    }
}

const SimpleTitle = props => <h3 className="mb-3">{props.title}</h3>;

const ComplexTitle = props => (
    <div className="row m-0 pr-3 pb-3">
        <h3 className="m-0">{props.title}</h3>
        <div className="pt-2 pt-md-0 pl-2 m-0">
            <SecurityCardButton title={props.actionTitle || props.title}
                className="px-0 px-md-2"
                type={BTN_TYPE_GHOST}
                action={props.onUnlock}
                icon="fa fa-star"
            />
        </div>
    </div>
);