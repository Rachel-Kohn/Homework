'use strict';

function toCel(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function toFahr(celsius) {
    return (celsius / 5) * 9 + 32;
}
console.log(toCel(32));
console.log(toCel(100));

console.log(toFahr(0));
console.log(toFahr(37.78));

const fUser = prompt('Enter a temp in Fahrenheit:');
const c = toCel(Number(fUser));
alert(`${fUser}°F is ${c.toFixed(2)}°C`);

const cUser = prompt('Enter a temp in Celsius:');
const f = toFahr(Number(cUser));
alert(`${cUser}°C is ${f.toFixed(2)}°F`);

function mult(a, b) {
    return a * b;
}

console.log(mult(10, 2));
console.log(mult(10, 3));

function getMultiplier() {
    return function (a, b) {
        return a * b;
    };
}
const multiply = getMultiplier();
console.log(multiply(10, 2));
console.log(multiply(10, 3));


function getMultiplier2(x) {
    return function (y) {
        return x * y;
    };
}
const multFive = getMultiplier2(5);
console.log(multFive(2));

const multSix = getMultiplier2(6);
console.log(multSix(2)); 