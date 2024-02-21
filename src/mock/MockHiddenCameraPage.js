
import React, { Component } from 'react';
import intl from "react-intl-universal";
import ActionButton, { BTN_TINT_DARK, BTN_TINT_PRIMARY, BTN_TYPE_DEFAULT, BTN_TYPE_GHOST } from '../component/ActionButton';
import StatusIcon, { SI_SHAPE_SHIELD } from '../component/icons/StatusIcon';
import NavigationBar from '../component/NavigationBar';
import ToolHeader from '../component/ToolHeader';
import { convertToHiddenCameraResult } from '../view/hiddencamera/HiddenCameraLogic';
import MockSidebar from './MockSidebar';
import DataDiscoveryStateWithSpycams from './data/DataDiscoveryStateWithSpycams.json';
import DataFingpediaStats from './data/DataFingpediaStats.json';
import EmptyState from '../component/EmptyState';
import NoCameraFound from '../assets/svg/storyset/no-camera-found.svg';
import AnalysisInProgressImage from "../assets/svg/storyset/analyzing.svg";
import CameraTypesSummaryPanel from '../view/hiddencamera/CameraTypesSummaryPanel';
import HiddenCameraDeviceTable from '../view/hiddencamera/HiddenCameraDeviceTable';

export default class MockHiddenCameraPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            item: convertToHiddenCameraResult(
                DataDiscoveryStateWithSpycams.discovery,
                DataDiscoveryStateWithSpycams.progress,
                DataFingpediaStats.recogCatalogStats
            )
        }
    }

    // --------------------------------------------------------------------------------
    // MAIN RENDER
    // --------------------------------------------------------------------------------

    render() {
        return (
            <>
                <MockSidebar active="HOME" />
                {this.renderHeader()}
                {this.renderMain()}
            </>
        );
    }
    renderHeader() {
        return <header id="header" className="header header-sticky-top bg-white container-fluid p-2 app-header">
            <NavigationBar
                left={<ActionButton 
                    route="/" 
                    title="Home" 
                    icon='fa-arrow-left'
                    type={BTN_TYPE_GHOST} 
                    tint={BTN_TINT_DARK} 
                    rounded={true}/>}
                right={<ActionButton
                    title={intl.get("generic_refresh")}
                    type={BTN_TYPE_DEFAULT}
                    tint={BTN_TINT_PRIMARY}
                    rounded={true}/>}
                title={"A mock for hidden cameras"}
            />
        </header>
    }
    renderMain() {
        const { item } = this.state;
        let resultState = "sync";
        let titleState = intl.get('findhiddencameras_toolresult_sync_title');
        let subtitleState = intl.get('findhiddencameras_toolresult_sync_subtitle');

        if (item.unknownCameras.length >= 1) {
            resultState = "danger";
            titleState = intl.get('findhiddencameras_toolresult_danger_title');
            subtitleState = intl.get('findhiddencameras_toolresult_danger_subtitle', { length: item.unknownCameras.length });
    
            if (item.globalRecognizedCamerasCount) {
                subtitleState += intl.get('findhiddencameras_toolresult_fingpedia_stats', { length: item.globalRecognizedCamerasCount });
            }
        } else if (item.knownCameras.length >= 1) {
            resultState = "success";
            titleState = intl.get('findhiddencameras_toolresult_success_title');
            subtitleState = intl.get('findhiddencameras_toolresult_success_subtitle', { length: item.knownCameras.length });
    
            if (item.globalRecognizedCamerasCount) {
                subtitleState += intl.get('findhiddencameras_toolresult_fingpedia_stats', { length: item.globalRecognizedCamerasCount });
            }
        } else if (item.knownCameras.length === 0) {
            resultState = "success";
            titleState = intl.get('findhiddencameras_toolresult_success_nofound_title');
            subtitleState = intl.get('findhiddencameras_toolresult_success_nofound_subtitle', { length: item.activeDeviceCount });
    
            if (item.globalRecognizedCamerasCount) {
                subtitleState += intl.get('findhiddencameras_toolresult_fingpedia_stats', { length: item.globalRecognizedCamerasCount });
            }
        }
        return (
            <main className="app-main">
                <div className="container-fluid space-2 px-6">
                    <ToolHeader 
                        title={titleState} 
                        subtitle={subtitleState}
                        statusIcon={<StatusIcon shape={SI_SHAPE_SHIELD} status={resultState} />}/>
                    {this.renderTool(item)}
                </div>
            </main>
        )
    }

    renderTool(item){
        if(item.progress !== 100){
            return (
                <div className="row mt-3 align-items-top">
                    <div className="col-lg-8 offset-lg-2">
                        <EmptyState
                            image={AnalysisInProgressImage}
                            title={intl.get('findhiddencameras_progress_title')}
                            subtitle={intl.get('findhiddencameras_progress_subtitle', {progress: item.progress})}
                            caption={intl.get('findhiddencameras_progress_title')} />
                    </div>
                </div>
            )
        }
        const detectedCameras = item.getDetectedCameras();
        return (
            <div className="row my-3 align-items-top">
                <div className="col-lg-5">
                    <div className="card shadow-none bg-soft-primary mb-3">
                        <div className="card-body">
                            <CameraTypesSummaryPanel cameraTypes={item.countersForCameraType}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    {detectedCameras.length > 0 &&
                        <h5 className="text-center mt-4">
                            {intl.get('findhiddencameras_foundcameras_title')}
                        </h5>
                    }
                    {detectedCameras.length > 0 && 
                        <HiddenCameraDeviceTable onClickDetail={(netNode) => console.log(netNode)} netNodes={detectedCameras}/>}
                    {item.unrecognizedCameras && item.unrecognizedCameras.length > 0 && <>
                        <h5 className="text-center mt-4">{intl.get('findhiddencameras_unrecognized_title')}</h5>
                        <p className="text-gray-dark">{intl.get('findhiddencameras_unrecognized_subtitle', { length: item.unrecognizedCameras.length })}</p>
                    </>}
                    {item.unrecognizedCameras && item.unrecognizedCameras.length > 0 &&
                        <HiddenCameraDeviceTable onClickDetail={(netNode) => console.log(netNode)} netNodes={item.unrecognizedCameras}/>}
                    {detectedCameras.length === 0 && item.unrecognizedCameras.length === 0 &&
                        <EmptyState
                            image={NoCameraFound}
                            caption={intl.get('findhiddencameras_emptystate_subtitle')}
                            title={intl.get('findhiddencameras_emptystate_title')}
                            subtitle={intl.get('findhiddencameras_emptystate_subtitle')}/>
                    }
                </div>
            </div>
        )
    }
}
