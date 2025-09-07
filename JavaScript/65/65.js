//A.

(function () {
    'use strict';
    const acc1 = {
        balance: 500,
        transaction: function (amount) {
            this.balance += amount;
        }
    };
    const acc2 = {
        balance: 350,
        transaction: function (amount) {
            this.balance += amount;
        }
    };
    acc1.transaction(-150);
    acc2.transaction(150);

    console.log('Account #1 balance:', acc1.balance);
    console.log('Account #1 balance:', acc2.balance);
}());

//B.

(function () {
    'use strict';
    function transaction(amount) {
        this.balance += amount;
    }
    const acc1 = { balance: 500 };
    const acc2 = { balance: 350 };

    transaction.call(acc1, -150);
    transaction.call(acc2, 150);

    console.log('Account #1 balance:', acc1.balance);
    console.log('Account #1 balance:', acc2.balance);

}());

//C.

(function () {
    'use strict';
    function transaction(amount) {
        this.balance += amount;
    }
    const acc1 = { balance: 500 };
    const acc2 = { balance: 350 };

    const repeateDeposit = transaction.bind(acc2, 50);

    repeateDeposit();
    repeateDeposit();
    repeateDeposit();

    console.log('Account #1 balance:', acc1.balance);
    console.log('Account #1 balance:', acc2.balance);
}());