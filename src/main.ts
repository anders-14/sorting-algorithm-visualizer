import { bubbleSort } from './algorithms/bubbleSort.js';
import { insertionSort } from './algorithms/insertionSort.js';
import { mergeSort } from './algorithms/mergeSort.js';
import { selectionSort } from './algorithms/selectionSort.js';
import { shellSort } from './algorithms/shellSort.js';

// Wrapper
const barWrapper = document.querySelector('#bar-wrapper')! as HTMLDivElement;

// Sort elements
const sortBtn = document.querySelector('#sort')! as HTMLButtonElement;
const algoSelect = document.querySelector('#algo-select')! as HTMLSelectElement; 

// Options
const barNumberInput = document.querySelector('#number-of-bars')! as HTMLInputElement;
const regenerateBtn = document.querySelector('#regenrate-btn')! as HTMLButtonElement;
const fancyAnimationsCheck = document.querySelector('#fancy-animation-check')! as HTMLInputElement;

// Array to hold the elements and heights
let barElements: Array<HTMLDivElement> = [];
let barHeights: Array<number> = [];

let fancyAnimations = false;
let numberOfBars: number;
let selectedAlgorithm: string = algoSelect.value;
let sorted = false;
let running = false;

// Function to create a bar and give it a random height
const createBar = () => {
  const width = Math.floor(barWrapper.clientWidth / numberOfBars - 10);
  const height = Math.floor(Math.random() * 450 + 5);
  const element: HTMLDivElement = document.createElement('div');
  element.classList.add('bar');
  if (fancyAnimations) element.classList.add('fancy-animation');
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  barWrapper.appendChild(element);

  barElements.push(element);
  barHeights.push(height);
}

// Draw the bars, used for initial and for redrawing
const drawBars = () => {
  barWrapper.innerHTML = '';
  barElements = [];
  barHeights = [];
  numberOfBars = +barNumberInput.value;
  for (let i = 0; i < numberOfBars; i++) createBar();
  sorted = false;
}

// Takes an array of animations, an index and the height, and animates the sorting
const animate = (animations: Array<[number, number]>, i: number = 0, ) => {
  // Change the color of the bars that are changed
  barElements[animations[i][0]].classList.add('red');
  barElements[animations[i+1][0]].classList.add('green');

  // Animate the bars that changed.
  barElements[animations[i][0]].style.height = animations[i][1] + 'px';
  barElements[animations[i+1][0]].style.height = animations[i+1][1] + 'px';

  // If there are any animations left, do them
  if (i + 2 < animations.length -1) {
    setTimeout(() => {
      // Remove color
      barElements[animations[i][0]].classList.remove('red');
      barElements[animations[i+1][0]].classList.remove('green');

      animate(animations, i+2);
    }, 10);
  } else {
    // Remove leftover color
    barElements[animations[i][0]].classList.remove('red');
    barElements[animations[i+1][0]].classList.remove('green');

    running = false;
  }
}

// Regenerate if amount changed or regenerate is clicked
regenerateBtn.addEventListener('click', drawBars);
barNumberInput.addEventListener('change', () => {
  drawBars();
  barNumberInput.title = barNumberInput.value;
});

// Enable fancy animations, they break the visualization, but look cool
fancyAnimationsCheck.addEventListener('change', () => {
  fancyAnimations = !fancyAnimations;
  barElements.forEach(el => el.classList.toggle('fancy-animation'));
});

// Get the selected algorithm
algoSelect.addEventListener('change', () => selectedAlgorithm = algoSelect.value);

// Execute sort
sortBtn.addEventListener('click', () => {
  // Dont start a new if one is running
  if (running) return;

  // If the bars are already sorted, generate new bars
  if (sorted) {
    drawBars();
  }

  let animations: Array<[number, number]> = [];

  if (selectedAlgorithm === 'bubble-sort') animations = bubbleSort(barHeights);
  else if (selectedAlgorithm === 'insertion-sort') animations = insertionSort(barHeights);
  else if (selectedAlgorithm === 'merge-sort') animations = mergeSort(barHeights);
  else if (selectedAlgorithm === 'selection-sort') animations = selectionSort(barHeights);
  else if (selectedAlgorithm === 'shell-sort') animations = shellSort(barHeights);

  sorted = true;
  running = true;
  barElements.forEach(el => el.classList.remove('red', 'green'));
  animate(animations);
});

// Draw the bars
window.onload = drawBars;
