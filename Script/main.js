// set the environment  value
let cols = 50;
let rows = 50;
let chanceToBeWall = 0.3;
let hSize = 700;
let wSize = 700;

// 
let openSet = [];
let closedSet = []
// start and destination position 
let start;
let end;
// heing and witdh of the canvas
let w, h;
// 1D array setup
let grid = new Array(cols);
//
let path = [];
let current;
let noSolution = false;


function Node(i, j){
    // Location
    this.i = i;
    this.j = j;

    // Value to compare 
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];
    this.previous = undefined;

    this.wall = false
    
    if (random(1) < chanceToBeWall) {
        this.wall = true
    }
    this.show = function(col){
        fill(col);
        if (this.wall){
            fill(0);
        }
        stroke(0);
        rect(this.i * w, this.j * h, w - 1, w - 1);
    }

    this.addNeighbors = function(grid){
        let i = this.i;
        let j = this.j;

        // add the neighbor vertical and horizontal
        if (i < cols - 1){
            this.neighbors.push(grid[i+ 1][j]);
        }
        if (i > 0){
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1){
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0){
            this.neighbors.push(grid[i][j - 1]);
        }

        // add the diogonal neighbor
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1]);
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1]);
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1][j + 1]);
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j + 1]);
        }
    }
}

function RemoveFromArray(array, element){
    for (var i = array.length - 1; i >= 0; i--){
        if (array[i] == element){
            array.splice(i, 1);
        }
    }
}

function heuristic(a, b){
    let d = abs(a.i - b.i) + abs(a.j - b.j)
    return d;
}

// good to go
function setup() {
    createCanvas(wSize, hSize);

    // noLoop();

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

    // assign neighbor for each node
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    // set start and destination
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;

    // add it to the start of openset
    openSet.push(start);
}

function draw(){
    background(0);
    /**
     * A* Algorithim
     */
    if (openSet.length > 0) {
        // the node in openSet having the lowest fScore[] value
        var winner = 0;

        for (let i = 0; i < openSet.length; i++) {
            // compare with the existing node in openset
            if (openSet[i].f < openSet[winner].f){
                // set the Node with the lowest 
                // value of f in the winner index
                winner = i;
            }
        }

        // use the winner node to compare in the next part 
        // current is the node with the lowest f score
        current = openSet[winner];
        
        if (current === end){
            // find the path
            path = []
            let temp = current;
            path.push(temp);
            while (temp.previous != undefined) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            noLoop();
            console.log("DONE!!")
        }
        
        // put it into the closeSet as it will be evaluated
        RemoveFromArray(openSet, current);
        closedSet.push(current);

        // evaluate current posisition by 
        // checking every neighbor 
        let neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++){
            // set neigbor node for evaluation 
            let neighbor = neighbors[i];
            
            if (neighbor != undefined){
                // check if it has been evaluated before
                if (!closedSet.includes(neighbor) && !neighbor.wall) {
                    let tempG = current.g + 1;

                    // check node in the open set if the temG is a better g
                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                        }
                    } else {
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                    }

                    // find the distance between it and the destication 
                    neighbor.h = heuristic(neighbor, end);
                    // set score of that node 
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
            else{
                console.log(i);
            }
        }
    }
    else{
        console.log("No solution!!")
        noSolution = true;
        noLoop();
    }

    // visualization loop
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

    if(!noSolution){
        path = []
        let temp = current;
        path.push(temp);
        while (temp.previous != undefined) {
            path.push(temp.previous);
            temp = temp.previous;
        }
    }
    
    for (let i = 0; i < path.length; i++){
        path[i].show(color(0, 0, 255));
    }
}
