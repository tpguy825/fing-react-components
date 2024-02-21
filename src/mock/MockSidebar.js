/**
 * Created by marco on 3/12/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import {Link} from "react-router-dom";

export default class MockSidebar extends Component {

    render() {
        return (
            <aside className="position-fixed top-0 bottom-0 left-0 bg-primary app-sidebar">
                {this.renderMainNavigationList()}
            </aside>
        )
    }

    renderMainNavigationList() {
        const { unreadNotificationCount } = this.props.unreadNotificationCount || 0;
        const itemClass = "d-block";
        const linkClass = "btn btn-sm btn-ghost-light d-block mx-2 text-left";

        return (
            <ul className="list-unstyled app-sidebar-list">
                <li className={`${itemClass} ${this.props.active === "HOME" ? "active" : ""}`}>
                    <Link className={linkClass} to="/" replace={true}>
                        <i className="far fa-check-circle fa-fw mr-2" />
                        {intl.get('sidebar_home')}
                    </Link>
                </li>
                <li className={`${itemClass} ${this.props.active === "TOOLS" ? "active" : ""}`}>
                    <Link className={linkClass} to="/" replace={true}>
                        <i className="fas fa-wifi fa-fw mr-2" />
                        {intl.get('sidebar_tools')}
                    </Link>
                </li>

                <li className={`${itemClass} ${this.props.active === "NOTIFICATIONS" ? "active" : ""}`}>
                    <Link className={linkClass} to="/" replace={true}>
                        <i className="fas fa-bell fa-fw mr-2" />
                        {intl.get('sidebar_notifications')}
                        {unreadNotificationCount > 0 &&
                        <span className="badge badge-pill badge-danger float-right px-2 mt-1 font-weight-bold">{unreadNotificationCount}</span>
                        }
                    </Link>
                </li>

                <li className={`${itemClass} ${this.props.active === "OUTAGES" ? "active" : ""}`}>
                    <Link className={linkClass} to="/" replace={true}>
                        <i className="fas fa-bolt fa-fw mr-2" />
                        {intl.get('sidebar_outages')}
                    </Link>
                </li>

                <li className={`${itemClass}${this.props.active === "COMMUNITY" ? "active" : ""}`}>
                    <Link className={linkClass} to="/" replace={true}>
                        <i className="fas fa-comments fa-fw mr-2" />
                        {intl.get('sidebar_community')}
                    </Link>
                </li>
            </ul>
        );
    }


}