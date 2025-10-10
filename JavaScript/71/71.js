/* global $ */
(function () {
    'use strict';

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function loadFile(fileName) {
        $('#message').text('Loading...');
        $('#content').text('');

        try {
            await delay(3000);
            const response = await fetch(fileName);

            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }

            const text = await response.text();
            $('#message').text('File loaded successfully!');
            $('#content').text(text);
        } catch (err) {
            $('#message').text(`Error: ${err.message}`);
        }
    }

    $('#loadButton').on('click', () => {
        const fileName = $('#fileInput').val().trim();

        if (!fileName) {
            $('#message').text('Please enter a file name.');
            return;
        }

        loadFile(fileName);
    });
})();