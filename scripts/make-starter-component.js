'use strict';

var componentName = 'ZaksComponent'

const fs = require('fs');
const ROOT_FOLDER = __dirname.replace('/scripts', '')
const COMPONENTS_FOLDER = `${ROOT_FOLDER}/src/app/components`;
const OUTPUT_FOLDER = `${COMPONENTS_FOLDER}/${componentName}`;

console.log('new component', OUTPUT_FOLDER);

// let COMPONENT_LIST = {};
// COMPONENT_LIST['style'] = `${COMPONENTS_FOLDER}/style.js`;
// const addBundle = (name, path) => COMPONENT_LIST[name] = path;
// const getPath = (name) => `${COMPONENTS_FOLDER}/${name}/${name}.js`;

// fs.readdir(COMPONENTS_FOLDER, function(err, items) {
//   items.filter(name => {
//     if (name.indexOf('.js') !== -1) return false;
//     addBundle(name, getPath(name));
//   })
//   const fileContents = JSON.stringify(COMPONENT_LIST);
//   fs.writeFile(OUTPUT_FILE, fileContents);
// });
