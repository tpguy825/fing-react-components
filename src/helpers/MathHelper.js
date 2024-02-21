export function roundPercentile(percentile, factor) {
    let quotient = Math.floor(percentile/factor);
    let remainder = percentile % factor;

    return Math.round(Math.max((quotient * factor) +
        (remainder >= factor / 2.0 ? factor : 0), factor));
}