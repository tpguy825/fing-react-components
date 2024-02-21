
export function capitalize(s) {
    if (!s || typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export function compare(a, b, rule) {
    if (a[rule] < b[rule]) {
        return -1;
    }
    if (a[rule] > b[rule]) {
        return 1;
    }
    return 0;
}
