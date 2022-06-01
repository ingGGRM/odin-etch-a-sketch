/* MAIN JAVASCRIPT FILE */

// const declarations for elements getters
const container = document.getElementById("container");
const grid_container = document.getElementById("grid-container");

const eraser = document.getElementById("eraser");
const rainbow_set = document.getElementById("rainbow");
const grid_show = document.getElementById("show-grid");

const clear_grid_button = document.querySelector("#clear-grid");
const size_slider = document.getElementById("grid-size");
const size_label = document.querySelectorAll("#size > h4 > span");

// variables declaration
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_GRID_SHOW = true;
const DEFAULT_COLOR = '#000000';

let grid_size;
let color = DEFAULT_COLOR;
let show_grid;
let eraser_mode;
let mouseClicked = false;
let rainbow_mode;
let rainbow_color;

size_slider.addEventListener("input", () => {
    size_label.forEach(span => span.innerHTML = size_slider.value);
});

// show grid checkbox element
grid_show.oninput = (e) => {
    const cells = document.querySelectorAll(".grid-elem");
    if(!show_grid) { // if grid isn't shown
        cells.forEach(div => div.style.border='0px solid rgb(223, 219, 219)');
        show_grid = true;
    } else { // if grid is shown
        cells.forEach(div => { // get each div element of the grid and draw 1px border with drawed color if it is filled
            if(div.classList.contains('filled')) div.style.border='1px solid ' + window.getComputedStyle(div,null).getPropertyValue('background-color');
            else div.style.border='1px solid rgb(223, 219, 219)';
            show_grid = false;
        });
    }
}

// enable/disable rainbow mode usin checkbox
rainbow_set.oninput = (e) => {
    if(rainbow_mode) {
        rainbow_mode = false;
        if(!eraser_mode) color_picker.disabled = false;
        return
    }
    rainbow_mode = true;
    color_picker.disabled = true;
}

// enable/disable eraser mode
eraser.oninput = (e) => {
    if(eraser_mode) {
        eraser_mode = false;
        if(!rainbow_mode) color_picker.disabled = false;
        return
    }
    eraser_mode = true;
    color_picker.disabled = true;
}


// color picker input and 
const color_picker = document.getElementById("color-picker");
color_picker.oninput = (e) => color = e.srcElement.value;

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
    setGrid(DEFAULT_GRID_SIZE);

    //grid_size_button.addEventListener("input", (e) => (setGrid(grid_size_button.value)))
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
            row_element.addEventListener('click', hover); // listen to mouse event to draw
            row_element.addEventListener('mousedown', hover); // listen to mouse event to draw
            row_element.addEventListener('mouseover', hover); // listen to mouse event to draw
            row_element.style.border= (show_grid) ? '0px solid rgb(223, 219, 219)' : '1px solid rgb(223, 219, 219)';
        }
    }
}

function clearGrid() {setGrid(size_slider.value);} // grid clearer function

/* DRAWER FUNCTION */
function hover(e) {
    if(!mouseClicked && e.type != 'click') return; // if mouse isn´t clicked, return

    if(eraser_mode) {
        this.classList.remove('filled');
        this.style.background = '#ffffff';
        this.style.border= (show_grid) ? '0px solid rgb(223, 219, 219)' : '1px solid rgb(223, 219, 219)';;
        return;
    }

    this.classList.add('filled');

    if(rainbow_mode) {
        rainbow_color = getRainbow();
        this.style.background  = rainbow_color;
        this.style.borderColor = rainbow_color;
    } else {
        this.style.background  = color;
        this.style.borderColor = color;
    }
}

/* RANDOM COLOR GENERATOR FUNCTION */
function getRainbow() {
    return  '#' + Math.floor(Math.random()*16777215).toString(16); // added # symbol to color generated
}

function changeSize() {
    setGrid(size_slider.value);
}