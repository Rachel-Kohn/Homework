(function () {
    'use strict';

    const startButton = document.getElementById('start');
    const paragraph = document.querySelector('p');
    const tableBody = document.querySelector('#table tbody');
    const body = document.body;

    let intervalId = null;

    startButton.addEventListener('click', () => {
        if (!intervalId) {
            startColor();
            startButton.innerText = 'Stop';
        } else {
            stopColor();
            startButton.innerText = 'Start';
        }
    });

    function startColor() {
        intervalId = setInterval(() => {
            const textColor = getRandomColor();
            const bgColor = getRandomColor();

            paragraph.style.color = textColor;
            body.style.backgroundColor = bgColor;

            const now = new Date();
            const row = tableBody.insertRow();
            const timeCell = row.insertCell();
            const textCell = row.insertCell();
            const bgCell = row.insertCell();

            timeCell.innerText = now.toLocaleTimeString();
            textCell.innerText = textColor;
            bgCell.innerText = bgColor;

            row.addEventListener('click', () => {
                stopColor();
                paragraph.style.color = textColor;
                body.style.backgroundColor = bgColor;
                startButton.innerText = 'Start';
            });

        }, 1000);
    }

    function stopColor() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    }

})();
