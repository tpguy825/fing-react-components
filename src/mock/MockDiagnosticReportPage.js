/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from "react";
import intl from "react-intl-universal";
import NavigationBar from "../component/NavigationBar";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../component/ActionButton";
import ToolHeader from "../component/ToolHeader";
import ProgressBar from "../component/ProgressBar";
import StatusIcon, {SI_SHAPE_CIRCLE, SI_STATUS_SUCCESS, SI_STATUS_SYNC} from "../component/icons/StatusIcon";
import {hideDialogById, showDialogById} from "../component/ModalDialog";
import MockData from "./data/DataDiagnosticReport.json";
import {createMockItem} from "./generators/DiagnosticReportMockGenerator";
import {convertToItemList} from "../view/diagnostic/DiagnosticLogic";
import DiagnosticReportView from "../view/diagnostic/DiagnosticReportView";
import DiagnosticHelpDialog from "../view/diagnostic/DiagnosticHelpDialog";
import DiagnosticEditDialog from "../view/diagnostic/DiagnosticEditDialog";
import DiagnosticMuteDialog from "../view/diagnostic/DiagnosticMuteDialog";
import DiagnosticShareDialog from "../view/diagnostic/DiagnosticShareDialog";
import EmptyChecklistImage from "../assets/svg/storyset/checklist.svg";
import DialogShareImage from "../assets/svg/storyset/workflow.svg";
import MockSidebar from "./MockSidebar";

const STEPS_COUNT = 25;
const HELP_DIALOG = "HELP_DIALOG";
const EDIT_DIALOG = "EDIT_DIALOG";
const MUTE_DIALOG = "MUTE_DIALOG";
const SHARE_DIALOG = "SHARE_DIALOG";

