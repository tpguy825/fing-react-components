import React, {Component} from "react";
import ActionButton, {BTN_SIZE_BIG, BTN_TINT_PRIMARY} from '../component/ActionButton';
import MockSidebar from "./MockSidebar";
import NavigationBar from "../component/NavigationBar";
import SegmentedBar from "../component/SegmentedBar";
import ToolCard from "../view/tools/ToolCard";
import {
    TOOL_DHCP_DISCOVERY, TOOL_DNS_BENCHMARK,
    TOOL_DNS_LOOKUP,
    TOOL_FIND_HIDDEN_CAMERAS,
    TOOL_FIND_OPEN_PORTS,
    TOOL_ISP_COMPARISON, TOOL_MAC_LOOKUP,
    TOOL_OUTAGE_DETECTOR, TOOL_PING,
    TOOL_ROUTER_VULNERABILITY_CHECK,
    TOOL_SPEED_TEST, TOOL_TRACEROUTE, TOOL_WIFI_SCANNER
} from "../model/Constants";
import ToolSection from "../view/tools/ToolSection";
import ToolCardAlternative from "../view/tools/ToolCardAlternative";
import ToolCardLargeIcon from "../view/tools/ToolCardLargeIcon";
import ToolCardHorizontal from "../view/tools/ToolCardHorizontal";
import ToolCardColored from "../view/tools/ToolCardColored";
import ToolCardSmall from "../view/tools/ToolCardSmall";
import TitleBar from "../component/TitleBar";


export default class MockToolPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 0,
        }
    }

    render() {
        const onItemSelected = (idx) => this.setState({index: idx});
        const sectionWrap = this.state.index < 5;

        return (
            <>
                <MockSidebar active="HOME"/>
                <header id="header" className="header header-sticky-top bg-white container-fluid p-2 app-header">
                    <NavigationBar
                        right={
                            <SegmentedBar items={[
                                {label: 'V1'},
                                {label: 'V2'},
                                {label: 'V3'},
                                {label: 'V4'},
                                {label: 'V5'},
                                {label: 'V6'}
                            ]} onItemSelected={onItemSelected}/>
                        }
                    />
                </header>
                <main className="app-main">
                    <div className="container-fluid space-2 px-4">
                        <TitleBar title={"Tools"} right={<ActionButton
                            size={BTN_SIZE_BIG}
                            title={'Unlock all with premium'}
                            tint={BTN_TINT_PRIMARY}/>} />
                        <ToolSection title={"Verify your internet connectivity"} wrap={sectionWrap}>
                            {this.renderInternetCard("Test Speed", "Calculate how fast you can download and upload data", TOOL_SPEED_TEST)}
                            {this.renderInternetCard("Detect Outages", "Verify live and recent Internet outages in your area", TOOL_OUTAGE_DETECTOR)}
                            {this.renderInternetCard("Compare Providers", "Find who provides the best Internet experience in your area", TOOL_ISP_COMPARISON)}
                        </ToolSection>
                        <ToolSection title={"Improve your security"} wrap={sectionWrap}>
                            {this.renderSecurityCard("Find Open Ports", "Lorem ipsum sit tamen nunc quidem te percutio.", TOOL_FIND_OPEN_PORTS)}
                            {this.renderSecurityCard("Check Router Vulnerabilities", "Lorem ipsum sit tamen nunc quidem te percutio.", TOOL_ROUTER_VULNERABILITY_CHECK, true)}
                            {this.renderSecurityCard("Find Hidden Cameras", "Lorem ipsum sit tamen nunc quidem te percutio.", TOOL_FIND_HIDDEN_CAMERAS, true)}
                        </ToolSection>
                        {this.renderPlan()}
                        <ToolSection title={"Solve your network issues"} wrap={sectionWrap}>
                            {this.renderTroubleshootingCard("Ping", "Visualize the response time of a device or website ", TOOL_PING)}
                            {this.renderTroubleshootingCard("Traceroute", "Measure the transit delays across the network", TOOL_TRACEROUTE)}
                            {this.renderTroubleshootingCard("WiFi Scanner", "Lorem ipsum sit tamen nunc quidem te percutio.", TOOL_WIFI_SCANNER,)}
                            {this.renderTroubleshootingCard("DNS Lookup", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ", TOOL_DNS_LOOKUP)}
                            {this.renderTroubleshootingCard("MAC Address Lookup", "Lorem ipsum sit tamen nunc quidem te percutio.", TOOL_MAC_LOOKUP)}
                            {this.renderTroubleshootingCard("DHCP Discovery", "Lorem ipsum sit tamen nunc quidem te percutio.", TOOL_DHCP_DISCOVERY, true)}
                            {this.renderTroubleshootingCard("DNS Benchmark", "Lorem ipsum sit tamen nunc quidem te percutio.", TOOL_DNS_BENCHMARK, true)}
                        </ToolSection>
                    </div>
                </main>
            </>
        );
    }

    renderInternetCard(title, description, iconType, premium) {
        return this.renderCard(title, description, iconType, "bg-fing-internet", premium === true);
    }

    renderSecurityCard(title, description, iconType, premium) {
        return this.renderCard(title, description, iconType, "bg-fing-security", premium === true);
    }

    renderTroubleshootingCard(title, description, iconType, premium) {
        return this.renderCard(title, description, iconType, "bg-fing-troubleshooting", premium === true);
    }

    renderCard(title, description, iconType, tintClass, premium) {
        const onClickCard = (evt) => {
            evt.preventDefault();
            console.log(`${title} clicked`);
        };
        const linkCard = (card) => <a href="#" className="h-100" onClick={onClickCard}>{card}</a>;

        const iconBackgroundClass = tintClass || '';
        switch (this.state.index) {
            case 0:
                return linkCard(<ToolCard title={title} description={description} iconType={iconType}
                                          premium={premium} disabled={premium} iconBackgroundClass={iconBackgroundClass}/>);
            case 1:
                return linkCard(<ToolCardAlternative title={title} description={description} iconType={iconType}
                                                     premium={premium} disabled={premium} />);
            case 2:
                return linkCard(<ToolCardHorizontal title={title} description={description} iconType={iconType}
                                                    premium={premium} disabled={premium} iconBackgroundClass={iconBackgroundClass}/>);
            case 3:
                return linkCard(<ToolCardColored title={title} description={description} iconType={iconType}
                                                 premium={premium} disabled={premium} backgroundClass={iconBackgroundClass}/>);
            case 4:
                return linkCard(<ToolCardSmall title={title} description={description} iconType={iconType}
                                               premium={premium} disabled={premium}
                                               iconBackgroundClass={iconBackgroundClass}/>);

            default:
                return linkCard(<ToolCardLargeIcon title={title} description={description} iconType={iconType}
                                                   premium={premium} disabled={premium} iconBackgroundClass={iconBackgroundClass}/>);
        }
    }

    renderPlan() {
        return (
            <div className="alert alert-soft-primary alert-dismissible fade show mb-6" role="alert">
                {/*<i className="fab fa-fw fa-youtube text-danger mr-2" />*/}
                {/*Learn more about how each tool can help you improve your network awareness on our <a href="#" className="alert-link link-underline">Fing Academy</a> channel.*/}
                <i className="fa fa-fw fa-star mr-2" />
                Get unlimited tools and improve your network awareness with <a href="#" className="alert-link link-underline">Fing Premium</a>.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <svg aria-hidden="true" className="mb-0" width="14" height="14" viewBox="0 0 18 18"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor"
                              d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"/>
                    </svg>
                </button>
            </div>
        );
    }
}
