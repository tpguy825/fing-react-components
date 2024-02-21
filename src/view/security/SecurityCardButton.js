import React from "react";
import ActionButton, {BTN_SIZE_BIG, BTN_TINT_DANGER, BTN_TINT_PRIMARY, BTN_TINT_SECONDARY, BTN_TYPE_DEFAULT, BTN_TYPE_OUTLINE, BTN_TYPE_SOFT} from '../../component/ActionButton';

export const SCB_TYPE_PRIMARY = "scb-primary";
export const SCB_TYPE_SECONDARY = "scb-secondary";
export const SCB_TYPE_WARNING = "scb-warning";

export default class SecurityCardButton extends React.Component {
    render() {
        return <ActionButton
            className={`py-1 text-nowrap ${this.props.className || ""}`}
            icon={this.props.icon}
            size={BTN_SIZE_BIG}
            type={this.getType()}
            tint={this.getTint()}
            action={this.props.action}
            title={this.getTitle()} 
            disabled={this.props.disabled || this.props.freeze}
        />;
    }

    getTint() {
        if (this.props.freeze) {
            return BTN_TINT_SECONDARY;
        }

        return this.props.type === SCB_TYPE_WARNING ? BTN_TINT_DANGER : BTN_TINT_PRIMARY;
    }

    getType() {
        switch (this.props.type) {
            case SCB_TYPE_PRIMARY:
                return BTN_TYPE_DEFAULT;

            case SCB_TYPE_SECONDARY:
                return BTN_TYPE_SOFT;

            case SCB_TYPE_WARNING:
                return BTN_TYPE_OUTLINE;

            // Forward any unrecognized type to ActionButton as it is
            default:
                return this.props.type;
        }
    }

    getTitle() {
        return <span className="d-inline-block" 
            style={{ minWidth: this.getMinWidth() }}
        >
            {this.props.title}
        </span>;
    }

    getMinWidth() {
        return this.props.icon ? 82 : 100;
    }
}

export class SecurityCardButtonGroup extends React.Component {
    render()
     {
        const guttersValue = this.props.gutters || "3";
        const gutters = `pl-md-${guttersValue} pl-0`;
        const firstElementGutters = `pr-${guttersValue} pr-md-0`;

        return <div className="row m-0 justify-content-lg-end justify-content-start">
            {this.props.children.map(
                (child, index) => (
                    <div key={index} className={`py-1 ${index !== 0 ? gutters : firstElementGutters}`}>
                        {child}
                    </div>
                )
            )}
        </div>;
    }
}