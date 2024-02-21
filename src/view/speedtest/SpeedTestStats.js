
import React, {Component} from 'react';
import { TINT_PRIMARY, GEN_INFO } from '../../model/Constants';
import GenericIcon from '../../component/icons/GenericIcon';
import intl from 'react-intl-universal';
import ModalDialog, {
    hideDialogById,
    ModalDialogBody,
    showDialogById
} from '../../component/ModalDialog';
import PropTypes from 'prop-types';

const INFO_SPEED_TEST_DIALOG = "INFO_SPEED_TEST_DIALOG";

export default class SpeedTestStats extends Component {

    render() {
        const {result} = this.props;
        const cName = 'list-inline-item text-dark'
        return(
            <div className="d-inline-flex align-items-center">
                <ul className="list-inline list-separator mr-3">
                    <li className={cName}>
                        {intl.get('speedtest_stats_ping')}<strong className="ml-2">{result.getPing() + 'ms'}</strong>
                    </li>
                    <li className={cName}>
                        {intl.get('speedtest_stats_jitter')}<strong className="ml-2">{result.getJitter()+'ms'}</strong>
                    </li>
                    <li className={cName}>
                        {intl.get('speedtest_stats_loss')}<strong className="ml-2">{result.getLoss()+'%'}</strong>
                    </li>
                </ul>
                <a role="button" onClick={() => showDialogById(INFO_SPEED_TEST_DIALOG)}>
                    <GenericIcon    size={16} 
                                    type={GEN_INFO} 
                                    color={TINT_PRIMARY}/>
                </a>
                {this.renderInfoDialog()}
            </div>
        )
    }

    renderInfoDialog() {
        const onClose = () => hideDialogById(INFO_SPEED_TEST_DIALOG);
        return (
            <ModalDialog id={INFO_SPEED_TEST_DIALOG} title={intl.get('speedtest_mlab_title')} onClose={onClose}>
                <ModalDialogBody>
                    <p>{intl.get('speedtest_mlab_body')}</p>
                    <div className="row">
                        <dt className="col-2">{intl.get('speedtest_download')}</dt>
                        <dd className="col-10">{intl.get('speedtest_download_info')}</dd>
                    </div>
                    <div className="row">
                        <dt className="col-2">{intl.get('speedtest_upload')}</dt>
                        <dd className="col-10">{intl.get('speedtest_upload_info')}</dd>
                    </div>
                    <div className="row">
                        <dt className="col-2">{intl.get('speedtest_stats_ping')}</dt>
                        <dd className="col-10">{intl.get('speedtest_stats_ping_info')}</dd>
                    </div>
                    <div className="row">
                        <dt className="col-2">{intl.get('speedtest_stats_jitter')}</dt>
                        <dd className="col-10">{intl.get('speedtest_stats_jitter_info')}</dd>
                    </div>
                    <div className="row">
                        <dt className="col-2">{intl.get('speedtest_stats_loss')}</dt>
                        <dd className="col-10">{intl.get('speedtest_stats_loss_info')}</dd>
                    </div>
                </ModalDialogBody>
            </ModalDialog>
        );
    }
}
SpeedTestStats.propTypes = {
    result: PropTypes.object
};