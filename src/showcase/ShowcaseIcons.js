import React, {Component} from "react";
import {pageNavigationBar, sectionTitle} from "./ShowcaseUtils";
import StatusIcon, {
    SI_SHAPE_CIRCLE,
    SI_SHAPE_SHIELD,
    SI_SHAPE_INFO,
    SI_STATUS_ERROR,
    SI_STATUS_SUCCESS,
    SI_STATUS_SYNC,
    SI_STATUS_WARNING
} from "../component/icons/StatusIcon";
import NetworkTypeIcon from "../component/icons/NetworkTypeIcon";
import {AI_ALL_TYPES, CT_ALL_TYPES, DT_ALL_TYPES, GEN_ALL_TYPES, NC_ALL_TYPES, NT_ALL_TYPES, SI_ALL_TYPES, TOOL_ALL_TYPES} from "../model/Constants";
import DeviceTypeIcon from "../component/icons/DeviceTypeIcon";
import NetworkContextIcon from "../component/icons/NetworkContextIcon";
import ContactTypeIcon from "../component/icons/ContactTypeIcon";
import RatingTypeIcon, {
    RTI_HEART,
    RTI_STAR,
    RTI_EMPTY,
    RTI_HALF,
    RTI_DOT,
    RTI_FULL,
    RTI_BOLT
} from '../component/icons/RatingTypeIcon';
import AchievementIcon from "../component/icons/AchievementIcon";
import SupportIcon from "../component/icons/SupportIcon";
import GenericIcon from "../component/icons/GenericIcon";
import ToolIcon from '../component/icons/ToolIcon';

