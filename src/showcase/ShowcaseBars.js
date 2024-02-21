import React, {Component} from "react";
import {pageNavigationBar, sectionTitle} from "./ShowcaseUtils";
import NavigationBar from "../component/NavigationBar";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../component/ActionButton";
import {hideDialogById,showDialogById} from "../component/ModalDialog";

import SegmentedBar from "../component/SegmentedBar";
import OptionBar from "../component/OptionBar";
import RatingBar, { RB_SMALL, RB_LARGE, RB_DEFAULT } from '../component/RatingBar';
import RatingEditDialog from "../component/RatingEditDialog";

import ProgressBar, { PB_VISIBLE_WHEN_EMPTY } from "../component/ProgressBar";
import {
    CT_FAMILY_PET,
    CT_FAMILY_PET_CAT,
    CT_FAMILY_PET_DOG,
    NC_RENTAL,
    TINT_NAVY,
    TINT_DANGER,
    TINT_SUCCESS,
    TINT_WARNING,
    TINT_PRIMARY
} from '../model/Constants';
import NetworkContextPicker from "../component/NetworkContextPicker";
import ContactTypeIcon from "../component/icons/ContactTypeIcon";
import { RTI_STAR, RTI_BOLT, RTI_HEART, RTI_DOT} from '../component/icons/RatingTypeIcon';

const RATING_DIALOG_COMMENT = 'RATING_COMMENT';
const RATING_DIALOG_NO_COMMENT = 'RATING_NO_COMMENT';

