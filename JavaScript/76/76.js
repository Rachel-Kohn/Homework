(function () {
    'use strict';

    let zIndexCounter = 1;
    let isMuted = false;

    const potatoArea = document.querySelector('#potato-area');
    const clearBtn = document.getElementById('clear-btn');
    const addBodyBtn = document.getElementById('add-body-btn');
    const muteBtn = document.getElementById('mute-btn');
    let dragging = null;

    const clickSound = new Audio('sound/click.mp3');
    const music = document.getElementById('background-music');

    let drawings = JSON.parse(localStorage.getItem('drawings')) || [];
    const saveDrawings = () => localStorage.setItem('drawings', JSON.stringify(drawings));

    if (!drawings.some(item => item.type === 'body')) {
        drawings.push({ type: 'body' });
        saveDrawings();
    }

    drawings.forEach(item => {
        if (item.type === 'body') potatoArea.appendChild(createBody());
        else {
            const piece = createPiece(item);
            potatoArea.appendChild(piece);
            makeMovable(piece);
        }
    });

    function createBody() {
        const body = document.createElement('img');
        body.src = 'images/body.png';
        body.alt = 'Potato body';
        body.className = 'potato-body';
        return body;
    }

    function createPiece(item) {
        const piece = document.createElement('img');
        piece.src = item.src;
        piece.alt = item.alt;
        piece.className = 'draggable';
        piece.style.position = 'absolute';
        piece.style.left = item.left;
        piece.style.top = item.top;
        piece.style.width = '80px';
        piece.style.height = '80px';
        return piece;
    }

    document.querySelectorAll('.piece').forEach(piece => {
        piece.addEventListener('dragstart', e => dragging = e.target);
        piece.addEventListener('mousedown', () => { if (!isMuted) clickSound.play(); });
    });

    potatoArea.addEventListener('dragover', e => e.preventDefault());
    potatoArea.addEventListener('drop', e => {
        e.preventDefault();
        if (!dragging) return;

        const rect = potatoArea.getBoundingClientRect();

        if (dragging.parentElement.classList.contains('pieces')) {
            const newPiece = dragging.cloneNode(true);
            newPiece.classList.add('draggable');
            newPiece.style.position = 'absolute';
            newPiece.style.left = `${e.clientX - rect.left - 40}px`;
            newPiece.style.top = `${e.clientY - rect.top - 40}px`;
            newPiece.style.width = '80px';
            newPiece.style.height = '80px';
            newPiece.style.zIndex = ++zIndexCounter;

            potatoArea.appendChild(newPiece);
            makeMovable(newPiece);

            drawings.push({
                type: 'piece',
                src: newPiece.src,
                alt: newPiece.alt,
                left: newPiece.style.left,
                top: newPiece.style.top
            });
            saveDrawings();

            if (!isMuted) clickSound.play();
        } else {
            dragging.style.left = `${e.clientX - rect.left - 40}px`;
            dragging.style.top = `${e.clientY - rect.top - 40}px`;
            dragging.style.zIndex = ++zIndexCounter;

            const index = drawings.findIndex(item =>
                item.type === 'piece' &&
                item.src === dragging.src &&
                item.left === dragging.dataset.originalLeft &&
                item.top === dragging.dataset.originalTop
            );
            if (index !== -1) {
                drawings[index].left = dragging.style.left;
                drawings[index].top = dragging.style.top;
                saveDrawings();
            }

            if (!isMuted) clickSound.play();
        }

        dragging = null;
    });

    function makeMovable(el) {
        el.addEventListener('mousedown', e => {
            if (!isMuted) clickSound.play();
            e.preventDefault();
            const offsetX = e.clientX - el.offsetLeft;
            const offsetY = e.clientY - el.offsetTop;
            el.style.zIndex = ++zIndexCounter;

            function onMove(e) {
                el.style.left = `${e.clientX - offsetX}px`;
                el.style.top = `${e.clientY - offsetY}px`;
            }

            function onUp() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                const index = drawings.findIndex(item =>
                    item.type === 'piece' &&
                    item.src === el.src &&
                    item.left === el.dataset.originalLeft &&
                    item.top === el.dataset.originalTop
                );
                if (index !== -1) {
                    drawings[index].left = el.style.left;
                    drawings[index].top = el.style.top;
                    saveDrawings();
                }
            }

            el.dataset.originalLeft = el.style.left;
            el.dataset.originalTop = el.style.top;
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });

        el.addEventListener('dblclick', () => {
            el.remove();
            drawings = drawings.filter(item =>
                !(item.type === 'piece' &&
                    item.src === el.src &&
                    item.left === el.style.left &&
                    item.top === el.style.top)
            );
            saveDrawings();
            if (!isMuted) clickSound.play();
        });
    }

    clearBtn.addEventListener('mousedown', () => { if (!isMuted) clickSound.play(); });
    addBodyBtn.addEventListener('mousedown', () => { if (!isMuted) clickSound.play(); });

    clearBtn.addEventListener('click', () => {
        potatoArea.innerHTML = '';
        drawings = [{ type: 'body' }];
        potatoArea.appendChild(createBody());
        saveDrawings();
    });

    addBodyBtn.addEventListener('click', () => {
        const bodyCount = drawings.filter(d => d.type === 'body').length;
        if (bodyCount >= 6) { alert('You can only have up to 6 potatoes.'); return; }
        potatoArea.appendChild(createBody());
        drawings.push({ type: 'body' });
        saveDrawings();
    });

    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) music.pause();
        else music.play();
        muteBtn.textContent = isMuted ? 'Unmute' : 'Mute';
    });

    music.play();
})();