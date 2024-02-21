import {GEN_QUESTION, NT_ETH_USB, NT_ETHERNET, NT_WIFI} from '../../model/Constants';
import {parseEthernetAnswer} from '../../helpers/NetworkHelper';
import intl from "react-intl-universal";

export const ENGINE_STATE_INIT = "ENGINE_STATE_INIT";
export const ENGINE_STATE_DOWN = "ENGINE_STATE_DOWN";
export const ENGINE_STATE_UP = "ENGINE_STATE_UP";
export const ENGINE_STATE_COMPLETED = "ENGINE_STATE_COMPLETED";
export const ENGINE_STATE_FAILED = "ENGINE_STATE_FAILED";

export class SpeedTestResult {
    downloadChartValue
    uploadChartValue
    engineState
    ispScore
    scoreInCountry
    scoreInCity
    name
    country
    city
    locationServer
    logoImage
    bannerImage
    typeConnection
    netName
    ping
    loss
    jitter
    downloadIspCity
    downloadIspCountry
    uploadIspCity
    uploadIspCountry
    scoreIspCountry
    scoreIspCity
    samplesCountry
    samplesCity
    website
    supportWebsite
    supportPhone
    supportFacebook
    supportTwitter
    sentimentScoreCountry
    sentimentScoreCity
    totalRatingsCountry
    totalRatingsCity
    sentimentDistribCountry
    sentimentDistribCity 
    topScore
    statsCityEmpty
    statsCountryEmpty
    
    getDownloadChartValue(){
        if(!this.downloadChartValue) return 0;
        const download = this.downloadChartValue;
        const max = this.getDownloadValueMax();
        return download > 100 ? Math.min((download / max) * 100, 100) :
        download > 25 ? Math.min(download, 100) : Math.min(download * 4, 100);
    }
    
    getDownloadValue(){
        return this.downloadChartValue || '0';
    }
    getDownloadValueMax(){
        return this.downloadChartValue >= 1000 ? 1000 :
            this.downloadChartValue > 500 ? 1000 :
            this.downloadChartValue > 250 ? 500 :
            this.downloadChartValue > 100 ? 250 : 100;
    }
    
    getUploadChartValue(){
        if(!this.uploadChartValue) return 0;
        const upload = this.uploadChartValue;
        const max = this.getUploadValueMax();
        return upload > 100 ? Math.min((upload / max) * 100, 100) :
        upload > 25 ? Math.min(upload, 100) : Math.min(upload * 4, 100);
    }
    getUploadValue(){
        return this.uploadChartValue || '0';
    }
    getUploadValueMax(){
        return this.uploadChartValue >= 1000 ? 1000 :
            this.uploadChartValue > 500 ? 1000 :
            this.uploadChartValue > 250 ? 500 :
            this.uploadChartValue > 100 ? 250 : 100;
    }
    isCompletedState(){
        return this.engineState && this.engineState === ENGINE_STATE_COMPLETED;
    }
    isFailedState(){
        return this.engineState && this.engineState === ENGINE_STATE_FAILED
    }
    isInitState(){
        return this.engineState && this.engineState === ENGINE_STATE_INIT || this.downloadChartValue === undefined
    }
    getIspScore(){
        return this.ispScore || 0
    }
    getScoreCountry(){
        return this.scoreInCountry || 0
    }
    getScoreCity(){
        return this.scoreInCity || 0
    }
    getName(){
        return this.name || ''
    }
    getCountry(){
        return this.country || ''
    }
    getCity(){
        return this.city || ''
    }
    getLocationServer(){
        return this.locationServer || ''
    }
    getLogoImage(){
        return this.logoImage || ''
    }
    getBannerImage(){
        return this.bannerImage || ''
    }
    getTypeConnection(){
        return this.typeConnection || GEN_QUESTION
    }
    getNetName(){
        return this.netName || ''
    }
    getPing(){
        return this.ping || 0
    }
    getLoss(){
        return this.loss || 0
    }
    getJitter(){
        return this.jitter || 0
    }
    getDownloadCity(){
        return this.downloadIspCity || '0'
    }
    getDownloadCountry(){
        return this.downloadIspCountry || '0'
    }
    getUploadCity(){
        return this.uploadIspCity || '0'
    }
    getUploadCountry(){
        return this.uploadIspCountry || '0'
    }
    getScoreIspCountry(){
        return this.scoreIspCountry || '0'
    }
    getScoreIspCity(){
        return this.scoreIspCity || '0'
    }
    getSamplesCountry(){
        return this.samplesCountry || '0'
    }
    getSamplesCity(){
        return this.samplesCity || '0'
    }
    getWebsite(){
        return this.website || ''
    }
    getSupportWebsite(){
        return this.supportWebsite || ''
    }
    getSupportPhone(){
        return this.supportPhone || ''
    }
    getSupportFacebook(){
        return this.supportFacebook || ''
    }
    getSupportTwitter(){
        return this.supportTwitter || ''
    }
    getSentimentScoreCountry(){
        return this.sentimentScoreCountry || 0;
    }
    getSentimentScoreCity(){
        return this.sentimentScoreCity || 0;
    }
    getTotalRatingsCountry(){
        return this.totalRatingsCountry || 0
    }
    getTotalRatingsCity(){
        return this.totalRatingsCity || 0
    }
    getSentimentDistributionCountry(){
        return this.sentimentDistribCountry || []
    }
    getSentimentDistributionCity(){
        return this.sentimentDistribCity || []
    }
    getScoreStatsIsp(){
        return this.scoreStatsIsp || 0
    }

