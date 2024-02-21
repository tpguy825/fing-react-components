/**
 * (C) Copyright Fing
 */


import IstAnalysisDaySample from "../../model/IstAnalysisDaySample";
import {
    DATE_FORMAT_RECENT,
    DATE_FORMAT_SHORT,
    DATE_FORMAT_SMART,
    daysDifferenceBetween,
    formatAbsoluteDate
} from "../../helpers/DateHelper";
import { formatSpeed } from "../../helpers/NetworkHelper";

/**
 * Converts the network contacts and network discovery into a list of <code>Contact</code> objects
 * that retain the current status.
 *
 * @param istAnalysisSamples The single speed test samples
 * @return {[DaySpeedSample]} The array of samples, coalesced by day
 */
export function convertSamplesToDailySamples(istAnalysisSamples) {

    // --- GROUP INTO DAY SAMPLES --------------------

    let day = -1, month = -1, year = -1;

    let daySample = null;
    const daySamples = [];
    for (const sample of istAnalysisSamples) {
        if (sample == null || sample.success !== "true"){
            
            continue;
        } 

        if (daySample === null) {
            daySample = new IstAnalysisDaySample();
        } else {
            const calendar = new Date(Number(sample.timestamp));
            if (calendar.getDate() !== day ||
                calendar.getMonth() !== month ||
                calendar.getFullYear() !== year) {
                daySamples.push(daySample);
                daySample = new IstAnalysisDaySample();
            }
            day = calendar.getDate();
            month = calendar.getMonth();
            year = calendar.getFullYear();
        }
        daySample.addSample(sample);
    }

    if (daySample != null) {
        // Add the last sample, which is not inserted withing the for loop.
        daySamples.push(daySample);
    }

    return daySamples;
}

/**
 * Converts a list of IstAnalysisDaySample objects into SpeedHistorySample objects, filling the gap when needed.
 *
 * @param daySamples {[IstAnalysisDaySample]} array of daily samples
 * @param startDate {Date} The chart start date
 * @param endDate {Date} The chart end date
 */
export function convertDailySamplesToChartData(daySamples, startDate, endDate) {
    const sampleDayExtractor = timestamp => new Date(timestamp).toLocaleDateString();

    let samplesByDay = daySamples.reduce((map, daySample) => {
        map[sampleDayExtractor(daySample.getTimestamp())] = daySample;
        return map;
    }, {});

    const days = daysDifferenceBetween(startDate, endDate);
    const chartSamples = [];
    for (let i=0; i <= days; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i); // This works also across months, don't worry
        const key = sampleDayExtractor(d.getTime());
        const daySample = samplesByDay[key];
        chartSamples.push({
            date: d,
            daySample: daySample,
            formattedDate: formatAbsoluteDate(d.getTime(), DATE_FORMAT_RECENT),
            avgDownload: daySample ? formatSpeed(daySample.getAvgDown()) : null,
            avgUpload: daySample ? formatSpeed(daySample.getAvgUp()) : null,
        });
    }
    return chartSamples;
}

