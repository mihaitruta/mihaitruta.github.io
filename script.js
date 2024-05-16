let size = 400;
let maxSize = 200;
let minSize = 50;
let currentSize = minSize;
let growing = true;
let speed = 1;
let iter = 0;
let colorStart;
let colorEnd;
let middleSize;
let distanceFromMiddle;
let distanceFromMiddleNormalized;

function setup() {
  const c = createCanvas(size, size);
  c.parent("canvas");
  noFill();
  colorMode(HSL);
  colorStart = color(200, 100, 50); // Starting color for gradient
  colorEnd = color(300, 100, 50); // Ending color for gradient
}

function draw() {
  iter = (iter + 1) % 1000;
  clear();

  let steps = 50;
  for (let i = steps; i > 0; i--) {
    let inter = map(i, 0, steps, 0, 1);
    inter = inter * distanceFromMiddleNormalized;
    let c = lerpColor(colorStart, colorEnd, inter);
    fill(c);
    noStroke();
    ellipse(width / 2, height / 2, currentSize * (i / steps), currentSize * (i / steps));
  }

  middleSize = (maxSize + minSize) / 2;
  distanceFromMiddle = abs(currentSize - middleSize);
  distanceFromMiddleNormalized = distanceFromMiddle / (middleSize - minSize);
  if (iter % 117 === 1) {
    console.log('middleSize', middleSize)
    console.log('abs', abs(currentSize - middleSize));
    console.log('distanceFromMiddleNormalized', distanceFromMiddleNormalized);
  }
  let speed = (1.05 - distanceFromMiddleNormalized) * 3;
  if (growing) {
    currentSize += speed;
    if (currentSize >= maxSize) {
      growing = false;
      setTimeout(() => {}, 1000)
    }
  } else {
    currentSize -= speed;
    if (currentSize <= minSize) {
      growing = true;
      setTimeout(() => {}, 1000)
    }
  }
}


function windowResized() {
  if (windowWidth < 420) {
    size = windowWidth * 0.8;
  } else {
    size = 400;
  }

  resizeCanvas(size, size);
}

requestAnimationFrame(() => {});
