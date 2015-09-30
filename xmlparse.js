var XmlStream = require('xml-stream');
var config = require('./config');

var parseXMLStream = function(stream) {
    var xml = new XmlStream(stream);

    // xml.on('startElement: BsWfs:ParameterName', function(e) {
    //     console.log(e);
    // });
    // xml.on('endElement: BsWfs:ParameterName', function(e) {
    //     console.log(e);
    // });
    xml.on('updateElement: BsWfs:BsWfsElement', function(e) {
        if(e['BsWfs:ParameterName'] === 'Temperature') {
            var d = new Date(e['BsWfs:Time']);
            console.log(d.toString() + ': ' + e['BsWfs:ParameterValue']);
        }
    });
}

exports.parseXMLStream = parseXMLStream;
