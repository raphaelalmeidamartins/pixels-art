const paletteList = document.getElementsByClassName('color');
const sizeBoard = 5;
let arrayColorsOfPalette = ['black'];

// Me inspirei nessa thread do StackOverflow para gerar o código hexadecimal da cor de forma aleatória. Fonte: https://stackoverflow.com/questions/1484506/random-color-generator
function generateRandomColor() {
  let color = '#';
  const hexNumbers = '0123456789ABCDEF';
  for (let i = 0; i < 6; i += 1) {
    color += hexNumbers[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateArrayColors() {
  for (let i = 0; i < 3; i += 1) {
    arrayColorsOfPalette.push(generateRandomColor());
  }
}

function clearBoard() {
  const arrayPixels = document.getElementsByClassName('pixel');
  for (let i = 0; i < arrayPixels.length; i += 1) {
    arrayPixels[i].style.backgroundColor = 'white';
  }
}

const clearButton = document.getElementById('clear-board');
clearButton.addEventListener('click', clearBoard);

function selectColor(click) {
  const colorOfPalette = click.target;
  if (colorOfPalette.classList[0] === 'color') {
    document.querySelector('.selected').classList.remove('selected');
    colorOfPalette.classList.add('selected');
  }
}

function fillPalette(arrayListItems) {
  const listItems = arrayListItems;
  if (listItems.length === 4) {
    for (let i = 0; i < listItems.length; i += 1) {
      listItems[i].addEventListener('click', selectColor);
      listItems[i].style.backgroundColor = arrayColorsOfPalette[i];
    }
  } else {
    console.log('Paleta de cores com tamanho errado.');
  }
}

function paintPixel(click) {
  const pixel = click.target;
  pixel.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
}

function createPixel() {
  const box = document.createElement('div');
  box.className = 'pixel';
  box.addEventListener('click', paintPixel);
  return box;
}

function createLine(length) {
  const line = document.createElement('li');
  line.className = 'line';
  for (let i = 0; i < length; i += 1) {
    line.appendChild(createPixel());
  }
  return line;
}

const pixelBoard = document.getElementById('pixel-board');
const inputBoardSize = document.getElementById('board-size');
const vqvButton = document.getElementById('generate-board');
const errorMsg = document.getElementById('size-error');

function buildPixelBoard(size) {
  let currentSize = size;
  if (currentSize < 5) {
    currentSize = 5;
    errorMsg.innerHTML = 'Selecione um valor entre 5 e 50';
  } else if (currentSize > 50) {
    currentSize = 50;
    errorMsg.innerHTML = 'Selecione um valor entre 5 e 50';
  }
  for (let i = 0; i < currentSize; i += 1) {
    pixelBoard.appendChild(createLine(currentSize));
  }
}

function changeBoardSize() {
  if (!inputBoardSize.value) {
    alert('Board inválido!');
  } else {
    errorMsg.innerHTML = '';
    pixelBoard.innerHTML = '';
    buildPixelBoard(inputBoardSize.value);
  }
}

function switchPalette() {
  arrayColorsOfPalette = ['black'];
  generateArrayColors();
  fillPalette(paletteList);
}

const switchColorsButton = document.getElementById('switch-colors');
switchColorsButton.addEventListener('click', switchPalette);

vqvButton.addEventListener('click', changeBoardSize);

function onLoadPage() {
  generateArrayColors();
  fillPalette(paletteList);
  buildPixelBoard(sizeBoard);
}

window.onload = onLoadPage;
