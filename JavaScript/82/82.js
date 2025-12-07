(function () {
    'use strict';

    const SNAKE_SIZE = 64;
    const SPEED_INITIAL = 500;

    const canvas = document.querySelector('#theCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
        canvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let direction = 'ArrowRight';
    let score = 0;
    let speed = SPEED_INITIAL;

    const snakeSegments = [{ x: 0, y: 0 }];

    const snakeHeadImg = document.createElement('img');
    snakeHeadImg.src = 'images/snakehead.png';

    const appleImg = document.createElement('img');
    appleImg.src = 'images/apple.png';

    let apple = { x: 0, y: 0 };

    function placeApple() {
        let valid = false;
        while (!valid) {
            const maxCols = canvas.width / SNAKE_SIZE;
            const maxRows = canvas.height / SNAKE_SIZE;
            const col = Math.floor(Math.random() * maxCols);
            const row = Math.floor(Math.random() * maxRows);
            apple.x = col * SNAKE_SIZE;
            apple.y = row * SNAKE_SIZE;
            valid = !snakeSegments.some(seg => seg.x === apple.x && seg.y === apple.y);
        }
    }
    placeApple();

    function moveSnake() {
        const head = { ...snakeSegments[0] };
        switch (direction) {
            case 'ArrowRight': head.x += SNAKE_SIZE; break;
            case 'ArrowLeft': head.x -= SNAKE_SIZE; break;
            case 'ArrowUp': head.y -= SNAKE_SIZE; break;
            case 'ArrowDown': head.y += SNAKE_SIZE; break;
        }

        if (
            head.x < 0 || head.x >= canvas.width ||
            head.y < 0 || head.y >= canvas.height ||
            snakeSegments.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
            alert('Game Over! Final Score: ' + score);
            document.location.reload();
        }

        snakeSegments.unshift(head);

        if (head.x === apple.x && head.y === apple.y) {
            score++;
            speed = Math.max(100, speed - 20);
            placeApple();
        } else {
            snakeSegments.pop();
        }
    }

    function drawGrid() {
        ctx.fillStyle = 'red';
        const dotRadius = 4;
        for (let x = SNAKE_SIZE / 2; x < canvas.width; x += SNAKE_SIZE) {
            for (let y = SNAKE_SIZE / 2; y < canvas.height; y += SNAKE_SIZE) {
                ctx.beginPath();
                ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawGrid();

        ctx.drawImage(appleImg, apple.x, apple.y, SNAKE_SIZE, SNAKE_SIZE);

        snakeSegments.forEach((seg, index) => {
            if (index === 0) {
                ctx.drawImage(snakeHeadImg, seg.x, seg.y, SNAKE_SIZE, SNAKE_SIZE);
            } else {
                ctx.fillStyle = 'lime';
                ctx.fillRect(seg.x, seg.y, SNAKE_SIZE, SNAKE_SIZE);
            }
        });

        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Score: ' + score, 10, 30);
    }

    function gameLoop() {
        moveSnake();
        draw();
        setTimeout(gameLoop, speed);
    }

    snakeHeadImg.onload = () => {
        appleImg.onload = () => {
            gameLoop();
        };
    };

    document.addEventListener('keydown', e => {
        const opposite = {
            ArrowRight: 'ArrowLeft',
            ArrowLeft: 'ArrowRight',
            ArrowUp: 'ArrowDown',
            ArrowDown: 'ArrowUp'
        };
        if (e.key in opposite && direction !== opposite[e.key]) {
            direction = e.key;
        }
    });
})();