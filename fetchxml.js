var http = require('http');
var fs = require('fs');

var config = require('./config');

var APIKEY = config.APIKEY;

var url = 'http://data.fmi.fi/fmi-apikey/' + APIKEY;

//var storedquery_id = 'fmi::forecast::hirlam::surface::point::simple';

var storedquery_id = 'fmi::observations::weather::daily::simple';

var params = '&starttime=2012-01-01&endtime=2013-01-01&timestep=1440'; //&place=Kuhmo';
params += '&fmisid=101773';

var query = '/wfs?request=getFeature&storedquery_id=' + storedquery_id + params;

console.log(url + query);

http.get(url + query, function(res) {
    var os = fs.createWriteStream('data/response.xml');

    res.on('data', function(data) {
        os.write(data);
    });
    res.on('end', function() {
        os.end();
    });
});
