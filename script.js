/* MAIN JAVASCRIPT FILE */

// const declarations for elements getters
const container = document.getElementById("container");
const grid_container = document.getElementById("grid-container");
const grid_size_button = document.querySelector(".grid-size");
const clear_grid_button = document.querySelector(".clear-grid");

const grid_show = document.getElementById("show-grid");
grid_show.oninput = (e) => {
    const cells = document.querySelectorAll(".grid-elem");
    if(!show_grid) {
        cells.forEach(div => div.style.border='0px solid rgb(223, 219, 219)');
        show_grid = true;
    } else {
        cells.forEach(div => div.style.border='1px solid rgb(223, 219, 219)')
        show_grid = false;
    }
}

const color_picker = document.getElementById("color-picker");
color_picker.oninput = (e) => color = e.srcElement.value;

// variables declaration
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_GRID_SHOW = true;
const DEFAULT_COLOR = '#000000';

let grid_size = DEFAULT_GRID_SIZE;
let current_grid_size;
let color = DEFAULT_COLOR;
let show_grid = DEFAULT_GRID_SHOW;
let first_start;
let mouseClicked = false;


/* MOUSE GLOBAL LISTENER */
document.addEventListener('mousedown', mouseListener);
document.addEventListener('mouseup', mouseListener);
function mouseListener(e) {
    if(e.type === 'mousedown') mouseClicked = true;
    if(e.type === 'mouseup') mouseClicked = false;
    //console.log(mouseClicked);
}

/* INIT FUNCTION */
function init() { // function call on full page load
    current_grid_size = grid_size;
    setGrid(grid_size);

    /* CONTROL PANEL LISTENER */
    grid_size_button.addEventListener('click', () => {
        let grid_size = prompt("Enter a new size for the grid: ");
        current_grid_size = grid_size;
        console.log("User selecter the size of: " + grid_size);
        setGrid(grid_size);
    });
    clear_grid_button.addEventListener('click', clearGrid);
}

function setGrid(size) { // grid generator function
    /* GRID GENERATION */
    grid_container.innerHTML = '';
    for(let i = 0; i < size; i++) { // grid rows creation
        const grid_row = document.createElement('div');
        grid_row.classList.add('rows');
        grid_container.appendChild(grid_row);

        for(let i = 0; i < size; i++) { // grid column elements for each row element
            const row_element = document.createElement('div');
            row_element.classList.add('grid-elem');
            grid_row.appendChild(row_element);
            row_element.addEventListener('mousedown', hover); // listen to mouse event to draw
            row_element.addEventListener('mouseover', hover); // listen to mouse event to draw
            row_element.style.border= (show_grid) ? '0px solid rgb(223, 219, 219)' : '1px solid rgb(223, 219, 219)';
        }
    }
}

function clearGrid() {setGrid(current_grid_size);} // grid clearer function

/* DRAWER FUNCTION */
function hover(e) {
    if(!mouseClicked) return; // if mouse isn´t clicked, return
    this.style.background = color;
    //this.classList.add('filled');
}