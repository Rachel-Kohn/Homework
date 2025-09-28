function myMap(array, callback) {
    'use strict';

    const newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray.push(callback(array[i]));
    }

    return newArray;
}

const double = num => num * 2;

window.runMap = function () {
    const myArray = [2, 4, 6];
    const newArray = myMap(myArray, double);

    console.log('My original array:', myArray);
    console.log('My new array:', newArray);
};