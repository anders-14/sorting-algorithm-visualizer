export const insertionSort = (arr) => {
    const animations = [];
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j];
            animations.push([j + 1, arr[j + 1]]);
            j--;
        }
        arr[j + 1] = key;
        animations.push([j + 1, arr[j + 1]]);
    }
    return animations;
};
