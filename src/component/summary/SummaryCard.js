import React, {Component} from 'react';

export default class SummaryCard extends Component {
    

    render() {
        const {background,badgeIcon} = this.props;

        return (
            <div className={`card card-bordered border shadow-none h-100 rounded-0 overflow-hidden ${background || ''}`}>
                {badgeIcon}
                <div className="row pl-3 pr-lg-7 pb-3 pb-lg-0">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

