
import React, {Component} from 'react';
import {
    AI_VIDEO,
    AI_CALL,
    AI_SOCIAL,
    AI_WORK,
    AI_GAME,
    TINT_WARNING,
    TINT_DARK
} from '../../model/Constants';
import PropTypes from 'prop-types';

import intl from 'react-intl-universal';
import AchievementIcon from "../../component/icons/AchievementIcon";
import RatingBar, {RB_TINY} from "../../component/RatingBar";
import {RTI_DOT} from "../../component/icons/RatingTypeIcon";

export default class SpeedTestAchievementTable extends Component {
    
    render(){
        const {result} = this.props;
        const download = result.getDownloadValue()
        const upload = result.getUploadValue()
        const jitter = result.getJitter()
        const ping = result.getPing()

        return (
            <div>
                <h3 className="mt-10 mb-3">{intl.get('speedtest_achievements')}</h3>
                <table className="table table-sm table-borderless">
                    <tbody>
                        {this.renderVideo(download)}
                        {this.renderCall(download,upload)}
                        {this.renderSocial(download,upload)}
                        {this.renderWork(download,upload)}
                        {this.renderGaming(ping,jitter)}
                    </tbody>
                </table>
            </div>
        );
    }

    renderVideo(download){
        let videoText = intl.get('speedtest_score_category_4k');
        let videoScore = 90;
        if (download >= 40) {
            videoText = intl.get('speedtest_score_category_UHD8K');
            videoScore = 100;
        } else if (download >= 25) {
            videoText = intl.get('speedtest_score_category_UHD4K');
            videoScore = 75;
        } else if (download >= 5) {
            videoText = intl.get('speedtest_score_category_HDStream');
            videoScore = 50;
        } else if (download >= 2) {
            videoText = intl.get('speedtest_score_category_SDStream');
            videoScore = 25;
        } else {
            videoText = intl.get('speedtest_score_category_BasicStream');
            videoScore = 5;
        }
        return this.renderRow(AI_VIDEO, intl.get('speedtest_title_video'),videoText, ((videoScore * 5) / 100));
    }

    renderCall(download, upload){
        let callText = intl.get('speedtest_score_category_video');
        let callScore = 80;
        if (download >= 5 && upload >= 2) {
            callText = intl.get('speedtest_score_category_HDWebcam');
            callScore = 100;
        } else if (download >= 1 && upload >= 1) {
            callText = intl.get('speedtest_score_category_SDWebcam');
            callScore = 50;
        } else if (download >= 0.5 && upload >= 0.5) {
            callText = intl.get('speedtest_score_category_AudioStream');
            callScore = 25;
        } else {
            callText = intl.get('speedtest_score_category_limited');
            callScore = 5;
        }
        return this.renderRow(AI_CALL, intl.get('speedtest_title_call'),callText, ((callScore * 5) / 100));
    }

    renderSocial(download, upload){
        let socialText = intl.get('speedtest_score_category_photo');
        let socialScore = 50;
        if (download >= 5 && upload >= 2) {
            socialText = intl.get('speedtest_score_category_HDvid&photo');
            socialScore = 100;
        } else if (download >= 1 && upload >= 1) {
            socialText = intl.get('speedtest_score_category_vid&photo');
            socialScore = 50;
        } else if (download >= 0.5 && upload >= 0.5) {
            socialText = intl.get('speedtest_score_category_photo');
            socialScore = 25;
        } else {
            socialText = intl.get('speedtest_score_category_Messaging');
            socialScore = 5;
        }
        return this.renderRow(AI_SOCIAL, intl.get('speedtest_title_social'),socialText, ((socialScore * 5) / 100));
    }

    renderWork(download, upload){
        let workText = intl.get('speedtest_score_category_browsing');
        let workScore = 70;
        if (download >= 25 && upload >= 25) {
            workText = intl.get('speedtest_score_category_L_filetrans');
            workScore = 100;
        } else if (download >= 5 && upload >= 2) {
            workText = intl.get('speedtest_score_category_L_filetrans');
            workScore = 75;
        } else if (download >= 1 && upload >= 1) {
            workText = intl.get('speedtest_score_category_S_filetrans');
            workScore = 50;
        } else if (download >= 0.5 && upload >= 0.5) {
            workText = intl.get('speedtest_score_category_brows_emails');
            workScore = 25;
        } else {
            workText = intl.get('speedtest_score_category_small_brows_email');
            workScore = 5;
        }
        return this.renderRow(AI_WORK, intl.get('speedtest_title_work'),workText, ((workScore * 5) / 100));
    }

    renderGaming(ping, jitter){
        let gamingText = intl.get('speedtest_score_category_winning');
        let gamingScore = 70;
        if (ping < 60 && jitter < 5) {
            gamingText = intl.get('speedtest_score_category_gameon');
            gamingScore = 100;
        } else if (ping < 130 && jitter < 50) {
            gamingText = intl.get('speedtest_score_category_inthegame');
            gamingScore = 75;
        } else if (ping < 200 && jitter < 80) {
            gamingText = intl.get('speedtest_score_category_challenging');
            gamingScore = 50;
        } else if (ping < 250) {
            gamingText = intl.get('speedtest_score_category_challenging');
            gamingScore = 25;
        } else {
            gamingText = intl.get('speedtest_score_category_gameover');
            gamingScore = 5;
        }
        return this.renderRow(AI_GAME, intl.get('speedtest_title_gaming'),gamingText, ((gamingScore * 5) / 100));
    }

    renderRow(icon, title, description, rating) {
        return (
            <tr>
                <td className="d-inline-flex text-dark align-items-center">
                    <AchievementIcon    color={TINT_DARK} 
                                        size={16} 
                                        type={icon} 
                                        className="d-flex mr-2"/>
                    {title}
                </td>
                <td  className="list-inline">
                    <li className="list-inline-item small">
                        <RatingBar  editable={false} 
                                    tint={TINT_WARNING} 
                                    length={5} 
                                    value={rating} 
                                    type={RTI_DOT}
                                    size={RB_TINY}/>
                    </li>
                    <li className="list-inline-item">
                        <div className="d-none d-sm-none d-md-block d-lg-block">
                            {description}
                        </div>
                    </li>
                </td>
            </tr>
        );
    }
}
SpeedTestAchievementTable.propTypes = {
    result: PropTypes.object,
};

