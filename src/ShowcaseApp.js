import React, {Component} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from 'react-router';
import intl from 'react-intl-universal';

import {getAvailableLocales} from "./helpers/LocaleHelper";
import ShowcaseButtons from "./showcase/ShowcaseButtons";
import ShowcaseHeaders from "./showcase/ShowcaseHeaders";
import ShowcaseBars from "./showcase/ShowcaseBars";
import ShowcaseDialogs from "./showcase/ShowcaseDialogs";
import ShowcaseIcons from "./showcase/ShowcaseIcons";
import ShowcaseUtil from "./showcase/ShowcaseUtil";
import ShowcaseContent from './showcase/ShowcaseContent';
import ShowcaseBanners from './showcase/ShowcaseBanners';
import MockContactPage from "./mock/MockContactPage";
import MockDiagnosticReportPage from "./mock/MockDiagnosticReportPage";
import MockDiscoveryPage from "./mock/MockDiscoveryPage";
import MockContactTimelinePage from "./mock/MockContactTimelinePage";
import MockSpeedTestPage from './mock/MockSpeedTestPage';
import MockInternetScoreBoardPage from './mock/MockInternetScoreBoardPage';
import MockInternetTimelinePage from './mock/MockInternetTimelinePage';
import MockVulnerabilityTestPage from './mock/MockVulnerabilityTestPage';
import MockHiddenCameraPage from './mock/MockHiddenCameraPage';
import MockNetworkTimelinePage from './mock/MockNetworkTimelinePage';
import MockVulnerabilityTestTimelinePage from './mock/MockVulnerabilityTestTimelinePage';
import MockNotificationPage from './mock/MockNotificationPage';
import MockToolPage from './mock/MockToolPage';
import MockDeviceDetailPage from './mock/MockDeviceDetailPage';
import ShowcaseBadges from './showcase/ShowcaseBadges';
export default class ShowcaseApp extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {initDone: false}
    }

    componentDidMount() {
        const locales = getAvailableLocales();
        intl.init({
            currentLocale: 'en-US',
            locales,
        }).then(() => {
            this.setState({initDone: true});
        });
    }

    render() {
        return this.state.initDone && <BrowserRouter>
            <Switch>
                <Route path='/showcase/badges' exact={true} component={ShowcaseBadges}/>
                <Route path='/showcase/buttons' exact={true} component={ShowcaseButtons}/>
                <Route path='/showcase/bars' exact={true} component={ShowcaseBars}/>
                <Route path='/showcase/icons' exact={true} component={ShowcaseIcons}/>
                <Route path='/showcase/content' exact={true} component={ShowcaseContent}/>
                <Route path='/showcase/headers' exact={true} component={ShowcaseHeaders}/>
                <Route path='/showcase/dialogs' exact={true} component={ShowcaseDialogs}/>
                <Route path='/showcase/util' exact={true} component={ShowcaseUtil}/>
                <Route path='/showcase/banners' exact={true} component={ShowcaseBanners}/>
                <Route path='/mock/health_check' exact={true} component={MockDiagnosticReportPage}/>
                <Route path='/mock/discovery' exact={true} component={MockDiscoveryPage}/>
                <Route path='/mock/security/timeline' exact={true} component={MockNetworkTimelinePage}/>
                <Route path='/mock/internet/scoreboard' exact={true} component={MockInternetScoreBoardPage}/>
                <Route path='/mock/internet/history' exact={true} component={MockInternetTimelinePage}/>
                <Route path='/mock/contact/:contactId' exact={true} component={MockContactPage}/>
                <Route path='/mock/timeline' exact={true} component={MockContactTimelinePage}/>
                <Route path='/mock/timeline/:contactId' exact={true} component={MockContactTimelinePage}/>
                <Route path='/mock/speed_test' exact={true} component={MockSpeedTestPage}/>
                <Route path='/mock/vulnerability_test' exact={true} component={MockVulnerabilityTestPage}/>
                <Route path='/mock/vulnerability_test/timeline' exact={true} component={MockVulnerabilityTestTimelinePage}/>
                <Route path='/mock/find_hidden_camera' exact={true} component={MockHiddenCameraPage}/>
                <Route path='/mock/notifications' exact={true} component={MockNotificationPage}/>
                <Route path='/mock/device_detail' exact={true} component={MockDeviceDetailPage}/>

                <Route path='/mock/tools' exact={true} component={MockToolPage}/>
                <Route path="/" exact={true} component={ShowCaseIndex}/>
            </Switch>
        </BrowserRouter>
    }
}

class ShowCaseIndex extends Component {
    render() {
        return (
            <div>
                <section className="container my-5">
                    <h2>Fing Components</h2>
                    <p>
                        Get started with Fing React Components, a library of reusable components and panels
                        for building responsive, mobile-first sites, that comply with Fing Visual Language.
                    </p>
                    <ul>
                        <li><Link to="/showcase/badges">Badges</Link></li>
                        <li><Link to="/showcase/buttons">Buttons</Link></li>
                        <li><Link to="/showcase/bars">Bars</Link></li>
                        <li><Link to="/showcase/icons">Icons</Link></li>
                        <li><Link to="/showcase/headers">Headers</Link></li>
                        <li><Link to="/showcase/dialogs">Dialogs</Link></li>
                        <li><Link to="/showcase/content">Content</Link></li>
                        <li><Link to="/showcase/banners">Banners</Link></li>
                    </ul>
                </section>
                <section className="container my-5">
                    <h2>Helpers & Utilities</h2>
                    <p>
                        Reusable code that supports localization.
                    </p>
                    <ul>
                        <li><Link to="/showcase/util">Date Helper</Link></li>
                    </ul>
                </section>
                <section className="container my-5">
                    <h2>Fing Mocks</h2>
                    <p>
                        Mocks of pages to be implemented in Fing Desktop and Fing Web App.
                    </p>
                    <ul>
                        <li><Link to="/mock/tools">Tool Page</Link></li>
                        <li><Link to="/mock/health_check">Connectivity Report Page</Link></li>
                        <li><Link to="/mock/discovery">Discovery Page</Link></li>
                        <li><Link to="/mock/speed_test">Speed Test Page</Link></li>
                        <li><Link to="/mock/vulnerability_test">Vulnerability Test Page</Link></li>
                        <li><Link to="/mock/find_hidden_camera">Find Hidden Camera Page</Link></li>
                        <li><Link to="/mock/notifications">Notifications</Link></li>
                        <li><Link to="/mock/device_detail">Device Detail</Link></li>

                    </ul>
                </section>
            </div>
        );
    }
}