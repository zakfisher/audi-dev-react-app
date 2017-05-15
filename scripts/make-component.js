'use strict';

/*
Output:
src
-- app
---- components
------ Component
-------- Component.docs.js
-------- Component.js
-------- Component.sass
-------- Component.test.js
*/

const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');

const COMPONENT = require('../src/fixtures/component');
const ROOT_FOLDER = process.env.PWD.replace('/scripts', '')
const COMPONENTS_FOLDER = `${ROOT_FOLDER}/src/app/components`;

const step = text => console.log(' > ' + chalk.green(text));

module.exports = function makeComponent(name) {
  const FOLDER = `${COMPONENTS_FOLDER}/${name}`;
  const COMPONENT_FILE = `${FOLDER}/${name}.js`;
  const DOCS_FILE = `${FOLDER}/${name}.docs.js`;
  const SASS_FILE = `${FOLDER}/${name}.sass`;
  const TEST_FILE = `${FOLDER}/${name}.test.js`;

  step(`Create folder ${FOLDER}`);
  shell.exec(`mkdir ${FOLDER}`);

  step(`Create component file ${COMPONENT_FILE}`);
  fs.writeFileSync(COMPONENT_FILE, COMPONENT.main(name));

  step(`Create docs file ${DOCS_FILE}`);
  fs.writeFileSync(DOCS_FILE, COMPONENT.docs(name));

  step(`Create test file ${TEST_FILE}`);
  fs.writeFileSync(TEST_FILE, COMPONENT.test(name));

  step(`Create SASS file ${SASS_FILE}`);
  fs.writeFileSync(SASS_FILE, COMPONENT.sass(name));
};
