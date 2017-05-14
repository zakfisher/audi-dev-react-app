'use strict';

const fs = require('fs');
const ROOT_FOLDER = __dirname.replace('/scripts', '')

const APP_FOLDER = `${ROOT_FOLDER}/src/app`;
const COMPONENTS_FOLDER = `${APP_FOLDER}/components`;
const DEMOS_FOLDER = `${APP_FOLDER}/demos`;

const COMPONENTS_JSON = `${ROOT_FOLDER}/.components.json`;
const APP_COMPONENTS_JS = `${APP_FOLDER}/components.js`;
const APP_DEMOS_JS = `${APP_FOLDER}/demos.js`;
const APP_DOCS_JS = `${APP_FOLDER}/docs.js`;
const APP_STYLE_JS = `${APP_FOLDER}/style.js`;

// Read demos directory
fs.readdir(DEMOS_FOLDER, function(err, items) {
  let DEMOS_FILE = '';
  let DEMOS_OBJ = '';

  items.map(name => {
    if (name.indexOf('.js') === -1) return false;
    name = name.replace('.js', '');
    DEMOS_FILE  += `import ${name} from './demos/${name}.js';`;
    DEMOS_OBJ  += `DEMOS["${name}"] = ${name};`;
  });

  // Write src/app/demos.js
  DEMOS_FILE += `const DEMOS = {}; ${DEMOS_OBJ} export default DEMOS;`;
  fs.writeFileSync(APP_DEMOS_JS, DEMOS_FILE);
});

// Read components directory
fs.readdir(COMPONENTS_FOLDER, function(err, items) {

  let COMPONENT_LIST = {};
  let DOCS_FILE = '';
  let DOCS_OBJ = '';
  let COMPONENTS_FILE = '';
  let COMPONENTS_OBJ = '';
  let STYLE_FILE = '';
  const addBundle = (name, path) => {
    COMPONENT_LIST[name] = path;
    COMPONENTS_FILE += `import ${name} from './components/${name}/${name}';`;
    COMPONENTS_OBJ  += `COMPONENTS["${name}"] = ${name};`;
    DOCS_FILE  += `import ${name}Doc from './components/${name}/${name}.docs';`;
    DOCS_OBJ   += `DOCS["${name}"] = ${name}Doc;`;
    STYLE_FILE += `import './components/${name}/${name}.sass';`;
  };
  const getPath = (name) => `${COMPONENTS_FOLDER}/${name}/${name}.js`;

  // Add bundles
  COMPONENT_LIST['style'] = `${APP_FOLDER}/style.js`;
  items.map(name => {
    if (name.indexOf('.') !== -1) return false;
    addBundle(name, getPath(name));
  });

  // Write .components.json
  fs.writeFileSync(COMPONENTS_JSON, JSON.stringify(COMPONENT_LIST));

  // Write src/app/components.js
  COMPONENTS_FILE += `const COMPONENTS = {}; ${COMPONENTS_OBJ} export default COMPONENTS;`;
  fs.writeFileSync(APP_COMPONENTS_JS, COMPONENTS_FILE);

  // Write src/app/docs.js
  DOCS_FILE += `const DOCS = {}; ${DOCS_OBJ} export default DOCS;`;
  fs.writeFileSync(APP_DOCS_JS, DOCS_FILE);

  // Write src/app/components/style.js
  fs.writeFileSync(APP_STYLE_JS, STYLE_FILE);
});

