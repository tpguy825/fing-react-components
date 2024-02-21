import React from "react";
import PropTypes from 'prop-types';
import intl from "react-intl-universal";

export default class CopyToClipboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hide: false
        };

        this.ref = React.createRef();
    }

    render() {
        if (!this.props.text) {
            return null;
        }

        return <span className={`far fa-fw ml-2 fa-copy text-primary ${this.props.className ?? ""}`}
            ref={this.ref}
            role="button"
            data-container="body"
            data-toggle="popover"
            data-placement="right"
            data-content={intl.get("copy_to_clipboard_copied")}
            onClick={() => {
                clearTimeout(this.timeout);
                window.$(this.ref.current).popover("show");

                this.setState({
                    hide: false
                });

                navigator.clipboard.writeText(this.props.text)
                    .then(() => {
                        clearTimeout(this.timeout);
                        setTimeout(() => this.setState({
                            hide: true
                        }), 1000);
                    })
                    .catch(() => {
                        this.setState({
                            hide: false
                        });
                    })
                ;
            }}
        />;
    }

    componentDidMount() {
        if (typeof window.initTooltips === "function") {
            window.initTooltips();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    componentDidUpdate() {
        if (this.state.hide) {
            window.$(this.ref.current).popover("hide");

            this.setState({
                hide: false
            });

            clearTimeout(this.timeout);
        }
    }
}

CopyToClipboard.propTypes = {
    text: PropTypes.string
};