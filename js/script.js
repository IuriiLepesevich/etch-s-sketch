const grid = document.querySelector('#grid');
let numberOfSquares = 16;
const inputField = document.querySelector('input');

const buttonApply = document.querySelector('.apply');
const buttonErase = document.querySelector('.erase');
const buttonRandom = document.querySelector('.random');
const buttonBorder = document.querySelector('.border');
const buttonClear = document.querySelector('.clear');

const buttonColor = document.querySelector('.color');
const colorPicker = document.querySelector('#val1');


let random = false;
let border = true;
let erase = false;

let colorBackground = '#ffffff';

let colorPen = '#3882f6';

inputField.style.color = '#A9A9A9';
placeholder = 'Number of squares per row';
inputField.value = placeholder;

//#Source https://bit.ly/2neWfJ2 
const getRandomColors = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

function fillElem(e) {
    if(!(e.buttons === 1)) return;
    if (erase) {
        this.style.backgroundColor = colorBackground;
    } else {
        colorPen = (random) ? getRandomColors() : colorPicker.value;
        this.style.backgroundColor = colorPen;
    }
}

function controlBorder(elem ,state) {
    if (state) elem.style.border = '1px solid black';
    else elem.style.border = '0px solid black';
}

function drawGrid(num) {
    clearGrid();
    const gridWidth = grid.offsetWidth - parseInt(getComputedStyle(grid).getPropertyValue('border-width')) * 2;

    for(let i = 0; i < num**2; i++) {
        let gridElem = document.createElement('div');
        gridElem.classList.add('grid-elem');
        gridElem.style.width = `${gridWidth / num}px`;
        gridElem.style.height = `${gridWidth / num}px`;
        gridElem.style.backgroundColor = colorBackground;

        controlBorder(gridElem, border);

        gridElem.addEventListener('mouseenter', fillElem);
        gridElem.addEventListener('mousedown', fillElem);
        
        gridElem.addEventListener("dragstart",(event)=>{
            event.preventDefault();
        });

        grid.appendChild(gridElem);
    }
}

function clearGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function checkFieldInput() {
    if (!inputFieldValue || !Number.isInteger(inputFieldValue)) {
        inputField.style.borderColor = '#ff3333';
        return false;
    } else {
        inputField.style.borderColor = '#3882f6';
        return true;
    }
}

// Default text functionality taken
// from: https://stackoverflow.com/questions/1102895/default-text-on-input
inputField.addEventListener('focus', function() {
    if (this.value === placeholder) {
        this.style.color = 'white';
        this.value = '';
    }
});
inputField.addEventListener('blur', function() {
    if (this.value === '') {
        this.style.color = '#A9A9A9';
        this.value = placeholder;
    }
});

buttonErase.addEventListener('click', function() {
    this.classList.toggle('clicked');
    erase = !erase;
})

buttonBorder.addEventListener('click', function() {
    this.classList.toggle('clicked');
    border = !border;
    for(const elem of grid.children) {
        controlBorder(elem, border);
    }
})

buttonApply.addEventListener('click', () => {
    inputFieldValue = +inputField.value;
    if(!checkFieldInput()) return;

    numberOfSquares = (inputFieldValue > 100) ? 100 : inputFieldValue;
    drawGrid(numberOfSquares);

});

buttonRandom.addEventListener('click', function() {
    this.classList.toggle('clicked');
    random = !random;
});

buttonClear.addEventListener('click', () => {
    for(const elem of grid.children) {
        elem.style.backgroundColor = colorBackground;
    }
})

drawGrid(numberOfSquares);