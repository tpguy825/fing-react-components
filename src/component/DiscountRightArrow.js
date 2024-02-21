import React from "react";

export default class DiscountRightArrow extends React.Component {
    render() {
        return <figure className={this.props.className}>
            <span className="badge text-nowrap badge-warning badge-pill text-dark p-2 ml-2">
                {this.props.text}
            </span>
            <RightArrow className="position-absolute mt-2 ml-1" />
        </figure>;
    }
}

const RightArrow = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 99.3 57"
        width="38" transform="scale(-1, 1)"
    >
        <path fill="none" stroke="#bdc5d1" strokeWidth="4" strokeLinecap="round"
            strokeMiterlimit="10"
            d="M2,39.5l7.7,14.8c0.4,0.7,1.3,0.9,2,0.4L27.9,42" 
        />
        <path fill="none" stroke="#bdc5d1" strokeWidth="4" strokeLinecap="round"
            strokeMiterlimit="10" d="M11,54.3c0,0,10.3-65.2,86.3-50" 
        />
    </svg>
)