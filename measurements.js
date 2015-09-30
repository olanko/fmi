var pg = require('pg');

var config = require('./config');

var connstr = config.PG_CONNSTR;

save = function save(measurement) {
    pg.connect(connstr, function(err, client, done) {
        if(err) {
            return console.error('error fetching from pool', err);
        }

        var query = client.query({
          text: "INSERT INTO measurements(measurementid, val, ts) VALUES ($1, $2, $3);",
          values: [1, measurement.value, measurement.time],
          name: 'insert event'
        });

        query.on('end', function() {
            done();
            console.log(measurement);
        });
    });
}

saveall = function saveall(measurements) {
    for (var i = 0; i < measurements.length; i++) {
        save(measurements[i]);
    }
}

exports.save = save;
exports.saveall = saveall;