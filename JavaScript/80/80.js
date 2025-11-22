(function () {
    'use strict';

    const canvas = document.querySelector('#theCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ball {
        #x;
        #y;
        #radius;
        #color;
        #dx;
        #dy;

        constructor(x, y, radius, color) {
            this.#x = x;
            this.#y = y;
            this.#radius = radius;
            this.#color = color;
            this.#dx = (Math.random() * 4) + 1;
            this.#dy = 2.5;
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.#color;
            ctx.arc(this.#x, this.#y, this.#radius, 0, 2 * Math.PI);
            ctx.fill();
        }

        move() {
            this.#x += this.#dx;
            this.#y += this.#dy;

            if (this.#x + this.#radius > canvas.width || this.#x - this.#radius < 0) {
                this.#dx = -this.#dx;
            }

            if (this.#y + this.#radius > canvas.height) {
                this.#y = canvas.height - this.#radius;
                this.#dy = -this.#dy * 0.8;
            }

            if (this.#y - this.#radius < 0) {
                this.#y = this.#radius;
                this.#dy = -this.#dy;
            }

            this.#dy += 0.2;
        }
    }

    const balls = [];

    function addBall() {
        const color = document.querySelector('#colorInput').value;
        const radius = Number(document.querySelector('#radiusInput').value);
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = radius;
        const ball = new Ball(x, y, radius, color);
        balls.push(ball);
    }

    document.querySelector('#addBallBtn').addEventListener('click', addBall);

    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const ball of balls) {
            ball.move();
            ball.draw();
        }
    }, 20);
})();