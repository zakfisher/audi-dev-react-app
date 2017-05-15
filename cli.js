#!/usr/bin/env node
'use strict';
const CLI = Object.keys(require('./package.json').bin)[0];
const version = require('./package.json').version;
const shell = require('shelljs');
const program = require('commander');
const chalk = require('chalk');
const makeComponent = require('./scripts/make-component');

const COMMANDS = {};
const HELP = {};
const EXAMPLES = {};

function command(name, description, command, example = () => ('')) {
  COMMANDS[name] = command;
  HELP[name] = description;
  EXAMPLES[name] = example;
}

function handler(action) {
  const script = COMMANDS[action];
  if (script) shell.exec(script(action));
  else console.log(`Command not found: "${CLI} ${action}". Run "${CLI} help" for a list of available commands.`);
}

const desc = text => console.log(' ' + chalk.cyan.bold(text));
const cmd = text => console.log(' ' + chalk.yellow(text));
const info = text => console.log(' ' + chalk.blue(text));
const br = () => console.log('');

function help() {
  br()
  Object.keys(HELP).map(name => {
    desc(`${HELP[name]}`);
    cmd(`${CLI} ${name}`);
    br();
    if (EXAMPLES[name]) EXAMPLES[name]();
  });
  return 'echo ';
};

command('h', 'Show available commands', help);
command('help', 'Show available commands', help);

command('setup',
  'Set up the dev toolchain',
  () => `
    brew install yarn \
    && npm i -g serve ttab iterm2-tab-set nodemon \
    && npm i \
    && ${CLI} dev
  `
);

command('dev',
  'Run dev toolchain',
  () => `
    ttab 'tabset --color crimson && ${CLI} test' \
    && ttab 'tabset --color paleturquoise && node scripts/start.js' \
    && ttab 'tabset --color springgreen && ${CLI} components -w' \
    && tabset --color whitesmoke \
    && echo Run ${chalk.cyan(`${CLI} help`)} for a full list of commands.
  `
);

command('test',
  'Run unit tests',
  () => `node scripts/test.js --env=jsdom`
);

function components() {
  let cmd = `echo You must specify a flag to perform component operations.`;
  if (program.add) {
    const name = program.add[0].toUpperCase() + program.add.slice(1);
    info(`Creating new component "${name}"...`);
    makeComponent(name);
    info(`Component created: "${name}"`);
    cmd = 'echo ';
  }
  if (program.list)    cmd = `node scripts/make-component-lists`;
  if (program.build)   cmd = `${CLI} components -l && NODE_ENV=production webpack --config config/webpack.config.components.js`;
  if (program.refresh) cmd = `${CLI} components -b && ${CLI} components -s`;
  if (program.serve)   cmd = `serve .components`;
  if (program.watch)   cmd = `nodemon --exec '${CLI} components -r' --watch src/app/components -e js,sass`;
  return cmd;
}

function componentsExamples() {
  desc('Add new component');
  cmd(`${CLI} c -a MyComponent`);
  cmd(`${CLI} components -a MyComponent`);
  cmd(`${CLI} components --add MyComponent`);
  br();
  desc('Build components assets (outputs to /.components/css,js)');
  cmd(`${CLI} components -b`);
  cmd(`${CLI} components --build`);
  br();
  desc('Build components lists (outputs to /.components.json, /src/app/components.js,docs.js,style.js)');
  cmd(`${CLI} components -l`);
  cmd(`${CLI} components --list`);
  br();
  desc('Refresh components watcher');``
  cmd(`${CLI} components -r`);
  cmd(`${CLI} components --refresh`);
  br();
  desc('Start components server');
  cmd(`${CLI} components -s`);
  cmd(`${CLI} components --serve`);
};

command('c',
  'Peform component operations (must specify a flag)',
  components
);

command('components',
  'Peform component operations (must specify a flag)',
  components,
  componentsExamples
);

// Run CLI
program
.version(version)
.arguments('<action>')
.description('Audi CLI for React component development')
.option('-a, --add <component>',       'Add a component.')
.option('-b, --build',                 'Compile component assets (to /.components).')
.option('-l, --list',                  'Dynamically generate component list (to /.components.json).')
.option('-r, --refresh',               'Refresh component assets (will compile & serve).')
.option('-s, --serve',                 'Serve component assets.')
.option('-w, --watch',                 'Watch component assets (calls --refresh on file changes).')
.action(handler)
.parse(process.argv);
