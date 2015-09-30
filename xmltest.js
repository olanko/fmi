var fs = require('fs');
var parsexml = require('./xmlparse');

var xmlfile = fs.createReadStream('data/response.xml');
parsexml.parseXMLStream(xmlfile);