export default class MockDiagnosticReportPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            items: [],
            healthCheck: {},
            dialogItem: null
        };
        this.onToolStart = this.onToolStart.bind(this);
        this.fetchItems = this.fetchItems.bind(this);
        this.fetchHealthCheckReport = this.fetchHealthCheckReport.bind(this);

        this.mockEnabled = false;
    }

    // --------------------------------------------------------------------------------
    // COMPONENT LIFECYCLE
    // --------------------------------------------------------------------------------

    componentDidMount() {
        this.onToolStart();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    onToolStart() {
        this.setState({ items: [] });
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.fetchItems, 500);
    }

    // --------------------------------------------------------------------------------
    // READ OPERATIONS
    // --------------------------------------------------------------------------------

    fetchItems() {
        const { items } = this.state;

        if (this.mockEnabled) {
            // STEP 1: Convert report into UI items
            const mockItems = items.concat(createMockItem(items.length));
            const progress = Math.round((items.length + 1) / STEPS_COUNT * 100);

            // STEP 2: Check progress and stop.
            if (items && items.length >= STEPS_COUNT) {
                // console.log("Tool ended");
                clearInterval(this.intervalId);
                return;
            }

            // STEP 3: Install listeners to open modal dialog windows
            this.enrichItemsWithListeners(mockItems);
            this.setState({
                items: mockItems,
                progress: progress,
                max: STEPS_COUNT
            });

        } else {
            this.fetchHealthCheckReport()
                .then((report) => {
                    // STEP 1: Convert report into UI items
                    const allItems = convertToItemList(report);

                    // STEP 2: Check progress and stop. (Replace with real engine progress)
                    if (items && items.length >= allItems.length) {
                        console.log("Tool ended");
                        clearInterval(this.intervalId);
                        return;
                    }

                    const nextCount = items && items.length ? items.length + 1 : 1;
                    const currentItems = allItems.slice(0, nextCount);
                    const progress = Math.round(nextCount / allItems.length * 100);

                    // STEP 3: Install listeners to open modal dialog windows
                    this.enrichItemsWithListeners(currentItems);
                    this.setState({
                        healthCheck: report,
                        ticketInfo: {},
                        items: currentItems,
                        progress: progress,
                        max: allItems.length
                    });
                })
                .catch((err) => {
                    // TODO: Handle error
                    console.error(err);
                });
        }
    }

    // Simulate real fetch
    async fetchHealthCheckReport() {
        return await new Promise((resolve, reject) => {
            resolve(MockData)
        });
    }

    enrichItemsWithListeners(items) {
        items.forEach((item) => {
            item.onHelp = () => {
                // Callback after setState completes to ensure that React+Bootstrap plays nicely together
                this.setState({ dialogItem: item },
                    () => {showDialogById(HELP_DIALOG);});
            };

            if (item.editable) {
                // Callback after setState completes to ensure that React+Bootstrap plays nicely together
                item.onEdit = () => {
                    this.setState({ dialogItem: item },
                        () => {showDialogById(EDIT_DIALOG);});
                }
            }

            if (item.mutable) {
                item.onMute = () => {
                    // Callback after setState completes to ensure that React+Bootstrap plays nicely together
                    this.setState({ dialogItem: item },
                        () => {showDialogById(MUTE_DIALOG);});
                }
            }

            return item;
        });
    }

    convertToMutedWarnings(healthState) {
        if (!healthState || !healthState.result || !healthState.result.mutedWarnings) return null;
        return healthState.result.mutedWarnings;
    }

    convertToCustomTargets(healthState) {
        if (!healthState || !healthState.result || !healthState.result.reachCustomTargets) return null;
        return healthState.result.reachCustomTargets;
    }

    // --------------------------------------------------------------------------------
    // WRITE OPERATIONS
    // --------------------------------------------------------------------------------

    postCustomTargets(newCustomTargets) {
        console.log("+++ POST DATA +++");
        console.log(newCustomTargets);
    }

    postMutedWarnings(newMutedWarnings) {
        console.log("+++ POST DATA +++");
        console.log(newMutedWarnings);
    }

    postShareTicket(healthCheck) {
        console.log("+++ POST DATA +++");
        console.log(healthCheck);
    }

    postContextPicker(ctx) {
        console.log("+++ POST DATA +++");
        console.log(ctx);
    }

    // --------------------------------------------------------------------------------
    // EDIT OPERATIONS
    // --------------------------------------------------------------------------------

    applyEditItem(newTargets) {
        const { healthCheck } = this.state;

        const reachCustomTargets = this.convertToCustomTargets(healthCheck);
        if (!reachCustomTargets || !newTargets)
            return;

        const newCustomTargets = Object.assign({}, reachCustomTargets);
        newCustomTargets.targets = newTargets
            .split("\n")
            .map(target => target.trim())
            .filter(target => target.length > 0);

        this.postCustomTargets(newCustomTargets);
    }

    applyMuteItem(newItem) {
        const { healthCheck } = this.state;

        // Create a default empty map if it's the first muted warning
        const mutedWarnings = this.convertToMutedWarnings(healthCheck) || {};
        if (!newItem) return;

        const newMutedWarnings = Object.assign({}, mutedWarnings);
        if (!newMutedWarnings.muted) {
            newMutedWarnings.muted = [];
        }

        // Always remove to avoid duplicates. Add only if currently muted
        const itemCode = newItem.code;
        newMutedWarnings.muted = newMutedWarnings.muted.filter(code => code !== itemCode);
        if (newItem.muted) {
            newMutedWarnings.muted.push(itemCode);
        }

        this.postMutedWarnings(newMutedWarnings);
    }

    applyShareTicket() {
        const { healthCheck, ticketInfo } = this.state;

        if (!ticketInfo) {
            this.setState({
                ticketInfo: {
                    status: "PENDING"
                }
            });
        }

        this.postShareTicket(healthCheck);
    }

    applyContextPicked(ctx) {
        const { healthCheck } = this.state;
        if (!healthCheck || !healthCheck.result) return '';
        const newNetwork = Object.assign({}, healthCheck.result.network);
        newNetwork.context = ctx;

        this.postContextPicker(newNetwork);
    }

    // --------------------------------------------------------------------------------
    // RENDER COMPONENT
    // --------------------------------------------------------------------------------

    render() {
        const { items, progress, max } = this.state;
        const completed = items.length;
        const running = progress > 0 && progress < 100;

        return (
            <>
                <MockSidebar active="HOME" />
                <header id="header" className="header header-sticky-top bg-white container-fluid p-2 app-header">
                    <NavigationBar
                        left={<ActionButton route="/" title={intl.get('generic_home')} icon='fa-arrow-left' rounded={true}
                            type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} />}
                        title={"A sample tool"}
                        right={running ?
                            <ActionButton rounded={true} type={BTN_TYPE_GHOST} running={true} title={intl.get('generic_running')} /> :
                            <ActionButton rounded={true} type={BTN_TYPE_GHOST} action={this.onToolStart}
                                title={intl.get('generic_refresh')} />}
                    />
                </header>
                <main className="app-main">
                    <section className="container-fluid space-2">
                        <ToolHeader title={running ? intl.get('healthcheck_status_check_running_title') : intl.get('healthcheck_status_ok_title')}
                            subtitle={running ? intl.get('healthcheck_status_check_running_subtitle', {completed: completed, skipped: (max - completed)}) : intl.get('healthcheck_status_ok_subtitle', {completed: completed})}
                            progressBar={<ProgressBar value={progress} />}
                            statusIcon={<StatusIcon shape={SI_SHAPE_CIRCLE}
                                                    status={running ? SI_STATUS_SYNC : SI_STATUS_SUCCESS}
                                                    pulse={true}
                            />}
                            action={<ActionButton title={intl.get('generic_share')} action={() => showDialogById(SHARE_DIALOG)} disabled={running}
                                chevron="fa-share" />}
                        />
                        <DiagnosticReportView items={items}
                                              grouped={true}
                                              emptyStateImage={EmptyChecklistImage}
                                              onContextPicked={(ctx) => this.applyContextPicked(ctx)} />
                        {this.renderHelpDialog()}
                        {this.renderEditDialog()}
                        {this.renderMuteDialog()}
                        {this.renderShareDialog()}
                    </section>
                </main>
            </>
        );
    }

    renderHelpDialog() {
        const item = this.state.dialogItem;
        if (!item) return '';

        const onClose = () => {
            hideDialogById(HELP_DIALOG);
            this.setState({ dialogItem: null });
        };
        return <DiagnosticHelpDialog id={HELP_DIALOG} item={item} onClose={onClose} onConfirm={onClose} />
    }

    renderShareDialog() {
        const onClose = () => {
            hideDialogById(SHARE_DIALOG);
            this.setState({ dialogItem: null });
        };
        const onConfirm = () => {
            hideDialogById(SHARE_DIALOG);
            this.setState({ dialogItem: null });
            this.applyShareTicket();
        };
        return <DiagnosticShareDialog
                    id={SHARE_DIALOG} dialogImage={DialogShareImage} dialogImageCaption={"Get Free Help"}
                    onClose={onClose} onConfirm={onConfirm} />
    }

    renderEditDialog() {
        const { healthCheck, dialogItem } = this.state;
        if (!dialogItem) return '';

        const reachCustomTargets = this.convertToCustomTargets(healthCheck) || [];

        const onClose = () => {
            hideDialogById(EDIT_DIALOG);
            this.setState({ dialogItem: null });
        };
        const onConfirm = (newTargets) => {
            hideDialogById(EDIT_DIALOG);
            this.setState({ dialogItem: null });
            this.applyEditItem(newTargets);
        };
        return <DiagnosticEditDialog id={EDIT_DIALOG} itemCode={dialogItem.code}
                                      reachCustomTargets={reachCustomTargets}
                                      onClose={onClose} onConfirm={onConfirm} />
    }

    renderMuteDialog() {
        const item = this.state.dialogItem;
        if (!item) return '';

        const onClose = () => {
            hideDialogById(MUTE_DIALOG);
            this.setState({ dialogItem: null });
        };
        const onConfirm = (newItem) => {
            hideDialogById(MUTE_DIALOG);
            this.setState({ dialogItem: null });
            this.applyMuteItem(newItem);
        };
        return <DiagnosticMuteDialog id={MUTE_DIALOG} item={item} onClose={onClose} onConfirm={onConfirm} />
    }

}