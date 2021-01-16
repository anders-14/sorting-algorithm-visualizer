export const selectionSort = (arr: Array<number>) => {
  const animations: Array<[number, number]> = [];

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;

    for (let j = i+1; j < arr.length; j++) {
      if (arr[minIdx] > arr[j]) {
        minIdx = j;
      }
    }

    const tmp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = tmp;

    animations.push([minIdx, arr[minIdx]]);
    animations.push([i, arr[i]]);
  }

  return animations;
}
