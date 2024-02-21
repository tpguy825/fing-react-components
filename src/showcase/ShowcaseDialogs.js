import React, {Component} from "react";
import {pageNavigationBar, sectionTitle} from "./ShowcaseUtils";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../component/ActionButton";
import ModalDialog, {
    hideDialogById,
    ModalDialogBody,
    ModalDialogFooter,
    showDialogById
} from "../component/ModalDialog";
import ModalSidebar, {ModalSidebarBody, ModalSidebarFooter, sidebarOptions} from "../component/ModalSidebar";
import ScheduleHoursDialog from "../component/ScheduleHoursDialog";
import { TINT_PRIMARY } from "../model/Constants";
import EmptyState from "../component/EmptyState";
import SendReportDialog from "../component/SendReportDialog";
import IAMDialog from "../component/IAMDialog";
import OptionBar from "../component/OptionBar";
import RatingEditDialog from "../component/RatingEditDialog";
import {RTI_STAR} from "../component/icons/RatingTypeIcon";

const BASIC_DIALOG = "SIMPLE_DIALOG";
const SMALL_DIALOG = "SMALL_DIALOG";
const SCHEDULE_DIALOG = "SCHEDULE_DIALOG";
const SEND_REPORT_DIALOG = "SEND_REPORT_DIALOG";
const RATING_DIALOG = "RATING_DIALOG";

