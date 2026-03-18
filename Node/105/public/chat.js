/* global io */

const socketIo = io();

const username = prompt('Enter your name:');
socketIo.emit('join', username);

const messages = document.querySelector('#messages');
const messageInput = document.querySelector('#messageInput');

socketIo.on('msg', msg => {
    let messageClass = 'other';

    if (msg.user === username) {
        messageClass = 'me';
    }

    if (msg.user === 'System') {
        messages.innerHTML += '<div class=\'system\'>' + msg.text + '</div>';
    } else {
        messages.innerHTML += '<div class=\'' + messageClass + '\'>' + msg.user + ' said - ' + msg.text + '</div>';
    }

    messages.scrollTop = messages.scrollHeight;
});

document.querySelector('#messageForm').addEventListener('submit', e => {
    e.preventDefault();

    if (messageInput.value.trim() === '') return;

    socketIo.emit('msg', {
        user: username,
        text: messageInput.value
    });

    messageInput.value = '';
});