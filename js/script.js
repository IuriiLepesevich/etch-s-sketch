const grid = document.querySelector('#grid');
let numberOfSquares = 16;
const buttonApply = document.querySelector('.apply');
const inputField = document.querySelector('input');
const buttonRandom = document.querySelector('.random');
const buttonBorder = document.querySelector('.border');

let random = false;
let border = true;

let RED = 0;
let GREEN = 0;
let BLUE = 255;

inputField.style.color = 'gray';
placeholder = 'Number of squares per row';
inputField.value = placeholder;

function randomColors() {
    RED = Math.random() * 255;
    GREEN = Math.random() * 255;
    BLUE = Math.random() * 255;
}

function fillElem(e) {
    if(!(e.buttons === 1)) return;
    if (random) randomColors();
    this.style.backgroundColor = 'rgb(' + [RED,GREEN,BLUE].join(',') + ')';
}

function drawGrid(num) {
    clearGrid();
    const gridWidth = grid.offsetWidth - parseInt(getComputedStyle(grid).getPropertyValue('border-width')) * 2;

    for(let i = 0; i < num**2; i++) {
        let gridElem = document.createElement('div');
        gridElem.classList.add('grid-elem');
        gridElem.style.width = `${gridWidth / num}px`;
        gridElem.style.height = `${gridWidth / num}px`;

        if (border) gridElem.style.border = '1px solid black';
        else gridElem.style.border = '0px solid black';

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

inputField.addEventListener('focus', function() {
    if (this.value === placeholder) {
        this.style.color = 'black';
        this.value = '';
    }
});
inputField.addEventListener('blur', function() {
    if (this.value === '') {
        this.style.color = 'gray';
        this.value = placeholder;
    }
});

buttonBorder.addEventListener('click', function() {
    this.classList.toggle('clicked');
    border = !border;
    for(let elem of grid.children) {
        if (border) elem.style.border = '1px solid black';
        else elem.style.border = '0px solid black';
    }
})

buttonApply.addEventListener('click', () => {
    inputFieldValue = +inputField.value;

    if(!inputFieldValue || !Number.isInteger(inputFieldValue)) return;

    numberOfSquares = (inputFieldValue > 100) ? 100 : inputFieldValue;
    drawGrid(numberOfSquares);

});

buttonRandom.addEventListener('click', function() {
    this.classList.toggle('clicked');
    random = !random;
});

drawGrid(numberOfSquares);