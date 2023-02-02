const grid = document.querySelector('#grid');
const numberOfSquares = 16;
const button = document.querySelector('button');
const inputField = document.querySelector('input');


inputField.style.color = 'gray';
placeholder = 'Number of squares per row';
inputField.value = placeholder;

inputField.addEventListener('focus', function () {
    if (this.value === placeholder) {
        this.style.color = 'black';
        this.value = '';
    }
});
inputField.addEventListener('blur', function () {
    if (this.value === '') {
        this.style.color = 'gray';
        this.value = placeholder;
    }
});

function drawGrid(num) {
    const grid_width = grid.offsetWidth;

    for(let i = 0; i < num**2; i++) {
        let grid_elem = document.createElement('div');
        grid_elem.classList.add('grid-elem');
        grid_elem.style.width = `${grid_width / num}px`;
        grid_elem.style.height = `${grid_width / num}px`;

        grid.appendChild(grid_elem);
    }
}

function clearGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

clearGrid();
drawGrid(numberOfSquares);

button.addEventListener('click', () => {
    inputFieldValue = +inputField.value;

    if(!inputFieldValue || !Number.isInteger(inputFieldValue)) return;

    clearGrid();
    drawGrid((inputFieldValue > 100) ? 100 : inputFieldValue);

})