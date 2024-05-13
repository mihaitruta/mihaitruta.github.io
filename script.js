let size = 400;
let squares = [];
let squareSize = size / 20;
let pathSize = size / 2;
let path = [];
let start = size / 2 - pathSize / 2;
const positionsPerStep = 30;
const squarePlacements = [0, 0.22, 0.41, 0.59, 0.78, 1];

function createPositions() {
  addPositionsForSide("top", start, start);
  addPositionsForSide("right", start + pathSize, start);
  addPositionsForSide("bottom", start, start + pathSize);
  addPositionsForSide("left", start, start);
}

function addPositionsForSide(side, x, y) {
  for (let p = 0; p < squarePlacements.length - 1; p++) {
    const offset =
      side == "top" || side == "right"
        ? pathSize * squarePlacements[p]
        : pathSize - pathSize * squarePlacements[p];
    const start = side == "top" || side == "bottom" ? x : y;
    const positionStart = start + offset;
    const step =
      (pathSize * squarePlacements[p + 1] - pathSize * squarePlacements[p]) /
      positionsPerStep;
    for (let i = 0; i < positionsPerStep; i++) {
      const adjustment =
        side == "top" || side == "right" ? step * i : -step * i;
      path.push({
        x: side === "top" || side === "bottom" ? positionStart + adjustment : x,
        y: side === "left" || side === "right" ? positionStart + adjustment : y
      });
    }
  }
}

class Square {
  constructor(position, size, color) {
    this.position = position;
    this.size = size;
    this.color = color;
  }

  move() {
    this.position++;
    if (this.position >= path.length) {
      this.position = 0;
    }
  }

  draw() {
    stroke(this.color);
    strokeWeight(this.size * 0.14);
    square(
      path[this.position].x - this.size / 2,
      path[this.position].y - this.size / 2,
      this.size
    );
  }
}

function createSquares() {
  for (let i = 0; i < path.length; i += positionsPerStep) {
    squares.push(
      new Square(
        i,
        squareSize,
        color(Math.floor((i / path.length) * 360), 100, 34)
      )
    );
  }
}

// p5 methods
function setup() {
  const c = createCanvas(size, size);
  c.parent("canvas");
  noFill();
  colorMode(HSL);
  resize();
}

function draw() {
  clear();
  strokeWeight(1);
  // square(start, start, pathSize);
  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    square.draw();
    square.move();
  }
}

function resize() {
  if (windowWidth < 420) {
    size = windowWidth * 0.8;
  } else {
    size = 400;
  }

  pathSize = size / 2;
  squareSize = size / 20;
  start = size / 2 - pathSize / 2;
  resizeCanvas(size, size);
  squares = [];
  path = [];
  createPositions();
  createSquares();
}

function windowResized() {
  resize();
}

requestAnimationFrame(() => {});
