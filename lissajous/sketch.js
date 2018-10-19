var orbits = [];
var orbitW = 50;
var orbitH = 50;
var cols;
var rows;

function setup() {
    createCanvas(850, 850);
    noFill();
    for (var i = 0; i < 1; i++) {
        strokeWeight(1);
        var cx = 1.5 * orbitW * (i + 1);
        var cy = orbitH / 2;
        orbits.push(new Orbit(orbitW, orbitH, cx, cy));
    }
}

function draw() {
    background(9, 21, 56);
    for (var i=0; i<orbits.length; i++)
    {
        orbits[i].show();
        orbits[i].move();
    }
}

