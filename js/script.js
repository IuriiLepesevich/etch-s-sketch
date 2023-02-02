const grid = document.querySelector('#grid');
const grid_width = grid.offsetWidth;

const numberOfSquares = 16;

for(let i = 0; i < numberOfSquares**2; i++) {
    let grid_elem = document.createElement('div');
    grid_elem.classList.add('grid-elem');
    grid_elem.style.width = `${grid_width / numberOfSquares}px`;
    grid_elem.style.height = `${grid_width / numberOfSquares}px`;

    grid.appendChild(grid_elem);
}