'use strict';

const fs = require('fs');
const ROOT_FOLDER = __dirname.replace('/scripts', '')
const COMPONENTS_FOLDER = `${ROOT_FOLDER}/src/audi/components`;
const OUTPUT_FILE = `${ROOT_FOLDER}/.components.json`;

let COMPONENT_LIST = {};
COMPONENT_LIST['style'] = `${COMPONENTS_FOLDER}/style.js`;
const addBundle = (name, path) => COMPONENT_LIST[name] = path;
const getPath = (name) => `${COMPONENTS_FOLDER}/${name}/${name}.js`;

fs.readdir(COMPONENTS_FOLDER, function(err, items) {
  items.filter(name => {
    if (name.indexOf('.js') !== -1) return false;
    addBundle(name, getPath(name));
  })
  const fileContents = JSON.stringify(COMPONENT_LIST);
  fs.writeFile(OUTPUT_FILE, fileContents);
});
