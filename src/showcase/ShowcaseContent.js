import React, {Component} from "react";
import {pageNavigationBar, sectionTitle} from "./ShowcaseUtils";
import CircularChart, {
    CC_DIM_DEFAULT,
    CC_DIM_LARGE,
    CC_DIM_SMALL,
    CC_RADIUS_DEFAULT,
    CC_RADIUS_LARGE,
    CC_RADIUS_SMALL,
    CC_ANIM_SLOW,
    CC_ANIM_FAST
} from '../component/CircularChart';
import ComparisonChart, {ComparisonChartItem} from "../component/charts/ComparisonChart";
import { TINT_PRIMARY, TINT_SUCCESS, TINT_DANGER, TINT_WARNING } from '../model/Constants';
import InfoPanel from "../component/InfoPanel";
import SegmentedChart, { SC_DIM_DEFAULT, SC_DIM_LARGE, SC_DIM_SMALL } from "../component/charts/SegmentedChart";
import CardPanel from "../component/CardPanel";
import StatusIcon, { SI_SHAPE_CIRCLE, SI_STATUS_SUCCESS } from '../component/icons/StatusIcon';
import ActionButton, { BTN_TYPE_SOFT } from "../component/ActionButton";
import SummaryCard from '../component/summary/SummaryCard';
import SummaryRow from "../component/summary/SummaryRow";
import SummaryCardBody from "../component/summary/SummaryCardBody";
import SummaryCardFooter from "../component/summary/SummaryCardFooter";
import SummaryColLeft from "../component/summary/SummaryColLeft";
import SummaryColRight from "../component/summary/SummaryColRight";
import DashboardCard from '../component/dashboard/DashboardCard';
import DashboardCardBody from '../component/dashboard/DashboardCardBody';
import DashboardCardFooter from '../component/dashboard/DashboardCardFooter';
import DashboardSection from '../component/dashboard/DashboardSection';
import DashboardRow from '../component/dashboard/DashboardRow';
import DashboardCol from '../component/dashboard/DashboardCol';

