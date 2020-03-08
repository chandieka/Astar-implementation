// set the environment grid value
let cols = 10;
let rows = 10;

// 
let openSet = [];
let closedSet = []

// destination and 
let start;
let end;

// heing and witdh of the canvas
let w, h;

// 1D array setup
let grid = new Array(cols);

function Node(x, y){
    // Location
    this.x = x;
    this.y = y

    // Value to compare 
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.show = function(col){
        fill(col);
        stroke(0);
        rect(this.x * w, this.y * h, w - 1, w - 1);
    }
}

function setup() {
    createCanvas(500, 500);

    // set value for the grid 
    w = width / cols;
    h = height / rows;

    // Making a 2D array 
    for (let i = 0; i < cols; i++){
        grid[i] = new Array(rows);
    }

    // assign object Node to the array
    for (let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++){
            grid[i][j] = new Node(i, j);
        }
    }

    // set start and destination
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    openSet.push(start);
}

function draw(){
    // visualization loop

    if (openSet.length > 0) {
        //w we can keep going
    }
    else{
        // no solution
    }

    background(0);

    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            grid[i][j].show(color(255));
        }
    }

    for (let i = 0; i < closedSet.length; i++){
        closedSet[i].show(color(255, 0, 0));
    }

    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }
}