    areStatsCountryEmpty(){
        return this.statsCountryEmpty || false
    }
    areStatsCityEmpty(){
        return this.statsCityEmpty || false
    }

    isSentimentDistributionCountryAvailable(){
        return  this.sentimentDistribCountry && this.sentimentDistribCountry.length > 0 &&
                this.sentimentScoreCountry && this.sentimentScoreCountry !== 0 &&
                this.totalRatingsCountry && this.totalRatingsCountry !== 0
    }

    isSentimentDistributionCityAvailable(){
        return  this.sentimentDistribCity && this.sentimentDistribCity.length > 0 &&
                this.sentimentScoreCity && this.sentimentScoreCity !== 0 &&
                this.totalRatingsCity && this.totalRatingsCity !== 0
    }

    // See if we need only this.samplesCountry
    isCompareCountryAvailable(){
        return  this.downloadIspCountry && Number(this.downloadIspCountry) > 0 &&
                this.uploadIspCountry && Number(this.uploadIspCountry) > 0 &&
                this.samplesCountry && this.samplesCountry > 0 &&
                this.scoreStatsIsp && this.scoreStatsIsp > 0 &&
                this.scoreIspCountry && this.scoreIspCountry > 0
    }
    // See if we need only this.samplesCity
    isCompareCityAvailable(){
        return  this.downloadIspCity && Number(this.downloadIspCity) > 0 &&
                this.uploadIspCity && Number(this.uploadIspCity) > 0 &&
                this.samplesCity && this.samplesCity > 0 &&
                this.scoreStatsIsp && this.scoreStatsIsp > 0 &&
                this.scoreIspCity && this.scoreIspCity > 0
    }
    

}

/**
 * Converts the given speedTest object into a list of items to display.

 * @param speedTest The object from a Desktop agent
 * @returns {SpeedTestResult} A speed test state result object
 */
export function convertToSpeedTestResult(speedTest) {

    const result = new SpeedTestResult();

    const finalResult = speedTest.finalresult;
    const progress = speedTest.progress;
    const score = speedTest.score;
    const info = speedTest.internetinfo;
    const state = speedTest.speedtest_state;

    setState(result, state);
    setDownloadValue(result, finalResult, progress);
    setUploadValue(result, finalResult, progress);
    setInfoFromServer(result, finalResult);
    setStats(result, finalResult);
    setInfoFromIsp(result, info);
    setInfoFromScore(result, score);

    return result;
}

function setInfoFromScore(result, score) {
    if(score){
        if (score.statsisp) {
            result.ispId = score.statsisp.ispId;
            result.scoreStatsIsp = Number(score.statsisp.score) * 100;
        }
        if (score.statscountry && score.statscountry.length > 0 ) {
            const object = score.statscountry.filter(val => val.ispId === result.ispId)[0]
            if(object){
                result.downloadIspCountry = Number(object.downloadSpeedMbpsAvg).toFixed(1);
                result.uploadIspCountry = Number(object.uploadSpeedMbpsAvg).toFixed(1);
                result.scoreIspCountry = Number(object.score) * 100;
                result.samplesCountry = Number(object.samples);
                result.totalRatingsCountry = Number(object.totalRatings);
                result.sentimentScoreCountry = Number(object.sentiment) / 100 * 5;
                result.sentimentDistribCountry = object.sentimentDistrib;
                result.statsCountryEmpty = false
            } else{
                result.statsCountryEmpty = true    
            }
        } else {
            result.statsCountryEmpty = true
        }
        if (score.statscity && score.statscity.length > 0 ) {
            const object = score.statscity.filter(val => val.ispId === result.ispId)[0]
            if(object){
                result.downloadIspCity = Number(object.downloadSpeedMbpsAvg).toFixed(1);
                result.uploadIspCity = Number(object.uploadSpeedMbpsAvg).toFixed(1);
                result.scoreIspCity = Number(object.score) * 100;
                result.samplesCity = Number(object.samples);
                result.totalRatingsCity = Number(object.totalRatings);
                result.sentimentScoreCity = Number(object.sentiment) / 100 * 5;
                result.sentimentDistribCity = object.sentimentDistrib;
                result.statsCityEmpty = false
            } else{
                result.statsCityEmpty = true
            }
        } else {
            result.statsCityEmpty = true
        }
        if (score.scoreInCity) {
            result.scoreInCity = Number(score.scoreInCity) * 100;
        }
        if (score.scoreInCountry) {
            result.scoreInCountry = Number(score.scoreInCountry) * 100;
        }
    }
}

