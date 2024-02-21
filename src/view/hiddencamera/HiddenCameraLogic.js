import intl from "react-intl-universal";
import {NS_UP} from "../../model/Constants";
import NetNode from "../../model/NetNode";

const CameraType = [
    "SURVEILLANCE_CAMERA", 
    "PHOTO_CAMERA", 
    "SECURITY_SYSTEM", 
    "MOTION_DETECTOR", 
    "BABY_MONITOR"
];

export class HiddenCameraResult {
    knownCameras = [];
    unknownCameras = [];
    unrecognizedCameras = [];

    countersForCameraType;

    // Stats
    activeDeviceCount = 0;
    globalRecognizedCamerasCount = 0;

    progress = 0;

    getDetectedCameras(){
        let detectedCameras = [];
        if (this.unknownCameras && this.unknownCameras.length > 0) detectedCameras = detectedCameras.concat(this.unknownCameras);
        if (this.knownCameras && this.knownCameras.length > 0) detectedCameras = detectedCameras.concat(this.knownCameras);
        return detectedCameras;
    }
}

/**
 * TODO: @Tammaro to update
 * @returns {HiddenCameraResult} A speed test state result object
 */
export function convertToHiddenCameraResult(discovery, progress, recogStats) {
    const testResult = new HiddenCameraResult();
    if(discovery && discovery.nodes){
        const netNodes = discovery.nodes.map(netNode => new NetNode().applyFromAgentData(netNode))
        setCameraData(testResult, netNodes);
    }
    if(progress){
        setProgress(testResult, progress);
    }
    if(recogStats){
        setCameraCatalogStats(testResult, recogStats);
    }
    return testResult;
}

function setProgress(testResult, progress) {
    testResult.progress = Number(progress);
}

function isUnknown(device) {
    return !device.customChangeTime || device.customChangeTime === 0;
}

function setCameraData(testResult, netNodes) {
    testResult.unknownCameras = [];
    testResult.knownCameras = [];
    testResult.unrecognizedCameras = [];

    let activeDeviceCount = 0;
    const countersForCameraType = {
        SURVEILLANCE_CAMERA: { countKnown: 0, countUnknown: 0, name: intl.get('findhiddencameras_helper_type_ipcamera')},
        PHOTO_CAMERA: { countKnown: 0, countUnknown: 0, name: intl.get('findhiddencameras_helper_type_photocamera')},
        SECURITY_SYSTEM: { countKnown: 0, countUnknown: 0, name: intl.get('findhiddencameras_helper_type_securitysystem')},
        MOTION_DETECTOR: { countKnown: 0, countUnknown: 0, name: intl.get('findhiddencameras_helper_type_monitordetector')},
        BABY_MONITOR: { countKnown: 0, countUnknown: 0, name: intl.get('findhiddencameras_helper_type_babymonitor') }
    }
    if (netNodes) {
        
        for (let netNode of netNodes) {
            if (netNode.state !== NS_UP) continue;
            activeDeviceCount++;

            const cameraType = netNode.bestType;
            const counter = countersForCameraType[cameraType];
            if (counter) {
                if (isUnknown(netNode)) {
                    testResult.unknownCameras.push(netNode);
                    counter.countUnknown++;
                } else {
                    testResult.knownCameras.push(netNode);
                    counter.countKnown++;
                }
            }

            if (netNode.bestModelId && (!netNode.isFamily || netNode.isFamily === false)) {
                // countBySh['Full recognition'] = countBySh['Full recognition'] + 1;
            } else if ((cameraType || netNode.bestMake) && (!netNode.bestModelId || true === netNode.isFamily)) {
                // countBySh['Partial recognition'] = countBySh['Partial recognition'] + 1;
            } else {
                testResult.unrecognizedCameras.push(netNode);
            }
        }
    }

    testResult.countersForCameraType = countersForCameraType;
    testResult.activeDeviceCount = activeDeviceCount;
}

function setCameraCatalogStats(testResult, recogStats) {
    let amount = 0;
    if (recogStats && recogStats.totalsByType) {
        for (let type of recogStats.totalsByType) {
            if (CameraType.indexOf(type.name) !== -1) {
                amount = amount + Number(type.value);
            }
        }
    }

    testResult.setGlobalStatsData = amount;
}