const tints = ["primary", "success", "warning", "danger", "navy"];
export default class ShowcaseIcons extends Component {
    render() {
        return (
            <>
                {pageNavigationBar("Icons")}

                <section className="container mt-10 mb-5">
                    <h2>Icons</h2>
                    <p>
                        Use Visual Languages's icons.
                    </p>

                    {sectionTitle("Status Icons")}
                    <p className="small">
                        Use the property <code>shape</code> to set the outer shape of the component,
                        <code>status</code> to choose a specific icon depicting a status and optionally
                        <code>pulse</code> to flag the pulse effect once.
                        Use <code>size</code> to resize the icon from its default value (24px).
                    </p>
                    <div className="my-3">
                        <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_SUCCESS} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_WARNING} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_ERROR} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_SYNC} className={"mx-2 d-inline-block"}/>
                    </div>
                    <div className="my-3">
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_SUCCESS} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_WARNING} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_ERROR} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_SYNC} className={"mx-2 d-inline-block"}/>
                    </div>
                    <div className="my-3">
                        <StatusIcon shape={SI_SHAPE_INFO} status={SI_STATUS_SUCCESS} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_INFO} status={SI_STATUS_WARNING} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_INFO} status={SI_STATUS_ERROR} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_INFO} status={SI_STATUS_SYNC} className={"mx-2 d-inline-block"}/>
                    </div>
                    <div className="my-3">
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_SUCCESS} pulse={true} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_WARNING} pulse={true} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_ERROR} pulse={true} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_SYNC} pulse={true} className={"mx-2 d-inline-block"}/>
                    </div>
                    <div className="my-3 d-flex align-items-center">
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_SUCCESS} size={"32px"} pulse={true} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_WARNING} size={"48px"} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_ERROR} size={"64px"} className={"mx-2 d-inline-block"}/>
                        <StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_SYNC} size={"128px"} className={"mx-2 d-inline-block"}/>
                    </div>

                    {sectionTitle("Network Type Icons")}
                    <p className="small">
                        Lorem ipsum
                    </p>
                    <div className="my-3">
                        {NT_ALL_TYPES.map(t => <NetworkTypeIcon key={t} type={t} className={"m-2 d-inline-block"}/>)}
                    </div>
                    <div className="my-3 bg-soft-warning">
                        {NT_ALL_TYPES.map(t => <NetworkTypeIcon key={t} type={t} className={"m-2 fill-primary d-inline-block"}/>)}
                    </div>

                    {sectionTitle("Network Context Icons")}
                    <p className="small">
                        Lorem ipsum
                    </p>
                    <div className="my-3">
                        {NC_ALL_TYPES.map(t => <NetworkContextIcon key={t} type={t} className={"m-2 d-inline-block"}/>)}
                    </div>
                    <div className="my-3 bg-soft-warning">
                        {NC_ALL_TYPES.map(t => <NetworkContextIcon key={t} type={t} className={"m-2 fill-primary d-inline-block"}/>)}
                    </div>

                    {sectionTitle("Device Type Icons")}
                    <p className='small'>
                        Lorem ipsum
                    </p>
                    <div className="my-3">
                        {DT_ALL_TYPES.map(t => <DeviceTypeIcon key={t} type={t} className={"m-2 d-inline-block"}/>)}
                    </div>
                    <div className="my-3 bg-soft-warning">
                        {DT_ALL_TYPES.map((t,i) => {
                            const cName = tints[i % tints.length];
                            return <DeviceTypeIcon key={t} type={t} className={`m-2 fill-${cName} d-inline-block`}/>
                        })}
                    </div>

                    {sectionTitle("Contact Type Icons")}
                    <p className="small">
                        Lorem ipsum
                    </p>
                    <div className="my-3">
                        {CT_ALL_TYPES.map(t => <ContactTypeIcon key={t} type={t} className={"m-2 d-inline-block"}/>)}
                    </div>
                    <div className="my-3 bg-soft-warning">
                        {CT_ALL_TYPES.map(t => <ContactTypeIcon key={t} type={t} className={"m-2 fill-primary d-inline-block"}/>)}
                    </div>
                    {sectionTitle("Rating Type Icons")}
                    <p className="small">
                        Lorem ipsum
                    </p>
                    <div className="my-3">
                        <div className="d-inline-flex">
                            <RatingTypeIcon className="mr-2" type={RTI_STAR} variant={RTI_FULL}/> 
                            <RatingTypeIcon className="mr-2" type={RTI_STAR} variant={RTI_EMPTY}/> 
                            <RatingTypeIcon type={RTI_STAR} variant={RTI_HALF}/>                            <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_WARNING} className={"mx-2 d-inline-block"}/>
                        </div>
                        <div className="d-inline-flex">
                            <RatingTypeIcon className="mr-2" type={RTI_HEART} variant={RTI_FULL}/> 
                            <RatingTypeIcon className="mr-2" type={RTI_HEART} variant={RTI_EMPTY}/> 
                            <RatingTypeIcon type={RTI_HEART} variant={RTI_HALF}/>                            <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_WARNING} className={"mx-2 d-inline-block"}/>
                        </div>
                        <div className="d-inline-flex">
                            <RatingTypeIcon className="mr-2" type={RTI_DOT} variant={RTI_FULL}/> 
                            <RatingTypeIcon className="mr-2" type={RTI_DOT} variant={RTI_EMPTY}/> 
                            <RatingTypeIcon type={RTI_DOT} variant={RTI_HALF}/>                            <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_WARNING} className={"mx-2 d-inline-block"}/>
                        </div>
                        <div className="d-inline-flex">
                            <RatingTypeIcon className="mr-2" type={RTI_BOLT} variant={RTI_FULL}/> 
                            <RatingTypeIcon className="mr-2" type={RTI_BOLT} variant={RTI_EMPTY}/> 
                            <RatingTypeIcon type={RTI_BOLT} variant={RTI_HALF}/>                            <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_WARNING} className={"mx-2 d-inline-block"}/>
                        </div>
                    </div>
                    {sectionTitle("Generic Icons")}
                    <p className="small">
                        Lorem ipsum
                    </p>
                    <div className="my-3 d-inline-flex">
                        {GEN_ALL_TYPES.map(t => <GenericIcon key={t} type={t} className={"m-2"}/>)}
                    </div>
                    {sectionTitle("Support Icons")}
                    <p className="small">
                        Lorem ipsum
                    </p>
                    <div className="my-3 d-inline-flex">
                        {SI_ALL_TYPES.map(t => <SupportIcon key={t} type={t} className={"m-2"}/>)}
                    </div>
                    {sectionTitle("Achieve Icons")}
                    <p className="small">
                        Lorem ipsum
                    </p>
                    <div className="my-3">
                        {AI_ALL_TYPES.map(t => <AchievementIcon key={t} type={t} className={"m-2 d-inline-block"}/>)}
                    </div>
                    {sectionTitle("Tool Icons")}
                    <p className="small">
                        Lorem ipsum
                    </p>
                    <div className="my-3">
                        {TOOL_ALL_TYPES.map(t => <ToolIcon key={t} type={t} className={"m-2 d-inline-block"}/>)}
                    </div>

                    

                </section>
            </>);
    }

}