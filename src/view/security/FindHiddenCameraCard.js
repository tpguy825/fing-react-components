
import React from 'react';
import PropTypes from 'prop-types';
import intl from "react-intl-universal";
import { convertToHiddenCameraResult } from '../hiddencamera/HiddenCameraLogic';
import SecurityCardButton from './SecurityCardButton';
import { SCRD_STATUS_FAIL, SCRD_STATUS_INACTIVE, SCRD_STATUS_OK, SCRD_STATUS_WARN } from '../../model/Constants';
import SecurityCard from './SecurityCard';
import SecurityCardController from './SecurityCardController';
import { SI_STATUS_SYNC } from '../../component/icons/StatusIcon';

export default class FindHiddenCameraCard extends SecurityCardController {
    computeCardStatus() {
        const { discovery, running, enabled } = this.props;

        const item = discovery ? convertToHiddenCameraResult(discovery, running ? 90 : 100, null) : null;

        if (!enabled) {
            return SCRD_STATUS_WARN;
        } else if (item.unknownCameras.length >= 1) {
            return SCRD_STATUS_FAIL;
        }
        
        return SCRD_STATUS_OK;
    }

    renderCard() {
        const { discovery, enabled, onClickHiddenCamera } = this.props;

        if (!discovery) {
            return null;
        }

        const cardStatus = this.getCardStatus();
        const { title, subtitle, icon } = this.getTexts(cardStatus);

        return <SecurityCard hasBadge
            status={cardStatus}
            title={title}
            subtitle={subtitle}
            icon={icon}
        >
            <SecurityCardButton 
                action={onClickHiddenCamera}
                title={intl.get('generic_see_result')}
                disabled={!enabled}
            />
        </SecurityCard>;
    }

    getTexts(cardStatus) {
        const { discovery, running } = this.props;

        const item = discovery ? convertToHiddenCameraResult(discovery, running ? 90 : 100, null) : null;

        let icon;
        let title;
        let subtitle;

        if (cardStatus === SCRD_STATUS_INACTIVE) {
            title = intl.get('findhiddencameras_toolresult_premium_title');
            subtitle = intl.get('findhiddencameras_toolresult_premium_subtitle');
        } else if (running) {
            icon = SI_STATUS_SYNC;
            title = intl.get("findhiddencameras_toolresult_sync_title");
            subtitle = intl.get("findhiddencameras_toolresult_sync_subtitle");
        } else if (item.unknownCameras.length >= 1) {
            title = intl.get("findhiddencameras_toolresult_danger_title");
            subtitle = intl.get('findhiddencameras_toolresult_danger_subtitle', { length: item.unknownCameras.length });

            if (item.globalRecognizedCamerasCount) {
                subtitle += intl.get('findhiddencameras_toolresult_fingpedia_stats', { length: item.globalRecognizedCamerasCount });
            }
        } else if (item.knownCameras.length >= 1) {
            title = intl.get("findhiddencameras_toolresult_success_title");
            subtitle = intl.get('findhiddencameras_toolresult_success_subtitle', { length: item.knownCameras.length });

            if (item.globalRecognizedCamerasCount) {
                subtitle += intl.get('findhiddencameras_toolresult_fingpedia_stats', { length: item.globalRecognizedCamerasCount });
            }
        } else if (item.knownCameras.length === 0) {
            title = intl.get("findhiddencameras_toolresult_success_nofound_title");
            subtitle = intl.get('findhiddencameras_toolresult_success_nofound_subtitle', { length: item.activeDeviceCount });

            if (item.globalRecognizedCamerasCount) {
                subtitle += intl.get('findhiddencameras_toolresult_fingpedia_stats', { length: item.globalRecognizedCamerasCount });
            }
        }

        return {
            title,
            subtitle,
            icon
        };
    }
}

FindHiddenCameraCard.propTypes = {
    onClickHiddenCamera: PropTypes.func,
    discovery: PropTypes.object,
    enabled: PropTypes.bool,
    running: PropTypes.bool
};
