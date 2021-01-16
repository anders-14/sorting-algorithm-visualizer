let animations = [];
const actualSort = (arr, startIdx = 0) => {
    if (arr.length === 1)
        return arr;
    const m = Math.floor(arr.length / 2);
    const l = actualSort(arr.slice(0, m), startIdx);
    const r = actualSort(arr.slice(m), startIdx + m);
    let i = 0;
    let j = 0;
    let k = 0;
    while (i < l.length && j < r.length) {
        if (l[i] < r[j]) {
            arr[k] = l[i];
            animations.push([startIdx + k, arr[k]]);
            i++;
            k++;
        }
        else {
            arr[k] = r[j];
            animations.push([startIdx + k, arr[k]]);
            j++;
            k++;
        }
    }
    while (i < l.length) {
        arr[k] = l[i];
        animations.push([startIdx + k, arr[k]]);
        i++;
        k++;
    }
    while (j < r.length) {
        arr[k] = r[j];
        animations.push([startIdx + k, arr[k]]);
        j++;
        k++;
    }
    return arr;
};
export const mergeSort = (arr) => {
    animations = [];
    actualSort(arr);
    return animations;
};
