// Number of waves
var waveNum = 5;

var yoff = [];        // 2nd dimension of perlin noise
var colorRand = [];
var stagger = [];
var staggerDist = 10;
let snowflakes = []; // array to hold snowflake objects

var fillAlpha = 170;
var colors;
var moon;
var cloud;
var flag;
var snowflakecolor;

function setup() {

    createCanvas(640, 440);
    smooth();

    // Initalise values for arrays
    for (var i = 0; i < waveNum; i++) {

        yoff[i] = random(50);

        colors = [
            color(15, 37, 164, fillAlpha),
            color(11, 52, 110, fillAlpha),
            color(0, 92, 175, fillAlpha),
            color(81, 168, 221, fillAlpha),
            color(17, 50, 133, fillAlpha)
        ];

        stagger[i] = i * staggerDist;

    }
    snowflakecolor = color(255);
    moon = new Moon(90, 70, 60);
    cloud = new Cloud();
    flag = true; // display moon
}

function draw() {
    background(9, 21, 56);
    fill(125, 50, 34);
    let t = frameCount / 60; // update time

    // create a random number of snowflakes each frame
    for (var i = 0; i < random(5); i++) {
        fill(255);
        snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(snowflakecolor); // draw snowflake
    }

    displayWave();
    if (flag) {
        moon.display();
    }
    else // cloud display
    {
        cloud.display();
    }
}

// Noisewave example in function form
// Original: https://p5js.org/examples/math-noise-wave.html

function noiseWave(yoff, stagger) {

    beginShape();

    this.xoff = 0;       // Option #1: 2D Noise

    // Iterate over horizontal pixels
    for (var x = 0; x <= width + 10; x += 10) {
        // Calculate a y value according to noise, map to

        // Option #1: 2D Noise
        this.y = map(noise(this.xoff, yoff), 0, 1, height / 2 + 250 + stagger, height / 2 + 50 + stagger);
        // Set the vertex
        vertex(x, this.y);
        // Increment x dimension for noise
        xoff += 0.05;
    }

    // Close up the shape

    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);


}

// snowflake class
function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function (time) {
        // x position follows a circle
        let w = 0.6; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += pow(this.size, 0.5);

        // delete snowflake if past end of screen
        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function (col) {
        fill(col);
        ellipse(this.posX, this.posY, this.size);
    };
}

function mousePressed() {
    // check if mouse clicked IN the moon
    var d = dist(mouseX, mouseY, moon.x, moon.y);
    if (d < moon.r/2) {
        if (flag) // if moon current
        {
            flag = !flag;
            snowflakecolor = color(139, 234, 253, 170);
        }
        else {
            flag = !flag;
            snowflakecolor = color(255);
        }
    }


}

function displayWave() {
    for (var j = 0; j < waveNum; j++) {
        noStroke();
        fill(colors[j]);
        noiseWave(yoff[j], stagger[j]);
        yoff[j] += 0.005;
    }
}

function Moon(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = color(255, 255, 51, 230);

    this.display = function () {
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.r, this.r);
    };
    this.clicked = function () {
        this.col = color(255, 255, 255, 230);
    }
}

function Cloud() {
    this.display = function () {
        noStroke();
        fill(145, 152, 159, 178);
        ellipse(60, 80, 60, 60);
        ellipse(80, 80, 60, 60);
        ellipse(100, 80, 60, 60);
        ellipse(120, 80, 60, 60);
        ellipse(80, 60, 60, 60);
        ellipse(100, 60, 60, 60);
    }
}