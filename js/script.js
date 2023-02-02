const grid = document.querySelector('#grid');
const numberOfSquares = 16;
const buttonApply = document.querySelector('.apply');
const inputField = document.querySelector('input');
const buttonRandom = document.querySelector('.random');

let random = false;

let RED = 0;
let GREEN = 0;
let BLUE = 255;

inputField.style.color = 'gray';
placeholder = 'Number of squares per row';
inputField.value = placeholder;

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

function randomColors() {
    RED = Math.random() * 255;
    GREEN = Math.random() * 255;
    BLUE = Math.random() * 255;
}

function drawGrid(num) {
    clearGrid();
    const gridWidth = grid.offsetWidth;

    for(let i = 0; i < num**2; i++) {
        let gridElem = document.createElement('div');
        gridElem.classList.add('grid-elem');
        gridElem.style.width = `${gridWidth / num}px`;
        gridElem.style.height = `${gridWidth / num}px`;

        gridElem.addEventListener('mouseenter', function(e) {
            if(!(e.buttons === 1)) return;
            if (random) randomColors();
            this.style.backgroundColor = 'rgb(' + [RED,GREEN,BLUE].join(',') + ')';
        });

        gridElem.addEventListener('mousedown', function(e) {
            if(!(e.buttons === 1)) return;
            if (random) randomColors();
            this.style.backgroundColor = 'rgb(' + [RED,GREEN,BLUE].join(',') + ')';
        });
        
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

drawGrid(numberOfSquares);

buttonApply.addEventListener('click', () => {
    inputFieldValue = +inputField.value;

    if(!inputFieldValue || !Number.isInteger(inputFieldValue)) return;

    drawGrid((inputFieldValue > 100) ? 100 : inputFieldValue);

});

buttonRandom.addEventListener('click', function() {
    this.classList.toggle('clicked');
    random = !random;
})