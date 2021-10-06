let vmin;

let nodes = [];

const PROP_SPEED = 0.1 // units/s
const MAX_DIST = 0.1; // units
const MAX_TRAVEL_TIME = MAX_DIST/PROP_SPEED


function emit(node1, event, data) {
  for(let node2 of nodes) {
    dist = Math.hypot(node1.x - node2.x, node1.y - node2.y);

    if (node1.id === node2.id) continue;

    if (dist < MAX_DIST) setTimeout(() => node2.on(event, data), dist/PROP_SPEED * 1000);
  }
}

function setup() {
  createCanvas(1, 1);

  windowResized();

  for(let i=0;i<1000;i++) nodes.push(new Node(emit));

  for(let node of nodes) node.on("init");
}

function draw() {
  background(0);

  for(let node of nodes) {
    c = node.color ?? "red";
    if (Array.isArray(c)) {
       fill(...c)
    } else {
      fill(c)
    }
    
    noStroke();
    circle(node.x * vmin, node.y * vmin, 2);

    const SIGNAL_AGE = (Date.now() - node.lastEmit)/1000;

    if (SIGNAL_AGE < MAX_TRAVEL_TIME) {
    noFill();
    stroke(255, map(1 - SIGNAL_AGE/MAX_TRAVEL_TIME, 0, 1, 0, 100));
      circle(node.x * vmin, node.y * vmin, SIGNAL_AGE * PROP_SPEED * vmin)
    }
  }
}

function windowResized() {
  vmin = Math.min(windowWidth, windowHeight);
  resizeCanvas(vmin, vmin);
}