import { bubbleSort } from './algorithms/bubbleSort.js';
import { insertionSort } from './algorithms/insertionSort.js';
import { mergeSort } from './algorithms/mergeSort.js';
import { selectionSort } from './algorithms/selectionSort.js';
import { shellSort } from './algorithms/shellSort.js';

const barWrapper = document.querySelector('#bar-wrapper')! as HTMLDivElement;
// Sort buttons
const sortBtn = document.querySelector('#sort')! as HTMLButtonElement;
const algoSelect = document.querySelector('#algo-select')! as HTMLSelectElement; 
// Options
const barNumberInput = document.querySelector('#number-of-bars')! as HTMLInputElement;
const regenerateBtn = document.querySelector('#regenrate-btn')! as HTMLButtonElement;
const fancyAnimationsCheck = document.querySelector('#fancy-animation-check')! as HTMLInputElement;

// Array to hold the elements and heights
let barElements: Array<HTMLDivElement> = [];
let barHeights: Array<number> = [];

// options
let fancyAnimations = false;
let numberOfBars: number;
let selectedAlgorithm: string = algoSelect.value;

// Function to create a bar and give it a random height
const createBar = () => {
  const width = Math.floor(barWrapper.clientWidth / numberOfBars - 5);
  const height = Math.floor(Math.random() * 480 + 5);
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
}

// Takes an array of animations, an index and the height, and animates the sorting
const animate = (animations: Array<[number, number]>, i: number = 0, ) => {
  // Change the color of the bars that are changed
  barElements[animations[i][0]].classList.toggle('red');
  barElements[animations[i+1][0]].classList.toggle('green');

  // Animate the bars that changed.
  barElements[animations[i][0]].style.height = animations[i][1] + 'px';
  barElements[animations[i+1][0]].style.height = animations[i+1][1] + 'px';

  // If there are any animations left, do them
  if (i + 2 < animations.length -1) {
    setTimeout(() => {
      // Remove color
      barElements[animations[i][0]].classList.toggle('red');
      barElements[animations[i+1][0]].classList.toggle('green');

      animate(animations, i+2);
    }, 10);
  } else {
    // Remove leftover color
    barElements[animations[i][0]].classList.toggle('red');
    barElements[animations[i+1][0]].classList.toggle('green');
  }
}

// I regenerate i clicked or number of bars i changed, redraw
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
  if (selectedAlgorithm === 'bubble-sort') {
    const animations = bubbleSort(barHeights);
    animate(animations)
    return;
  }
  if (selectedAlgorithm === 'insertion-sort') {
    const animations = insertionSort(barHeights);
    animate(animations);
    return;
  }
  if (selectedAlgorithm === 'merge-sort') {
    const animations = mergeSort(barHeights);
    animate(animations)
    return;
  }
  if (selectedAlgorithm === 'selection-sort') {
    const animations = selectionSort(barHeights);
    animate(animations)
    return;
  }
  if (selectedAlgorithm === 'shell-sort') {
    const animations = shellSort(barHeights);
    animate(animations);
    return;
  }
});

// Draw the bars
drawBars();
