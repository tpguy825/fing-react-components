import React, {Component} from "react";

import NavigationBar from "../component/NavigationBar";
import ActionButton, { BTN_TINT_DARK, BTN_TYPE_GHOST } from '../component/ActionButton';
import ProgressBar from "../component/ProgressBar";

import SegmentedBar from '../component/SegmentedBar';

import MockSidebar from "./MockSidebar";
import MockInternetPage from "./MockInternetPage";
import MockPeoplePage from "./MockPeoplePage";
import MockSecurityScorePage from "./MockSecurityScorePage";

const STEPS_COUNT = 25;

export default class MockDiscoveryPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            items: [],
            activeTabIndex: 0,
            sendReportTime: 0,
            sendReportCompleted: false
        };
        this.onDiscoveryStart = this.onDiscoveryStart.bind(this);
        this.onDiscoveryUpdate = this.onDiscoveryUpdate.bind(this);
    }

    onDiscoveryStart() {
        this.setState({items: []});
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.onDiscoveryUpdate, 500);
    }

    onDiscoveryUpdate() {
        const { items } = this.state;
        console.log("Updating discovery (" + items.length + ")");
        if (items && items.length >= STEPS_COUNT) {
            console.log("Discovery ended");
            clearInterval(this.intervalId);
            return;
        }
        this.setState({
            items: items.concat(this.createMockItem(items.length))
        });
    }

    createMockItem(index) {
        return { rowId: index, label: `Item #${index}` };
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }
    
    // --------------------------------------------------------------------------------

    render() {
        const {items} = this.state;
        const completed = items.length;
        const progress = Math.round(completed / STEPS_COUNT * 100);
        const running = progress > 0 && progress < 100;

        return (
            <>
                <MockSidebar active="HOME" />
                <header id="header" className="header header-sticky-top bg-white container-fluid p-2 app-header">
                    <NavigationBar
                        left={<ActionButton route="/" title="Home" icon='fa-arrow-left'
                                            type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true} />}
                        title={"A mock network"}
                        right={running ?
                            <ActionButton rounded={true} running={true} title="Running"/> :
                            <ActionButton rounded={true} action={this.onDiscoveryStart} title="Refresh"/>}
                        />
                </header>
                <main className="app-main">
                    <div className="container-fluid space-2">
                        {this.renderTabBar(items, progress)}
                        {this.renderProgressBar(progress)}
                        {this.renderTabContent()}
                    </div>
                </main>
            </>
        );
    }

    renderTabBar(items, progress) {
        const running = progress > 0 && progress < 100;
        const accessory = running ? 
            <small>Scanning • {progress}% completed</small> :
            <small>9 online of {items.length} • 13 minutes ago</small>
        const onItemSelected = (idx) => this.setState({activeTabIndex: idx})
    
        return (
            <SegmentedBar className={`nav-tabs ${running ? 'hidden' : ''}`}
                          items={[
                              {label: 'Devices'},
                              {label: 'Network'},
                              {label: 'Security'},
                              {label: 'Internet'},
                              {label: 'People'}
                          ]} accessory={accessory}
                          onItemSelected={onItemSelected}
            />
        );
    }

    renderProgressBar(progress) {
        return <ProgressBar className="mt-n1 mb-2" value={progress} barNoSeparator={true} />
    }

    renderTabContent() {
        const {activeTabIndex} = this.state;
        switch (activeTabIndex) {
            case 0:
                return (<div>Some text here for tab 'Devices'</div>);
            case 1:
                return  (<div>Some text here for tab 'Network'</div>);
            case 2:
                return <MockSecurityScorePage/>;
            case 3:
                return <MockInternetPage/>;
            case 4:
                return <MockPeoplePage/>;
            default:
                return '';
        }
    }
}
