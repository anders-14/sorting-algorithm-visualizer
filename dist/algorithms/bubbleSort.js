export const bubbleSort = (arr) => {
    const animations = [];
    arr = arr.slice();
    let swapped = true;
    let round = 0;
    while (swapped) {
        swapped = false;
        for (let i = 0; i < arr.length - 1 - round; i++) {
            if (arr[i] > arr[i + 1]) {
                const tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                swapped = true;
                animations.push([i, arr[i]], [i + 1, arr[i + 1]]);
            }
        }
        round++;
    }
    return animations;
};
