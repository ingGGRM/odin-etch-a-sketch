/* MAIN JAVASCRIPT FILE */

// const declarations for elements getters
const container = document.getElementById("container");
const grid_container = document.getElementById("grid-container");

// variables declaration


function init() { // function call on full page load
    for(let i = 0; i < 16; i++) { // grid rows creation
        const grid_row = document.createElement('div');
        grid_row.classList.add('rows');
        grid_container.appendChild(grid_row);

        for(let i = 0; i < 16; i++) { // grid column elements for each row element
            const row_element = document.createElement('div');
            row_element.classList.add('grid-elem');
            grid_row.appendChild(row_element);
        }
    }
}