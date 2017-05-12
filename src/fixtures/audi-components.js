var components = {};

function addEntry(outputFilename, inputFilename) {
  components[outputFilename] = './src/audi/components/' + inputFilename + '.js';
}

addEntry('style', 'style');
addEntry('Text', 'Text/Text');

module.exports = components;
