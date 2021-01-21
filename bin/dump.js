const loadPoliticians = require('../src/load-politicians')
const loadUrls = require('../src/load-urls');
const storePoliticians = require('../src/store-politicians');
const storeUrls = require('../src/store-urls');
const { Command } = require('commander');
const path = require('path')


var defaultPath = path.resolve(".");


const program = new Command();
program
  .option('-t, --type <type>', 'which datatype to export', 'politicians')
  .option('-p, --path <path>', 'path to export data to', defaultPath)
  .option('-c, --concurrency <concurrency>', 'how many parallel requests to use', 2);
  

program.parse(process.argv);
console.log(`type: ${program.opts().type}`);


loadPoliticians()
    .then(storePoliticians)
    .then(loadUrls)
    .then(storeUrls)