function setInfoFromIsp(result, internetInfo) {

    if (internetInfo && internetInfo.isp) {
        const isp = internetInfo.isp;
        const info = internetInfo.ispinfo;

        let ispName = "-";
        if (info && info.name) ispName = info.name;
        else if (isp.isp) ispName = isp.isp;
        else if (isp.organization) ispName = isp.organization;
        result.name = ispName;

        if(isp){
            result.city = isp.country_city || '';
            result.country = isp.country_name || '';
        }

        if(info){
            const cdn = "https://cdn.fing.io/images";
            if (info.bannerimageurl) {
                result.bannerImage = cdn + info.bannerimageurl;
            } 
            if (info.logoimageurl) {
                result.logoImage = cdn + info.logoimageurl;
            } 
            result.website = info.websiteurl || '';
            result.supportWebsite = info.supporturl || '';
            result.supportPhone = info.supportphone || '';
            result.supportFacebook = info.supportfacebookaccount || '';
            result.supportTwitter = info.supporttwitteraccount || '';
        }
    }
}

function setInfoFromServer(result, finalResult){
    let downInfo;
    let testServerLocation = '';

    if(finalResult) downInfo = finalResult.serverdowninfo;
    if (downInfo && downInfo.servercity && downInfo.servercountry){
        testServerLocation += `${downInfo.servercity}, ${downInfo.servercountry}`;
    }
    result.locationServer = testServerLocation;

    let connectionIcon;
    let netName;

    if (finalResult && finalResult.nicinfo) {
        const info = finalResult.nicinfo;
        if(info && info.type){
            switch (info.type.toUpperCase()) {
                case "WIFI":
                    connectionIcon = NT_WIFI;
                    netName = info.apssid ? info.apssid : info.apbssid;
                    break;
                case "ETHERNET":
                    connectionIcon = NT_ETHERNET;
                    netName =  + intl.get('home_network_subtitle_eth', {rate: parseEthernetAnswer(info.downlinkeffectiverate)});
                    break;
                case "USB_ETHERNET":
                    connectionIcon = NT_ETH_USB;
                    netName =  + intl.get('home_network_subtitle_eth_usb', {rate: parseEthernetAnswer(info.downlinkeffectiverate)});
                    break;
                default:
                    connectionIcon = GEN_QUESTION;
                    break;
            }
        } else{
            connectionIcon = GEN_QUESTION;
        }
    }
    result.typeConnection = connectionIcon;
    result.netName = netName;
}

function setState(result, state){
    if(state && state.includes("Completed")){
        result.engineState = ENGINE_STATE_COMPLETED;
    } else if(state && state.includes("Upload")){
        result.engineState = ENGINE_STATE_UP;
    } else if(state && state.includes("Download")){
        result.engineState = ENGINE_STATE_DOWN;
    } else if(state && state.includes('Failed')){
        result.engineState = ENGINE_STATE_FAILED;
    } else{
        result.engineState = ENGINE_STATE_INIT;
    }
}

function setDownloadValue(result, finalresult,progress){
    let download;
    let bps;
    let samples;
    if(finalresult) bps = finalresult.downloadbps;
    if(progress) samples = progress.samplesdownbps;
    if (finalresult && bps && bps > 0) {
        download = (parseFloat(bps) / 1000000).toFixed(1);
    } else if (progress && samples && samples.length > 0) {
        download = (parseFloat(samples[samples.length - 1]) / 1000000);
        download = (download + download * 0.005 * Math.random() * (Math.random() > 0.5 ? 1 : -1)).toFixed(1);
    }
    result.downloadChartValue = download;
}

function setUploadValue(result, finalresult,progress){
    let upload;
    let bps;
    let samples;
    if(finalresult) bps = finalresult.uploadbps;
    if(progress) samples = progress.samplesupbps;
    if (finalresult && bps && bps > 0) {
        upload = (parseFloat(bps) / 1000000).toFixed(1);
    } else if (progress && samples && samples.length > 0) {
        upload = (parseFloat(samples[samples.length - 1]) / 1000000);
        upload = (upload + upload * 0.005 * Math.random() * (Math.random() > 0.5 ? 1 : -1)).toFixed(1);
    }
    result.uploadChartValue = upload;
}

function setStats(result,finalresult){
    if(finalresult){
        result.ping = parseFloat(finalresult.rtd || 0).toFixed(0);
        result.jitter = parseFloat(finalresult.rtd_jitter || 0).toFixed(1);
        result.loss = (parseFloat(finalresult.rtd_loss_perc || 0) * 100.0).toFixed(0);
    }
}

