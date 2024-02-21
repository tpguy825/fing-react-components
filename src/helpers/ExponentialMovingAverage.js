export default class ExponentialMovingAverage {
    constructor(alpha, initialMean) {
        this.alpha = alpha;
        this.mean = !initialMean ? 0 : initialMean;
    }

    update(newValue) {
        const meanIncrement = this.alpha * (newValue - this.mean);
        const newMean = this.mean + meanIncrement;
        this.mean = newMean
    }
}