export default class ShowcaseDialogs extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            values:[],
            sendReportTime: 0,
            sendReportCompleted: false
        }
    }

    render() {
        return (
            <>
                {pageNavigationBar("Dialogs")}

                <section className="container mt-10 mb-5">
                    <h2>Dialogs</h2>
                    <p>
                        Use Visual Languages's modal dialogs to interrupt user's workflow to get a specific answer.
                    </p>
                    <div className="bg-dark rounded-lg p-4 text-monospace font-size-1 text-white-70">
                        <span className="d-block">import ModalDialog, &#123;showDialog, shouldShowDialog, hideDialog&#125; from "../component/ModalDialog";</span>
import { TINT_PRIMARY } from '../model/Constants';
                        <span className="d-block">&nbsp;...&nbsp;</span>
                        <span className="d-block">{"<ActionButton action={() => showDialog(this, SIMPLE_DIALOG)} title='Show basic dialog' />"}</span>
                        <span className="d-block">&#123;shouldShowDialog(this, SIMPLE_DIALOG) && this.renderSimpleDialog()&#125;</span>
                        <span className="d-block">&nbsp;...&nbsp;</span>
                        <span className="d-block">{"<ModalDialog title={'Basic Dialog'} onClose={() => hideDialog(this)}></ModalDialog>"}</span>
                    </div>

                    {sectionTitle('Basic dialog')}
                    <p className='small'>
                        Use the state's <code>activeDialogName</code> to set the name of the dialog to be displayed.
                        Set it to <code>null</code> to close it
                    </p>
                    <ActionButton action={() => showDialogById(BASIC_DIALOG)} title="Show basic dialog" className={"mx-2"} />
                    {this.renderBasicDialog()}

                    <ActionButton action={() => showDialogById(SMALL_DIALOG)} title="Show small dialog" className={"mx-2"} />
                    {this.renderSmallDialog()}

                    

                    {sectionTitle('Schedule dialog')}
                    <ActionButton action={() => showDialogById(SCHEDULE_DIALOG)} title="Show schedule dialog" className={"mx-2"} />
                    {this.renderScheduleDialog()}

                    {sectionTitle('Send report dialog')}
                    <ActionButton action={() => showDialogById(SEND_REPORT_DIALOG)} title="Show report dialog" className={"mx-2"} />
                    {this.renderSendReportDialog()}


                    {sectionTitle("Sidebar")}
                    {this.renderSidebar()}

                    {sectionTitle("IAM")}
                    {this.renderIAMDialogs()}

                    {sectionTitle("App Rating")}
                    <ActionButton action={() => showDialogById(RATING_DIALOG)} title="Show App rating dialog" className={"mx-2"} />
                    {this.renderAppRatingDialog()}

                </section>
            </>);
    }

    renderSendReportDialog() {
        const onClose = () => { hideDialogById(SEND_REPORT_DIALOG); };
        const onConfirm = (email) => {
            console.log("Sending report to " + email);
            this.setState({sendReportCompleted: true});
        };
        const emptyState = <EmptyState  className="my-2 w-80 mx-auto"
                                        title={"Title empty state"}
                                        subtitle={"Title empty state"}/>
        return <SendReportDialog    id={SEND_REPORT_DIALOG} 
                                    email={"marco@fing.com"}
                                    title={"Report dialog title"}
                                    emptyState={emptyState}
                                    bodyText={"Report dialog body"}
                                    hasPremium={true}
                                    completed={this.state.sendReportCompleted}
                                    onClose={onClose} onConfirm={onConfirm} />
    }

    renderScheduleDialog(){
        const onClose = () => hideDialogById(SCHEDULE_DIALOG);
        const onConfirm = (values) => {
            this.setState({values: values});
            hideDialogById(SCHEDULE_DIALOG);
        }
        return <ScheduleHoursDialog id={SCHEDULE_DIALOG}
                                    color={TINT_PRIMARY}
                                    max={3}
                                    editable={false}
                                    values={[10]}
                                    onConfirmDialog={onConfirm}
                                    onCloseDialog={onClose}/>
    }

    renderBasicDialog() {
        const onClose = () => hideDialogById(BASIC_DIALOG);
        return <ModalDialog id={BASIC_DIALOG} title={"Basic Dialog"} onClose={onClose}>
            <ModalDialogBody>Body</ModalDialogBody>
            <ModalDialogFooter>
                <ActionButton action={onClose} title="Close" type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} />
                <ActionButton action={onClose} title="Save changes" />
            </ModalDialogFooter>
        </ModalDialog>;
    }

    renderSmallDialog() {
        const onClose = () => hideDialogById(SMALL_DIALOG);
        return <ModalDialog id={SMALL_DIALOG} title={"Schedule your vulnerability test"} size={"modal-sm"} onClose={onClose}>
            <ModalDialogBody>
                <OptionBar className="w-60 mx-auto"
                           vertical={true}
                           activeIndex={1}>
                    <small>Disabled</small>
                    <small>Every 1 day</small>
                    <small>Every 2 days</small>
                    <small>Every 7 days</small>
                </OptionBar>
            </ModalDialogBody>
            {/*<ModalDialogFooter>*/}
            {/*    <ActionButton action={onClose} title="Close" type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} />*/}
            {/*    <ActionButton action={onClose} title="Save changes" />*/}
            {/*</ModalDialogFooter>*/}
        </ModalDialog>;
    }

    renderSidebar() {
        return (
            <>
                <div className="hs-unfold">
                    <a className="js-hs-unfold-invoker btn btn-sm btn-secondary"
                       href="javascript:"
                       data-hs-unfold-options={sidebarOptions("sidebar_showcase")}>Sidebar Toggler</a>
                </div>
                <ModalSidebar id={"sidebar_showcase"}>
                    <ModalSidebarBody>
                        <h4 className="h5">Sidebar content</h4>
                        <p>This is where we sit down, grab a cup of coffee and dial in the details. Understanding the
                            task at hand and ironing out the wrinkles is a key point.</p>
                    </ModalSidebarBody>

                    <ModalSidebarFooter className="border-top py-2 px-4">
                        <ul className="nav nav-sm">
                            <li className="nav-item">
                                <a className="nav-link pl-0" href="#">Privacy</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Terms</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="fas fa-info-circle la-lg"/>
                                </a>
                            </li>
                        </ul>
                    </ModalSidebarFooter>

                </ModalSidebar>
            </>
        );
    }

    renderIAMDialogs() {
        const IAM_MODAL_DIALOG = "IAM_MODAL_DIALOG";
        const IAM_IMAGE_DIALOG = "IAM_IMAGE_DIALOG";
        const IAM_CARD_DIALOG = "IAM_CARD_DIALOG";
        const IAM_TOP_BANNER_DIALOG = "IAM_TOP_BANNER_DIALOG";
        const onModalClose = () => hideDialogById(IAM_MODAL_DIALOG);
        const onImageClose = () => hideDialogById(IAM_IMAGE_DIALOG);
        const onCardClose = () => hideDialogById(IAM_CARD_DIALOG);
        const onTopBannerClose = () => hideDialogById(IAM_TOP_BANNER_DIALOG);

        const modalMessageStyle = {
            layout: "MODAL",
            title: "FAI IL TUO SPEEDTEST",
            body: "Fai il tuo speedtest",
            image: "https://placekitten.com/300/200",
            primaryButton: {
                text: "VAI",
                action: "modal-test-action"
            }
        };

        const imageMessageStyle = {
            layout: "IMAGE",
            image: "https://placekitten.com/400/200",
            primaryButton: {
                text: "Get started",
                action: "image-test-action"
            }
        };

        const cardMessageStyle = {
            layout: "CARD",
            title: "FAI IL TUO SPEEDTEST",
            body: "Fai il tuo speedtest",
            image: "https://placekitten.com/500/300",
            primaryButton: {
                text: "VAI",
                action: "card-test-action"
            }
        };

        const topBannerMessageStyle = {
            layout: "TOP_BANNER",
            title: "FAI IL TUO SPEEDTEST",
            body: "Fai il tuo speedtest",
            image: "https://placekitten.com/100/50",
            primaryButton: {
                action: "top-banner-action"
            }
        };

        const onAction = action => console.log(action);

        return <>
            <ActionButton action={() => showDialogById(IAM_MODAL_DIALOG)} title="Show modal dialog" className={"mx-2"} />
            <IAMDialog id={IAM_MODAL_DIALOG} message={modalMessageStyle} onClose={onModalClose} onAction={onAction} />
            <ActionButton action={() => showDialogById(IAM_IMAGE_DIALOG)} title="Show image dialog" className={"mx-2"} />
            <IAMDialog id={IAM_IMAGE_DIALOG} message={imageMessageStyle} onClose={onImageClose} onAction={onAction} />
            <ActionButton action={() => showDialogById(IAM_CARD_DIALOG)} title="Show card dialog" className={"mx-2"} />
            <IAMDialog id={IAM_CARD_DIALOG} message={cardMessageStyle} onClose={onCardClose} onAction={onAction} />
            <ActionButton action={() => showDialogById(IAM_TOP_BANNER_DIALOG)} title="Show top banner dialog" className={"mx-2"} />
            <IAMDialog id={IAM_TOP_BANNER_DIALOG} message={topBannerMessageStyle} onClose={onTopBannerClose} onAction={onAction} />
        </>;
    }

    renderAppRatingDialog() {
        const onClose = () => {
            hideDialogById(RATING_DIALOG);
        };
        const onConfirm= (ratingResult) => {
            hideDialogById(RATING_DIALOG);

            window.alert("Your rated " + (ratingResult.name !== null ? ratingResult.name : '' )
                + " with " + (ratingResult.value !== null ? ratingResult.value : 0 )+
                " with comment " + (ratingResult.comment !== null ? ratingResult.comment : '') );
        };

        return <RatingEditDialog    id={RATING_DIALOG}
                                    type={RTI_STAR}
                                    subjectImageLogo={"https://cdn.fing.io/images/isp/general/default_isp.png"}
                                    subjectName={"Fing"}
                                    ratingColor={TINT_PRIMARY}
                                    comment={"It's awesome"}
                                    value={4}
                                    onClose={onClose}
                                    onConfirm={onConfirm} />
    }

}