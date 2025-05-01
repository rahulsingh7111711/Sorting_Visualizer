const barsContainer = document.getElementById('barsContainer');
const sizeSlider = document.getElementById('sizeSlider');
const speedSlider = document.getElementById('speedSlider');
const algorithmSelect = document.getElementById('algorithm');
const generateBtn = document.getElementById('generate');
const startBtn = document.getElementById('start');

let array = [];
let delay = 200;

function generateArray(size) {
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 350) + 10);
  }
  renderArray();
}

function renderArray() {
  barsContainer.innerHTML = '';
  const width = 100 / array.length;
  array.forEach(value => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value}px`;
    bar.style.width = `${width}%`;
    barsContainer.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].classList.add('compare');
      bars[j + 1].classList.add('compare');
      await sleep(delay);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray();
      }

      bars[j].classList.remove('compare');
      bars[j + 1].classList.remove('compare');
    }
    bars[array.length - i - 1].classList.add('sorted');
  }
  bars[0].classList.add('sorted');
}

async function selectionSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      bars[minIdx].classList.add('compare');
      bars[j].classList.add('compare');
      await sleep(delay);
      if (array[j] < array[minIdx]) minIdx = j;
      bars[j].classList.remove('compare');
      bars[minIdx].classList.remove('compare');
    }
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
    renderArray();
    bars[i].classList.add('sorted');
  }
}

async function insertionSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      renderArray();
      await sleep(delay);
    }
    array[j + 1] = key;
    renderArray();
  }
  const updatedBars = document.querySelectorAll('.bar');
  updatedBars.forEach(bar => bar.classList.add('sorted'));
}

sizeSlider.addEventListener('input', () => {
  generateArray(sizeSlider.value);
});

speedSlider.addEventListener('input', () => {
  delay = parseInt(speedSlider.value);
});

generateBtn.addEventListener('click', () => {
  generateArray(sizeSlider.value);
});

startBtn.addEventListener('click', async () => {
  switch (algorithmSelect.value) {
    case 'bubble':
      await bubbleSort();
      break;
    case 'selection':
      await selectionSort();
      break;
    case 'insertion':
      await insertionSort();
      break;
  }
});

generateArray(sizeSlider.value);
