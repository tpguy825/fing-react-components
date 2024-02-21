import React from "react";
import PropTypes from "prop-types";

export default class AnchorResponder extends React.Component {
    render() {
        const onClickInternal = event => {
            event.preventDefault();
            event.stopPropagation();
            this.processClick(event);
        };

        return <span onClick={onClickInternal}>{this.props.children}</span>;
    }

    processClick(event) {
        const { onClick } = this.props;
        const tag = this.props.customTag || "a";

        if (onClick) {
            if (Array.isArray(tag)) {
                const shouldTrigger = typeof tag.find(tag => event.target.localName === tag) !== "undefined";

                if (shouldTrigger) {
                    onClick(event);
                }
            } else if (event.target.localName === tag) {
                onClick(event);
            }
        }
    }
}

AnchorResponder.propTypes = {
    customTag: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    onClick: PropTypes.func
};