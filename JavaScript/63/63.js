'use strict';

const ltr1 = ['A', 'B', 'C'];
const ltr2 = ['A', 'B', 'c'];
const ltr3 = ['a', 'b', 'c'];

// Check if all elements in array pass the test
function myEvery(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i])) {
            return false;
        }
    }
    return true;
}

// Check if at least one element in array passes the test
function mySome(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return true;
        }
    }
    return false;
}

// Run an action on each element that passes test
function myOnlyIf(array, callback, actionCallback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            actionCallback(array[i]);
        }
    }
}

// Check if a letter is upper
function isUpper(letter) {
    return letter === letter.toUpperCase();
}

// Check if a letter is lower
function isLower(letter) {
    return letter === letter.toLowerCase();
}

// Testing myEvery
console.log('myEvery upper ltr1:', myEvery(ltr1, isUpper));
console.log('myEvery upper ltr2:', myEvery(ltr2, isUpper));
console.log('myEvery lower ltr2:', myEvery(ltr2, isLower));
console.log('myEvery lower ltr3:', myEvery(ltr3, isLower));

// Testing built-in every
console.log('built-in every upper ltr1:', ltr1.every(isUpper));
console.log('built-in every upper ltr2:', ltr2.every(isUpper));
console.log('built-in every lower ltr2:', ltr2.every(isLower));
console.log('built-in every lower ltr3:', ltr3.every(isLower));

// Testing mySome
console.log('mySome upper ltr2:', mySome(ltr2, isUpper));
console.log('mySome lower ltr2:', mySome(ltr2, isLower));
console.log('mySome upper ltr3:', mySome(ltr3, isUpper));

// Testing built-in some
console.log('built-in some upper ltr2:', ltr2.some(isUpper));
console.log('built-in some lower ltr2:', ltr2.some(isLower));
console.log('built-in some upper ltr3:', ltr3.some(isUpper));

// Testing myOnlyIf
console.log('myOnlyIf lower ltr2:');
myOnlyIf(ltr2, isLower, x => console.log('->', x));

// Using filter + forEach 
console.log('filter + forEach lower ltr2:');
ltr2.filter(isLower).forEach(x => console.log('->', x));