export default class ShowcaseBars extends Component {
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            value:4,
            comment:'Comment for the dialog with object',
        }

    }

    render() {
        return (
            <>
                {pageNavigationBar("Bars")}

                <section className="container mt-10 mb-5">
                    <h2>Bars</h2>
                    <p>
                        Bars are horizontal blocks that help navigate through the page structure by grouping links
                        and actions together.
                    </p>

                    {sectionTitle('Navigation Bar')}
                    <p className='small'>
                        Use the property <code>left</code> to set the left component, usually the back button,
                        the property <code>title</code> for the title text and the property <code>right</code> to set
                        the component on the right. Each element is optional.
                    </p>
                    <NavigationBar title={"My home network"}/>
                    <NavigationBar
                        left={<ActionButton route="/" title="Back to Home" icon='fa-arrow-left'
                                            type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true} />} />
                    <NavigationBar
                        left={<ActionButton route="/" title="Back to Home" icon='fa-arrow-left'
                                            type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true} />}
                        right={<ActionButton title="Refresh" rounded={true}/>}/>
                    <NavigationBar
                        left={<ActionButton route="/" title="Back to Home" icon='fa-arrow-left'
                                            type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true} />}
                        title={"My home network"}/>
                    <NavigationBar
                        left={<ActionButton route="/" title="Back to Home" icon='fa-arrow-left'
                                            type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true} />}
                        title={"My home network"}
                        right={<ActionButton title="Refresh" rounded={true} />}/>
                    <NavigationBar
                        left={<ActionButton route="/" title="Back to Home" icon='fa-arrow-left'
                                            type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true} />}
                        title={"My home network"}
                        right={<ActionButton title="Refresh" rounded={true} className="text-uppercase" />}/>

                    {sectionTitle('Segmented Bar')}
                    <p className='small'>
                        Use the segmented bar to alternate different views on the same subject.
                    </p>
                    <div className="text-center">
                        <SegmentedBar items={[
                            {label: 'All'},
                            {label: 'Info', disabled: true},
                            {label: 'Warn'},
                            {label: 'Fail', badge: 2, badgeClass: "badge-pill badge-soft-danger"},
                            {label: 'Premium', badge: "New", badgeClass: "badge-pill badge-warning"},
                        ]}>
                            <div>Content for All</div>
                            <div>Content for Info</div>
                            <div>Content for Warn</div>
                            <div>Content for Fail</div>
                            <div>Content for Premium</div>
                        </SegmentedBar>
                    </div>
                    <div className="my-4 text-center">
                        <SegmentedBar activeIndex={2} items={[
                            {icon: 'fas fa-cogs fa-fw'},
                            {icon: 'fas fa-moon fa-fw', disabled: true},
                            {icon: 'fas fa-check fa-fw'},
                            {icon: 'fas fa-info fa-fw'},
                            {icon: 'fas fa-star fa-fw', badge: "New", badgeClass: "badge-pill badge-warning"},
                        ]}/>
                    </div>
                    <div className="my-4">
                        <SegmentedBar className="nav-classic" items={[
                            {label: 'All', badge: 24},
                            {label: 'Info', badge: 7},
                            {label: 'Warn', badge: 0},
                            {label: 'Fail', disabled: true, badge: 2},
                            {label: 'Premium', icon: 'fas fa-star fa-fw', badge: 3},
                        ]}/>
                    </div>
                    <div className="my-4">
                        <SegmentedBar className="nav-tabs" items={[
                            {label: 'All', badge: 24},
                            {label: 'Info', badge: 7},
                            {label: 'Warn', badge: 0},
                            {label: 'Fail', disabled: true, badge: 2},
                            {label: 'Premium', badge: 3},
                        ]} accessory={<small>9 online of 10 • 13 minutes ago</small>}
                        />
                    </div>

                    {sectionTitle('Progress Bar')}
                    <p className='small'>
                        Used to show progress, and can become a separator when not used
                    </p>
                    <div className="my-4">
                        <ProgressBar value={0} visibilityPolicy={PB_VISIBLE_WHEN_EMPTY}/>
                    </div>
                    <div className="my-4">
                        <ProgressBar value={0} barNoSeparator={false} />
                    </div>
                    <div className="my-4">
                        <ProgressBar value={20} />
                    </div>
                    <div className="my-4">
                        <ProgressBar value={40} />
                    </div>
                    <div className="my-4">
                        <ProgressBar value={60} />
                    </div>
                    <div className="my-4">
                        <ProgressBar value={80} barClassName="bg-success" />
                    </div>
                    <div className="my-4">
                        <ProgressBar value={100} />
                    </div>


                    {sectionTitle('Option Bar')}
                    <p className='small'>
                        Used to pick an option, with all options being visible at the same time
                    </p>
                    <div className="text-center">
                        <OptionBar className="w-80 mx-auto"
                                   activeIndex={1}
                                   onOptionSelected={(idx) => {
                                       if (idx === 2) window.alert("Excellent choice!");
                                   }}>
                            <div>Free</div>
                            <div>Premium</div>
                            <div>Professional</div>
                        </OptionBar>
                    </div>
                    <div className="text-center bg-soft-warning py-3 rounded">
                        <NetworkContextPicker className={"mx-auto"} context={NC_RENTAL}
                                              onContextSelected={(ctx) => console.log(`Context selected ${ctx}`)}/>
                    </div>
                    <div className="text-center py-3">
                        <OptionBar className="w-50" checkboxIcon={true}>
                            <OptionBarItem type={CT_FAMILY_PET} label={"Pet"}/>
                            <OptionBarItem type={CT_FAMILY_PET_DOG} label={"Dog"}/>
                            <OptionBarItem type={CT_FAMILY_PET_CAT} label={"Cat"}/>
                        </OptionBar>
                    </div>

                    <div className="text-center">
                        <OptionBar className="w-20 mx-auto"
                                   vertical={true}
                                   activeIndex={1}
                                   onOptionSelected={(idx) => {
                                       if (idx === 2) window.alert("Excellent choice!");
                                   }}>
                            <div>Disabled</div>
                            <div>Every 1 day</div>
                            <div>Every 2 days</div>
                            <div>Every 7 days</div>
                        </OptionBar>
                    </div>


                    {sectionTitle('Rating Bar')}
                    <p>
                        No editable.
                    </p>
                    <div className="d-md-inline-flex d-block">
                        <RatingBar  tint={TINT_DANGER} 
                                    length={5}  
                                    value={1} 
                                    type={RTI_STAR} 
                                    size={RB_SMALL}/>
                        <RatingBar  tint={TINT_SUCCESS} 
                                    length={5}  
                                    value={1.4} 
                                    type={RTI_BOLT}/>
                        <RatingBar  tint={TINT_NAVY} 
                                    length={5}  
                                    value={2} 
                                    type={RTI_HEART} 
                                    size={RB_LARGE}/>
                    </div>
                    <p>
                        Editable without click.
                    </p>
                    <div className="d-md-inline-flex d-block">
                        <RatingBar  tint={TINT_WARNING} 
                                    editable={true} 
                                    length={5} 
                                    value={2.3} 
                                    type={RTI_STAR} 
                                    size={RB_SMALL}/>
                        <RatingBar  tint={TINT_PRIMARY} 
                                    editable={true} 
                                    length={5} 
                                    value={3} 
                                    type={RTI_BOLT} 
                                    size={RB_DEFAULT}/>
                        <RatingBar  tint={TINT_DANGER} 
                                    editable={true} 
                                    length={5} 
                                    value={3.7} 
                                    type={RTI_HEART} 
                                    size={RB_LARGE}/>
                    </div>
                    <p>
                        Editable with dialog without object.
                    </p>
                    <div>
                        <RatingBar  tint={TINT_PRIMARY}
                                    onRatingChanged={(newRating)=>{showDialogById(RATING_DIALOG_NO_COMMENT)}}
                                    editable={true} 
                                    length={5} 
                                    value={0} 
                                    type={RTI_DOT} 
                                    size={RB_DEFAULT}/>
                    </div>
                    <p>
                        Editable with dialog with object.
                    </p>
                    <div>
                        <RatingBar  tint={TINT_PRIMARY} 
                                    onRatingChanged={(newRating)=>{this.setState({value:newRating},() => {showDialogById(RATING_DIALOG_COMMENT)})}}
                                    editable={true} 
                                    length={5} 
                                    value={this.state.value} 
                                    type={RTI_STAR} 
                                    size={RB_LARGE}/>
                    </div>
                    {this.renderEditRatingDialogWithDefault()}
                    {this.renderEditRatingDialogWithoutCommentDefault()}
                    {sectionTitle('Launch Bar')}
                    <p className='small'>
                        Used to launch tools
                    </p>
                </section>
            </>);
    }
    renderEditRatingDialogWithDefault() {
        
        const onClose = () => {
            hideDialogById(RATING_DIALOG_COMMENT);
        };
        const onConfirm= (ratingResult) => {
            hideDialogById(RATING_DIALOG_COMMENT);

            window.alert("Your rated " + (ratingResult.name !== null ? ratingResult.name : '' )
            + " with " + (ratingResult.value !== null ? ratingResult.value : 0 )+ 
            " with comment " + (ratingResult.comment !== null ? ratingResult.comment : '') );
        };
        
        return <RatingEditDialog    id={RATING_DIALOG_COMMENT} 
                                    type={RTI_STAR} 
                                    subjectImageLogo={"https://cdn.fing.io/images/isp/general/default_isp.png"}
                                    subjectName={"Telecom"} 
                                    ratingColor={TINT_PRIMARY} 
                                    comment={this.state.comment} 
                                    value={this.state.value}
                                    onClose={onClose} 
                                    onConfirm={onConfirm} />
    }
    
    renderEditRatingDialogWithoutCommentDefault() {
        
        const onClose = () => {
            hideDialogById(RATING_DIALOG_NO_COMMENT);
        };
        const onConfirm= (ratingResult) => {
            hideDialogById(RATING_DIALOG_NO_COMMENT);

            window.alert("Your rated " + ratingResult.name + " with " + ratingResult.value + 
            " with comment " + ratingResult.comment );
        };
        return <RatingEditDialog    id={RATING_DIALOG_NO_COMMENT}
                                    subjectName={"Telecom"} 
                                    comment={''} 
                                    type={RTI_DOT} 
                                    ratingColor={TINT_PRIMARY}
                                    value={0} 
                                    subjectImageLogo={"https://cdn.fing.io/images/isp/general/default_isp.png"}
                                    onClose={onClose} 
                                    onConfirm={onConfirm} />
    }
}



class OptionBarItem extends Component {
    render() {
        const {selected, type, label} = this.props;
        return <div>
                <span className={`avatar avatar-circle ${selected === true ? "avatar-primary" : "avatar-soft-secondary"}`}>
                    <div className="avatar-initials">
                        <ContactTypeIcon className={`d-inline-block ${selected === true ? "fill-white" : "fill-secondary"}`}
                                            type={type} />
                    </div>
                </span>
            <span className="d-block">{label}</span>
        </div>

    }
}
