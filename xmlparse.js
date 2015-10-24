var XmlStream = require('xml-stream');
var config = require('./config');
var Promise = require('bluebird');

var parseXMLStream = function(stream, cb) {
    return new Promise(function(resolve, reject) {
        var xml = new XmlStream(stream);

        var measurements = [];

        // xml.on('startElement: BsWfs:ParameterName', function(e) {
        //     console.log(e);
        // });
        // xml.on('endElement: BsWfs:ParameterName', function(e) {
        //     console.log(e);
        // });
        xml.on('updateElement: BsWfs:BsWfsElement', function(e) {
            var d = new Date(e['BsWfs:Time']);
            measurements.push({
                time: d,
                name: e['BsWfs:ParameterName'],
                value: e['BsWfs:ParameterValue'],
                position: e['BsWfs:Location']['gml:Point']['gml:pos']
            });
        });

        xml.on('end', function() {
            resolve(measurements);
        });
    });
};

exports.parseXMLStream = parseXMLStream;
