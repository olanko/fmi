var XmlStream = require('xml-stream');
var config = require('./config');

var parseXMLStream = function(stream, cb) {
    var xml = new XmlStream(stream);

    var measurements = [];

    // xml.on('startElement: BsWfs:ParameterName', function(e) {
    //     console.log(e);
    // });
    // xml.on('endElement: BsWfs:ParameterName', function(e) {
    //     console.log(e);
    // });
    xml.on('updateElement: BsWfs:BsWfsElement', function(e) {
        if(e['BsWfs:ParameterName'] === 'Temperature') {
            var d = new Date(e['BsWfs:Time']);
            measurements.push({time: d, value: e['BsWfs:ParameterValue']})
        }
    });

    xml.on('end', function() {
        cb(measurements);
    });
}

exports.parseXMLStream = parseXMLStream;
