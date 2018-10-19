var bubbles = [];

function setup() {
    createCanvas(640, 440);
    for (var i = 0; i < 500; i++) {
        bubbles.push(new Bubble(random(0, width), random(0, height), 50));
    }
}

function draw() {
    background(9, 21, 56);
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].display();
        bubbles[i].checkMouseOver();
    }
}

function Bubble(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.display = function () {
        noStroke();
        fill(158, 23, 110, 110);
        ellipse(this.x, this.y, this.r, this.r);
    };
    this.move = function () {

        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
    };
    this.checkMouseOver = function () {
        var d = dist(this.x, this.y, mouseX, mouseY);
        if (d <= this.r / 2) {
            this.move();
        }
        else {
        }
    }
}

// function mousePressed() {
//     bubbles.push(new Bubble(mouseX, mouseY, 50));
// }
// function mousePressed() {
//     bubbles.splice(0, 1);
// }