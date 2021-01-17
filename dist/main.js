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
const createBar = () => {
    const width = Math.floor(barWrapper.clientWidth / numberOfBars - 5);
    const height = Math.floor(Math.random() * 480 + 5);
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
};
const animate = (animations, i = 0) => {
    barElements[animations[i][0]].classList.toggle('red');
    barElements[animations[i + 1][0]].classList.toggle('green');
    barElements[animations[i][0]].style.height = animations[i][1] + 'px';
    barElements[animations[i + 1][0]].style.height = animations[i + 1][1] + 'px';
    if (i + 2 < animations.length - 1) {
        setTimeout(() => {
            barElements[animations[i][0]].classList.toggle('red');
            barElements[animations[i + 1][0]].classList.toggle('green');
            animate(animations, i + 2);
        }, 10);
    }
    else {
        barElements[animations[i][0]].classList.toggle('red');
        barElements[animations[i + 1][0]].classList.toggle('green');
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
    if (selectedAlgorithm === 'bubble-sort') {
        const animations = bubbleSort(barHeights);
        animate(animations);
        return;
    }
    if (selectedAlgorithm === 'insertion-sort') {
        const animations = insertionSort(barHeights);
        animate(animations);
        return;
    }
    if (selectedAlgorithm === 'merge-sort') {
        const animations = mergeSort(barHeights);
        animate(animations);
        return;
    }
    if (selectedAlgorithm === 'selection-sort') {
        const animations = selectionSort(barHeights);
        animate(animations);
        return;
    }
    if (selectedAlgorithm === 'shell-sort') {
        const animations = shellSort(barHeights);
        animate(animations);
        return;
    }
});
drawBars();
