class Orbit {

    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.xDirection = [0, 1, 0, -1];
        this.yDirection = [1, 0, -1, 0];
        this.xDirectionIndex = 0;
        this.yDirectionIndex = 0;
        this.ballX = x;
        this.ballY = y;
    }

    setWidth(w) {
        this.width = w;
    }

    setHeight(h) {
        this.height = h;
    }

    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        rect(this.x, this.y, this.width, this.height);
        strokeWeight(8);
        point(this.ballX, this.ballY);
    }

    move() {
        this.ballX += this.xDirection[this.xDirectionIndex % 4] * this.speed;
        this.ballY += this.yDirection[this.yDirectionIndex % 4] * this.speed;

        if (this.ballY === (this.y + this.height) && this.ballX === this.x) {
            this.xDirectionIndex += 1;
            this.yDirectionIndex += 1;
        }
        if (this.ballX === (this.x + this.width) && this.ballY === (this.y + this.height)) {
            this.xDirectionIndex += 1;
            this.yDirectionIndex += 1;
        }
        if (this.ballY === this.y && this.ballX === (this.x + width)) {
            this.xDirectionIndex += 1;
            this.yDirectionIndex += 1;
        }
        if (this.ballX === this.x && this.ballY === this.y) {
            this.xDirectionIndex += 1;
            this.yDirectionIndex += 1;
        }

    }
}