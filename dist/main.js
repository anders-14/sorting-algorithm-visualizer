import { bubbleSort } from './algorithms/bubbleSort.js';
import { insertionSort } from './algorithms/insertionSort.js';
import { mergeSort } from './algorithms/mergeSort.js';
import { selectionSort } from './algorithms/selectionSort.js';
import { shellSort } from './algorithms/shellSort.js';
const barWrapper = document.querySelector('#bar-wrapper');
const sortBtn = document.querySelector('#sort');
const algoSelect = document.querySelector('#algo-select');
const barNumberInput = document.querySelector('#number-of-bars');
const regenerateBtn = document.querySelector('#regenrate-btn');
const fancyAnimationsCheck = document.querySelector('#fancy-animation-check');
let barElements = [];
let barHeights = [];
let fancyAnimations = false;
let numberOfBars;
let selectedAlgorithm = algoSelect.value;
let sorted = false;
let running = false;
const createBar = () => {
    const width = Math.floor(barWrapper.clientWidth / numberOfBars - 10);
    const height = Math.floor(Math.random() * 450 + 5);
    const element = document.createElement('div');
    element.classList.add('bar');
    if (fancyAnimations)
        element.classList.add('fancy-animation');
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    barWrapper.appendChild(element);
    barElements.push(element);
    barHeights.push(height);
};
const drawBars = () => {
    barWrapper.innerHTML = '';
    barElements = [];
    barHeights = [];
    numberOfBars = +barNumberInput.value;
    for (let i = 0; i < numberOfBars; i++)
        createBar();
    sorted = false;
};
const animate = (animations, i = 0) => {
    barElements[animations[i][0]].classList.add('red');
    barElements[animations[i + 1][0]].classList.add('green');
    barElements[animations[i][0]].style.height = animations[i][1] + 'px';
    barElements[animations[i + 1][0]].style.height = animations[i + 1][1] + 'px';
    if (i + 2 < animations.length - 1) {
        setTimeout(() => {
            barElements[animations[i][0]].classList.remove('red');
            barElements[animations[i + 1][0]].classList.remove('green');
            animate(animations, i + 2);
        }, 10);
    }
    else {
        barElements[animations[i][0]].classList.remove('red');
        barElements[animations[i + 1][0]].classList.remove('green');
        running = false;
    }
};
regenerateBtn.addEventListener('click', drawBars);
barNumberInput.addEventListener('change', () => {
    drawBars();
    barNumberInput.title = barNumberInput.value;
});
fancyAnimationsCheck.addEventListener('change', () => {
    fancyAnimations = !fancyAnimations;
    barElements.forEach(el => el.classList.toggle('fancy-animation'));
});
algoSelect.addEventListener('change', () => selectedAlgorithm = algoSelect.value);
sortBtn.addEventListener('click', () => {
    if (running)
        return;
    if (sorted) {
        drawBars();
    }
    let animations = [];
    if (selectedAlgorithm === 'bubble-sort')
        animations = bubbleSort(barHeights);
    else if (selectedAlgorithm === 'insertion-sort')
        animations = insertionSort(barHeights);
    else if (selectedAlgorithm === 'merge-sort')
        animations = mergeSort(barHeights);
    else if (selectedAlgorithm === 'selection-sort')
        animations = selectionSort(barHeights);
    else if (selectedAlgorithm === 'shell-sort')
        animations = shellSort(barHeights);
    sorted = true;
    running = true;
    barElements.forEach(el => el.classList.remove('red', 'green'));
    animate(animations);
});
window.onload = drawBars;
