// var pg = require('pg');
var pg = require('pg').native;

var QueryStream = require('pg-query-stream');
var JSONStream = require('JSONStream');

var config = require('./config');

var connstr = config.PG_CONNSTR;

// //Init connection pool
// pg.connect(connstr, function(err, client, done) {
//     if(err) {
//         return console.error('error fetching from pool', err);
//     }

//     // var query = new QueryStream('select * from events;');
//     // var stream = client.query(query);

//     // stream.on('end', done);

//     // stream.pipe(JSONStream.stringify()).pipe(process.stdout);

//     var query = client.query('select * from events;');
//     var results = [];

//     query.on('row', function(row) {
//         results.push(row);
//     });
//     query.on('end', function(row) {
//         console.log(results);
//         client.end();
//     });
// });

function event_save (eventtext) {
    pg.connect(connstr, function(err, client, done) {
        if(err) {
            return console.error('error fetching from pool', err);
        }

        var query = client.query({
          text: "INSERT INTO events(eventtype, eventtext) VALUES ($1, $2);",
          values: [1, eventtext],
          name: 'insert event'
        });

        query.on('end', function() {
            done();
            console.log(eventtext);
        });
    });
}

function events_save (eventtexts) {
    pg.connect(connstr, function(err, client, done) {
        if(err) {
            return console.error('error fetching from pool', err);
        }

        var inserts = eventtexts.length;
        function insert_done(text) {
            if(inserts-- <= 0) {
                done();
                console.log('DONE');
            }
        }

        var i;
        for (i = eventtexts.length - 1; i >= 0; i--) {
            client.query({
              text: "INSERT INTO events(eventtype, eventtext) VALUES ($1, $2);",
              values: [1, eventtexts[i]],
              name: 'insert event'
            }, insert_done);
        }

        client.on('drain', function() {
            console.log('DRAIN');
            client.end.bind(client);
        });
    });
}

var i, eventtexts = [];
for (i = 0; i < 100; i++) {
    eventtexts.push('ev ' + i);
    //event_save('ev' + i);
}

events_save(eventtexts);