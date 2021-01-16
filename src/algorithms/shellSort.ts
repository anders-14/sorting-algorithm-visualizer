export const shellSort = (arr: Array<number>): Array<[number, number]> => {
  const animations: Array<[number, number]> = [];
  const len = arr.length;
  let gap = Math.floor(len / 2);

  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      const tmp = arr[i];
      let j = i;

      while (j >= gap && arr[j-gap] > tmp) {
        arr[j] = arr[j-gap];
        animations.push([j, arr[j]]);
        j -= gap;
      }

      arr[j] = tmp;
      animations.push([j, arr[j]]);
    }
    gap = Math.floor(gap / 2);
  }

  return animations;
}
