var fs = require('fs');
var parsexml = require('./xmlparse');
var measurements = require('./measurements');

var xmlfile = fs.createReadStream('data/response.xml');
parsexml.parseXMLStream(xmlfile, function(data) {
    measurements.saveall(data);
});

