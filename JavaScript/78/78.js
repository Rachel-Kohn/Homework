function vehicle(color) {
    this.color = color;
    this.speed = 0;
}

vehicle.prototype.go = function (speed) {
    this.speed = speed;
    console.log('now going at speed ' + speed);
};

vehicle.prototype.print = function () {
    console.log('Color:', this.color, 'Speed:', this.speed);
};

function Plane(color) {
    vehicle.call(this, color);
}

Plane.prototype = Object.create(vehicle.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.go = function (speed) {
    this.speed = speed;
    console.log('now FLYING at speed ' + speed);
};

const car = new vehicle('black');
car.go(35);
car.print();

const jet = new Plane('white');
jet.go(550);
jet.print();