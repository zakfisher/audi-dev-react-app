#!/usr/bin/env node
'use strict';
const CLI = Object.keys(require('./package.json').bin)[0];
const version = require('./package.json').version;
const shell = require('shelljs');
const program = require('commander');

const COMMANDS = {};
const HELP = {};

function command(name, desc, command) {
  COMMANDS[name] = command;
  HELP[name] = desc;
}

function handleRequest(action) {
  const script = COMMANDS[action];
  if (script) shell.exec(script(action));
  else console.log(`Command not found: "${CLI} ${action}". Run "${CLI} help" for a list of available commands.`);
}

/* Workflow Commands */

command('help',
  'Show available commands.',
  () => {
    const commands = Object.keys(HELP).map(cmd => `> ${CLI} ${cmd}: ${HELP[cmd]} \n`).join('');
    console.log('Commands:', '\n');
    console.log(commands);
    return '';
  }
);

command('setup',
  'Set up the development toolchain.',
  () => `
    brew install yarn \
    && npm i -g serve ttab iterm2-tab-set nodemon webpack \
    && npm i \
    && ${CLI} dev
  `
);

command('dev',
  'Run the development toolchain.',
  () => `
    ttab 'tabset --color crimson && ${CLI} test' \
    && ttab 'tabset --color paleturquoise && node scripts/start.js' \
    && ttab 'tabset --color springgreen && ${CLI} components -w' \
    && tabset --color whitesmoke && git status
  `
);

command('build',
  'Build this app (for firebase deployment).',
  () => `node scripts/build.js`
);

command('test',
  'Run unit tests.',
  () => `node scripts/test.js --env=jsdom`
);

/* Component Commands */

command('components',
  'Peform component operations (must specify a flag)',
  () => {
    let cmd = `echo You must specify a flag to perform component operations.`;
    if (program.component) cmd = `echo add component: ${program.component}`;
    if (program.list)      cmd = `node scripts/make-component-list`;
    if (program.build)     cmd = `${CLI} components -l && NODE_ENV=production webpack --config config/webpack.config.components.js`;
    if (program.refresh)   cmd = `${CLI} components -b && ${CLI} components -s`;
    if (program.serve)     cmd = `serve .components`;
    if (program.watch)     cmd = `nodemon --exec '${CLI} components -r' ./src/app/components/**/**/*`;
    return cmd;
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
.action(handleRequest)
.parse(process.argv);
