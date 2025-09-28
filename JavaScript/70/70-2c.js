/* global app */
'use strict';

for (let i = 0; i < 10; i++) {
    app.counter.increment();
}
const aCounter = app.createCounter();
const bCounter = app.createCounter();

for (let i = 0; i < 5; i++) {
    aCounter.increment();
}

for (let i = 0; i < 15; i++) {
    bCounter.increment();
}
console.log('Single counter:', app.counter.getCount());
console.log('A counter:', aCounter.getCount());
console.log('B counter:', bCounter.getCount());
console.log('Total Counters Created:', app.getCountersCreated());