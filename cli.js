#!/usr/bin/env node
'use strict';
const CLI = Object.keys(require('./package.json').bin)[0];
const version = require('./package.json').version;
const shell = require('shelljs');
const program = require('commander');
const chalk = require('chalk');

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
const br = () => console.log('');

command('help',
  'Show available commands',
  () => {
    br()
    Object.keys(HELP).map(name => {
      desc(`${HELP[name]}`);
      cmd(`${CLI} ${name}`);
      br();
      if (EXAMPLES[name]) EXAMPLES[name]();
    });
    return 'echo ';
  }
);

command('setup',
  'Set up the dev toolchain',
  () => `
    brew install yarn \
    && npm i -g serve ttab iterm2-tab-set nodemon webpack \
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
    if (program.component) cmd = `echo add component: ${program.component}`;
    if (program.list)      cmd = `node scripts/make-component-list`;
    if (program.build)     cmd = `${CLI} components -l && NODE_ENV=production webpack --config config/webpack.config.components.js`;
    if (program.refresh)   cmd = `${CLI} components -b && ${CLI} components -s`;
    if (program.serve)     cmd = `serve .components`;
    if (program.watch)     cmd = `nodemon --exec '${CLI} components -r' ./src/app/components/**/**/*`;
    return cmd;
  },
  function examples() {
    desc('Add new component');
    cmd(`${CLI} components -a MyComponent`);
    cmd(`${CLI} components --add MyComponent`);
    br();
    desc('Build component assets (css/js outputs to /.components)');
    cmd(`${CLI} components -b`);
    cmd(`${CLI} components --build`);
    br();
    desc('Build components list (outputs to /.components.json)');
    cmd(`${CLI} components -l`);
    cmd(`${CLI} components --list`);
    br();
    desc('Refresh components watcher');
    cmd(`${CLI} components -r`);
    cmd(`${CLI} components --refresh`);
    br();
    desc('Start component server');
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
