var measurements = require('./measurements');

var data = [
    { time: new Date(), value: 1.20 },
    { time: new Date(), value: 1.21 },
    { time: new Date(), value: 1.22 },
    { time: new Date(), value: 1.23 },
    { time: new Date(), value: 1.24 },
    { time: new Date(), value: 1.25 },
    { time: new Date(1234567), value: 1.26 }
];

measurements.saveall(data);
