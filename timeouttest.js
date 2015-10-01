var http = require('http');
var Promise = require('bluebird');

function delay(time) {
  return new Promise(function (fulfill) {
    setTimeout(fulfill, time);
  });
}

function timeout(promise, time) {
  return Promise.race([promise, delay(time).then(function () {
    throw new Error('Operation timed out');
  })]);
}

function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        http.get(url, function(res, error) {
            if (error) {
                reject(error);
            }

            resp = "";
            res.on('data', function(data) {
                resp += data;
            });
            res.on('end', function() {
                resolve(resp);
            });
        });
    });
}

timeout(get('http://www.hs.fi'), 1000)
    .then(function(res) {
            console.log(res);
    }).catch(function(error) {
        console.log(error);
    });

