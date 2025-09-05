'use strict';

//Days of the week 
const dayUtils = (function () {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
        getDayName(index) {
            return days[index - 1];
        },
        getDayNumber(dayName) {
            return days.findIndex(d => d === dayName) + 1;
        }
    };
}());
console.log(dayUtils.getDayName(1));
console.log(dayUtils.getDayName(7));
console.log(dayUtils.getDayNumber('Monday'));
console.log(dayUtils.getDayNumber('Friday'));

//Interest calculator 
const interestCalculator = (function () {
    let rate = 0;
    let years = 0;
    return {
        setRate(r) {
            rate = r;
        },
        setYears(y) {
            years = y;
        },
        calculateInterest(principal) {
            return principal * rate * years;
        }
    };
}());
interestCalculator.setRate(0.10);
interestCalculator.setYears(3);
console.log(interestCalculator.calculateInterest(1000)); 