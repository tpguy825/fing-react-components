/**
 * A summary of multiple speed test samples in a single day.
 */

export default class IstAnalysisDaySample {

    samples;

    constructor() {
        this.samples = [];
    }

    addSample(sample) {
        this.samples.push(sample);
    }

    getSamples(){
        return this.samples;
    }

    getOutlierIndex() {
        let index = -1;
        let outlier = Number.MIN_VALUE;
        for (let i = 0; i < this.samples.length; i++) {
            let sample = this.samples[i]
            if (sample.outlierDownload != null || sample.outlierUpload != null) {
                const outlierMax = Math.max(
                    sample.outlierDownload ? Math.abs(Number(sample.outlierDownload)) : Number.MIN_VALUE,
                    sample.outlierUpload ? Math.abs(Number(sample.outlierUpload)) : Number.MIN_VALUE
                );
                if (outlierMax > outlier) {
                    outlier = outlierMax;
                    index = i;
                }
            }
        }
        return index;
    }

    hasOutlier() {
        return this.getOutlierIndex() !== -1;
    }

    getAvgDown() {
        /*const outlierIndex = this.getOutlierIndex();
        if (outlierIndex !== -1) {
            let avg = this.samples[outlierIndex].downloadBps;
            return avg ? Number(avg) : 0;
        }*/
        let mean = 0;
        for (let i = 0; i < this.samples.length; i++) {
            const sample = this.samples[i];
            mean += Number(sample.downloadBps);
        }
        return mean / this.samples.length;
    }

    getAvgUp() {
        /*const outlierIndex = this.getOutlierIndex();
        if (outlierIndex !== -1) {
            let avg = this.samples[outlierIndex].uploadBps;
            return avg ? Number(avg) : 0;
        }*/
        let mean = 0;
        for (let i = 0; i < this.samples.length; i++) {
            const sample = this.samples[i];
            mean += Number(sample.uploadBps);
        }
        return mean / this.samples.length;
    }

    getOutlierDown() {
        const outlierIndex = this.getOutlierIndex();
        if (outlierIndex !== -1) {
            const sample = this.samples[outlierIndex];
            return sample.outlierDownload ? Number(sample.outlierDownload) : null;
        }
        return null;
    }

    getOutlierUp() {
        const outlierIndex = this.getOutlierIndex();
        if (outlierIndex !== -1) {
            const sample = this.samples[outlierIndex];
            return sample.outlierUpload ? Number(sample.outlierUpload) : null;
        }
        return null;
    }

    getTimestamp() {
        const outlierIndex = this.getOutlierIndex();
        if (outlierIndex !== -1)
            return Number(this.samples[outlierIndex].timestamp);
        return this.samples.length > 0 ? Number(this.samples[0].timestamp) : 0;
    }

    getLocationIndexes() {
        const indexes = [];

        for (let i = 0; i < this.samples.length; i++) {
            const sample = this.samples[i];
            if (sample.downloadServerIndex !== null && sample.downloadServerIndex !== undefined &&
                sample.downloadServerIndex >=0 && !indexes.includes(Number(sample.downloadServerIndex))) {
                indexes.push(Number(sample.downloadServerIndex));
            }
            if (sample.uploadServerIndex !== null && sample.uploadServerIndex !== undefined &&
                sample.uploadServerIndex >=0 && !indexes.includes(Number(sample.uploadServerIndex))) {
                indexes.push(Number(sample.uploadServerIndex));
            }
        }

        return indexes;
    }

}