const COLORS = [
    '#F7CA45',
    '#DECF4B',
    '#C5D251',
    '#91D251',
    '#36CE33',
]
export default class ShowcaseContent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            circularChartValue: 75,
            comparisonChartValues: [75, 25]
        }
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.updateState, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateState() {
        this.setState({comparisonChartValues: [Math.random() * 100, Math.random() * 100]});
    }

    // ------------------------------------------------------------------------------------------------

    render() {

        const coloringFn = (idx) => {
            if (idx >=0 && idx < COLORS.length) return COLORS[idx];
        }
        return (
            <>
                {pageNavigationBar("Content")}
                <section className="container mt-10 mb-5">
                    {sectionTitle('Info Panels')}
                    <div className="row mb-4">
                        <div className="col-4">
                            <InfoPanel 
                                image={"https://cdn.fing.io/images/brand/APPLE_LOGO.png"}
                                title={"About your router"}
                                values={[
                                    {value: 'MAC Address', description: 'BC:15:AC:8E:1B:81'},
                                    {value: 'IP Address', description: '192.168.1.1'},
                                    {value: 'Brand', description: 'Vodafone'},
                                    {value: 'Model', description: 'Station Revolution'},
                                ]}
                            />
                        </div>
                        <div className="col-4">
                            <InfoPanel 
                                image={"https://cdn.fing.io/images/brand/APPLE_LOGO.png"}
                                title={"About your router with action"}
                                values={[
                                    {value: 'MAC Address', description: 'BC:15:AC:8E:1B:81',action:()=>console.log('BC:15:AC:8E:1B:81')},
                                    {value: 'IP Address', description: '192.168.1.1'},
                                    {value: 'Brand', description: 'Vodafone'},
                                    {value: 'Model', description: 'Station Revolution'},
                                ]}
                            />
                        </div>
                        <div className="col-4">
                            <InfoPanel 
                                image={"https://cdn.fing.io/images/brand/APPLE_LOGO.png"}
                                title={"About your router with enabled data"}
                                values={[
                                    {value: 'MAC Address', description: 'BC:15:AC:8E:1B:81',enabled:true},
                                    {value: 'IP Address', description: '192.168.1.1',enabled:true},
                                    {value: 'Brand', description: 'Vodafone',enabled:true},
                                    {value: 'Model', description: 'Station Revolution',enabled:true},
                                ]}
                            />
                        </div>
                    </div>
                </section>
                <section className="container mt-10 mb-5">
                    {sectionTitle('Card Panels')}
                    <div className="row mb-4">
                        <div className="col-4">
                            <CardPanel
                                title={'TITOLO'}
                                subtitle={'Sottotitolo'}
                                icon={SI_STATUS_SUCCESS}/>
                        </div>
                        <div className="col-4">
                            <CardPanel
                                className={"d-block"}
                                title={'TITOLO'}
                                subtitle={'Sottotitolo'}
                                icon={SI_STATUS_SUCCESS}/>
                        </div>
                        <div className="col-4">
                            <CardPanel
                                title={'TITOLO'}
                                subtitle={'Sottotitolo'}
                                icon={SI_STATUS_SUCCESS}/>
                        </div>
                    </div>
                </section>
                


                <section className="container mt-10 mb-5">
                    {sectionTitle('Segmented Chart')}
                    <div className="row mb-4">
                        <div className="col-12">
                            <SegmentedChart
                                coloringFn={coloringFn}
                                value={5} 
                                length={5}
                                leftText={'Unsecure'} 
                                rightText={'Secure'}/>
                        </div>
                        <div className="col-12">
                            <SegmentedChart
                                coloringFn={coloringFn}
                                value={3} 
                                leftText={'Unsecure'} 
                                rightText={'Secure'}
                                length={5}/>
                        </div>
                        <div className="col-12">
                            <SegmentedChart
                                coloringFn={coloringFn}
                                value={1} 
                                leftText={'Unsecure'} 
                                rightText={'Secure'}
                                length={5}/>
                        </div>
                    </div>
                </section>

                <section className="container mt-10 mb-5">
                    {sectionTitle('Comparison Chart')}
                    <div className="row mb-4">
                        <div className="col-4">
                            <ComparisonChart height={200}
                                             topItem={new ComparisonChartItem(50, "Something 1", "Subtitle 1", "Extras 1")}
                                             bottomItem={new ComparisonChartItem(30, "Something 2", "Subtitle 2", "Extras 2")} />
                        </div>
                        <div className="col-4">
                            <ComparisonChart height={200}
                                             topItem={new ComparisonChartItem(90, "Something 1", "Subtitle 1", "Extras 1")}
                                             bottomItem={new ComparisonChartItem(10, "Something 2", "Subtitle 2", "Extras 2")} />
                        </div>
                        <div className="col-4">
                            <ComparisonChart height={200}
                                             topItem={new ComparisonChartItem(90, "Something 1", "Subtitle 1", "Extras 1")}
                                             bottomItem={new ComparisonChartItem(70, "Something 2", "Subtitle 2", "Extras 2")} />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12">
                            <ComparisonChart height={200}
                                             topItem={new ComparisonChartItem(this.state.comparisonChartValues[0], "Something 1", "Subtitle 1", "Extras 1")}
                                             bottomItem={new ComparisonChartItem(this.state.comparisonChartValues[1], "Something 2", "Subtitle 2", "Extras 2")} />
                        </div>
                    </div>
                </section>

                <section className="container mt-10 mb-5">
                    {sectionTitle('Circular Chart')}
                    <div className="d-flex align-items-center justify-content-between">
                        <CircularChart
                            className="mr-2"
                            minLabel={"0"}
                            maxLabel={"100"}
                            valueLabel={this.state.circularChartValue || 0}
                            radius={CC_RADIUS_DEFAULT}
                            progress={this.state.circularChartValue || 0}
                            color={TINT_PRIMARY}
                            animated={true}
                            dimension={CC_DIM_SMALL}
                            animation={CC_ANIM_FAST}
                        />

                        <CircularChart
                            className="mr-2"
                            minLabel={"0 Mbps"}
                            maxLabel={"300 Mbps"}
                            valueLabel={this.state.circularChartValue || 0}
                            radius={CC_RADIUS_LARGE}
                            progress={this.state.circularChartValue || 0}
                            dimension={CC_DIM_DEFAULT}
                            color={TINT_SUCCESS}
                            animated={false}
                        />

                        <CircularChart
                            className="mr-2"
                            minLabel={"0 Mbps"}
                            maxLabel={"300 Mbps"}
                            animation={CC_ANIM_SLOW}
                            valueLabel={this.state.circularChartValue || 0}
                            radius={CC_RADIUS_SMALL}
                            progress={this.state.circularChartValue || 0}
                            color={TINT_DANGER}
                            dimension={CC_DIM_LARGE}
                            animated={true}
                        />
                    </div>
                </section>
                <section className="container mt-10 mb-5">
                    {sectionTitle('Summary components')}
                    <SummaryRow>
                        <SummaryColLeft>
                            <SummaryCard>
                                <SummaryCardBody 
                                    className="align-items-center d-flex"
                                    background={"bg-soft-primary"}>
                                    <SegmentedChart
                                        coloringFn={coloringFn}
                                        value={5} 
                                        length={5}
                                        leftText={'Unsecure'} 
                                        rightText={'Secure'}/>
                                </SummaryCardBody>
                                <SummaryCardFooter>
                                    <ActionButton 
                                        className="mr-2"
                                        title={'Button 1'}
                                        type={BTN_TYPE_SOFT}/>
                                    <ActionButton 
                                        className="mr-2"
                                        title={"Button 2"}
                                        type={BTN_TYPE_SOFT}/>
                                </SummaryCardFooter>
                            </SummaryCard>
                        </SummaryColLeft>
                        <SummaryColRight>
                            <SummaryCard>
                                <SummaryCardBody>
                                    <ComparisonChart height={200}
                                        topItem={new ComparisonChartItem(90, "Something 1", "Subtitle 1", "Extras 1")}
                                        bottomItem={new ComparisonChartItem(10, "Something 2", "Subtitle 2", "Extras 2")} />
                                </SummaryCardBody>
                            </SummaryCard>
                        </SummaryColRight>
                    </SummaryRow>
                </section>
                <section className="container mt-10 mb-5">
                    {sectionTitle('Dashboard components')}
                    <DashboardSection>
                        <DashboardRow>
                            <DashboardCol>
                                <DashboardCard>
                                    <DashboardCardBody title={'Dashboard card'} subtitle={'Subtitle card'} description={'Description card'}>
                                        <div className="d-flex align-items-center" style={{minHeight: "8rem"}}>
                                            <SegmentedChart
                                                coloringFn={coloringFn}
                                                value={4}
                                                length={5}
                                                className={'w-100'}
                                                dimension={SC_DIM_SMALL}
                                                leftText={'Unsecure'}
                                                rightText={'Secure'}/>
                                        </div>
                                    </DashboardCardBody>
                                    <DashboardCardFooter>
                                        <ActionButton 
                                            title={'DASHBOARD'} 
                                            className="w-100"/>
                                    </DashboardCardFooter>
                                </DashboardCard>
                            </DashboardCol>
                            <DashboardCol>
                                <DashboardCard>
                                    <DashboardCardBody title={'Dashboard card'} subtitle={'Subtitle card'} description={'Description card'}>
                                        <div className="d-flex align-items-center" style={{minHeight: "8rem"}}>
                                            <SegmentedChart
                                                coloringFn={coloringFn}
                                                value={4}
                                                length={5}
                                                className={'w-100'}
                                                dimension={SC_DIM_SMALL}
                                                leftText={'Unsecure'}
                                                rightText={'Secure'}/>
                                        </div>
                                    </DashboardCardBody>
                                    <DashboardCardFooter>
                                        <ActionButton 
                                            title={'DASHBOARD'} 
                                            className="w-100"/>
                                    </DashboardCardFooter>
                                </DashboardCard>
                            </DashboardCol>
                        </DashboardRow>
                    </DashboardSection>
                </section>
            </>);
    }

}


