import React from "react";
import { ReactComponent as DownArrow } from "../assets/svg/premium/down_arrow.svg";
import PropTypes from 'prop-types';

export default class SideBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isClosing: false
        };

        this.ref = React.createRef();
        this.refUpdated = false;
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        if (!this.refUpdated && this.ref) {
            window.$(this.ref.current).on("close.bs.alert", () => {
                this.setState({
                    isClosing: true
                });
            });

            this.refUpdated = true;
        }
    }

    render() {
        const dismissible = this.props.dismissible || this.props.onClose;
        const styling = this.props.styling || "warning";
        const soft = this.props.soft ? "soft-" : "";
        const balloonClass = this.props.balloonClass || "";

        return <div className={"position-relative " + (this.props.className || "")} style={this.props.style}>
            <div className={this.props.floating ? "position-relative" : ""}>
                <div className={this.props.floating ? "position-absolute bottom-0" : ""}>
                    <div ref={this.ref} 
                        className={`alert alert-${soft}${styling} ${dismissible ? "alert-dismissible" : ""} fade show ${balloonClass}`} 
                        role="alert"
                    >
                        {this.props.children}
                        {dismissible && <button 
                            type="button" 
                            className="close" 
                            data-dismiss="alert" 
                            aria-label="Close"
                            onClick={this.props.onClose}
                        >
                            <span className="align-middle" aria-hidden="true">&times;</span>
                        </button>}
                    </div>
                    <DownArrow style={{ overflow: "visible", position: "relative", zIndex: 1, pointerEvents: "none" }} 
                        className={`d-block mx-auto p-0 mt-n2 ${this.state.isClosing ? "fade" : ""}`} 
                    />
                </div>
            </div>
            <div className="text-center">
                {this.props.target}
            </div>
        </div>;
    }
}

SideBanner.propTypes = {
    dismissible: PropTypes.bool,
    onClose: PropTypes.func,
    soft: PropTypes.bool,
    balloonClass: PropTypes.string,
    floating: PropTypes.bool,
    target: PropTypes.node,
    className: PropTypes.string
};