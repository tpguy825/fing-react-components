import React, {Component} from 'react';
import PropTypes from 'prop-types';

import intl from "react-intl-universal";
import DeviceTypeIcon from "../../component/icons/DeviceTypeIcon";
import StatusIcon, {SI_SHAPE_SHIELD, SI_STATUS_DANGER, SI_STATUS_SUCCESS} from "../../component/icons/StatusIcon";
import {TINT_DANGER, TINT_SUCCESS} from "../../model/Constants";

export default class CameraTypesSummaryPanel extends Component {

    getNameFromCameraType(type){
        switch(type){
            case "SURVEILLANCE_CAMERA":
                return intl.get('devicetype_surveillance_camera');
            case "PHOTO_CAMERA":
                return intl.get('devicetype_photo_camera');
            case "SECURITY_SYSTEM":
                return intl.get('devicetype_security_system');
            case "MOTION_DETECTOR":
                return intl.get('devicetype_motion_detector');
            case "BABY_MONITOR":
                return intl.get('devicetype_baby_monitor');
            default:
                return '';
        }
    }

    render() {
        const {cameraTypes} = this.props;
        if (!cameraTypes) return "";

        return (
            <div>
                <h4 className="card-title mb-2">{intl.get('findhiddencameras_summary_title')}</h4>
                {React.Children.toArray(Object.keys(cameraTypes).map(key => this.renderRow(cameraTypes[key], key)))}
            </div>
        )
    }

    renderRow(cameraInfoForType, deviceType) {
        let currentType = cameraInfoForType;
        const tot = currentType.countKnown + currentType.countUnknown;
        let subtitle = "";
        let iconTint;
        let iconBackgroundTint;
        let statusType;

        if (tot === 0) {
            subtitle = intl.get('findhiddencameras_helper_0found');
            iconBackgroundTint = "bg-soft-success";
            statusType = SI_STATUS_SUCCESS;
            iconTint = TINT_SUCCESS;
        } else {
            let totDeviceString = tot === 1 ? intl.get('findhiddencameras_helper_totdevice_1found') : intl.get('findhiddencameras_helper_totdevice_manyfound', {tot: tot});
            if (currentType.countUnknown > 0) {
                subtitle = tot === currentType.countUnknown ? 
                    intl.get('findhiddencameras_helper_totdevice', {totDeviceString: totDeviceString}) : 
                    intl.get('findhiddencameras_helper_totdevice_with_unknown', {
                        totDeviceString: totDeviceString,
                        countUnknown: currentType.countUnknown
                    });
                iconBackgroundTint = "bg-soft-danger";
                statusType = SI_STATUS_DANGER;
                iconTint = TINT_DANGER;
            } else {
                subtitle = intl.get('findhiddencameras_helper_totdevice', {totDeviceString: totDeviceString});
                iconBackgroundTint = "bg-soft-success";
                statusType = SI_STATUS_SUCCESS;
                iconTint = TINT_SUCCESS;
            }
        }

        return (
            <div className="d-flex py-2">
                <div className="flex-shrink-0 mr-4">
                    <div className={`avatar avatar-circle text-center align-items-center p-2 ${iconBackgroundTint}`}>
                        <DeviceTypeIcon tint={iconTint} type={deviceType} width={26} height={26}/>
                    </div>
                </div>
                <div className="flex-grow-1 mr-4">
                    <h5 className="mb-0">{this.getNameFromCameraType(deviceType)}</h5>
                    <span className="d-block">{subtitle}</span>
                </div>
                <div>
                    <StatusIcon shape={SI_SHAPE_SHIELD} status={statusType} width={24} height={24} />
                </div>
            </div>
        )
    }
}

CameraTypesSummaryPanel.propTypes = {
    cameraTypes: PropTypes.any
};
