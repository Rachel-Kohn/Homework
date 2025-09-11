(function(){
    'use strict';

    const container = document.getElementById('container');
    let counter = container.querySelectorAll('button').length;

    function generateButton() {
        counter += 1;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = String(counter);

        btn.addEventListener('click', generateButton);
        container.appendChild(btn);
    }
    document.getElementById('start').addEventListener('click', generateButton);

}());