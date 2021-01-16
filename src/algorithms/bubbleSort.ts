export const bubbleSort = (arr: Array<number>): Array<[number, number]> => {
  const animations: Array<[number, number]> = [];

  // Create a copy of the array
  arr = arr.slice();

  // Need to go one round through the array without swapping
  // to know if the array is sorted
  let swapped = true;
  // For each round the last element swapped is in the right position
  // therefor i dont have to check the `round` last elements each loop
  let round = 0;

  while (swapped) {
    swapped = false;
    for (let i = 0; i < arr.length - 1 - round; i++) {
      if (arr[i] > arr[i+1]) {
        // Do the swap
        const tmp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = tmp;
        swapped = true;

        // Add the animation
        animations.push([i, arr[i]], [i+1, arr[i+1]])
      }
    }
    round++;
  }

  return animations;
}
