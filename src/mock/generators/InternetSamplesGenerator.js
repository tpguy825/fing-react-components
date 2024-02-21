import {
    daysDifferenceBetween,
    formatAbsoluteDate,
    DATE_FORMAT_RECENT
} from '../../helpers/DateHelper';

export function createMockChartSamples(startDate,endDate) {
    const days = daysDifferenceBetween(startDate, endDate);
    const chartSamples = [];
    for (let i=0; i <= days; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i); 
        chartSamples.push({
            date: d,
            formattedDate: formatAbsoluteDate(d.getTime(), DATE_FORMAT_RECENT),
            avgDownload: Math.floor((Math.random() * 100)),
            avgUpload: Math.floor((Math.random() * 100)),
        });
    }
    return chartSamples;
}