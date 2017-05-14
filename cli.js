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
    && tabset --color whitesmoke && git status
  `
);

command('test',
  'Run unit tests',
  () => `node scripts/test.js --env=jsdom`
);

command('components',
  'Peform component operations (must specify a flag)',
  function script() {
    let cmd = `echo You must specify a flag to perform component operations.`;
    if (program.component) {
      info(`Creating new component "${program.component}"...`);
      makeComponent(program.component);
      info(`Component created: "${program.component}"`);
      cmd = 'echo ';
    }
    if (program.list)      cmd = `node scripts/make-component-lists`;
    if (program.build)     cmd = `${CLI} components -l && NODE_ENV=production webpack --config config/webpack.config.components.js`;
    if (program.refresh)   cmd = `${CLI} components -b && ${CLI} components -s`;
    if (program.serve)     cmd = `serve .components`;
    if (program.watch)     cmd = `nodemon --exec '${CLI} components -r' --watch src/app/components`;
    return cmd;
  },
  function examples() {
    desc('Add new component');
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
  }
);

// Run CLI
program
.version(version)
.arguments('<action>')
.description('Audi CLI for React component development')
.option('-a, --component <component>', 'A component name.')
.option('-b, --build',                 'Compile component assets (to /.components).')
.option('-l, --list',                  'Dynamically generate component list (to /.components.json).')
.option('-r, --refresh',               'Refresh component assets (will compile & serve).')
.option('-s, --serve',                 'Serve component assets.')
.option('-w, --watch',                 'Watch component assets (calls --refresh on file changes).')
.action(handler)
.parse(process.argv);
