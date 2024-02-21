import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import AnchorResponder from "./AnchorResponder";

export default class ActiveIntl extends React.Component {
    render() {
        const { label, params, onClick, customTag } = this.props;

        if (!label) {
            return null;
        }

        return <AnchorResponder onClick={onClick} customTag={customTag}>
            {intl.getHTML(label, params)}
        </AnchorResponder>;
    }
}

ActiveIntl.propTypes = {
    label: PropTypes.string.isRequired,
    params: PropTypes.object,
    customTag: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    onClick: PropTypes.func
};