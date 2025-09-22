window.pcs = function (selector) {
    'use strict';

    function getElement(selector) {
        return document.querySelector(selector);
    }

    function setCss(element, property, value) {
        element.style[property] = value;
    }

    function getCss(element, property) {
        return getComputedStyle(element)[property];
    }

    function on(element, event, callback) {
        element.addEventListener(event, callback);
    }

    const element = getElement(selector);

    return {
        css: function (property, value) {
            if (arguments.length === 1) {
                return getCss(element, property);
            } else {
                return setCss(element, property, value);
            }
        },
        on: (event, callback) => {
            on(element, event, callback);
        },
        click: (callback) => on(element, 'click', callback),

        
        hide: () => setCss(element, 'display', 'none'),
        show: () => setCss(element, 'display', 'inline-block'),
        sparkle: (duration = 2000, speed = 250) => {
            const originalColor = getCss(element, 'color');
            const intervalId = setInterval(() => {
                const color = `#${Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0')}`;
                setCss(element, 'color', color);
            }, speed);
            setTimeout(() => {
                clearInterval(intervalId);
                setCss(element, 'color', originalColor);
                        }, duration);
        }
    };
};