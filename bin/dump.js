const loadPoliticians = require('../src/load-politicians');
const loadCandidacyMandate = require('../src/load-candidacy-mandate');

const loadUrls = require('../src/load-urls');
const storePoliticians = require('../src/store-politicians');
const storeUrls = require('../src/store-urls');
const storeCandidacyMandate = require('../src/store-candidacy-mandate');

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


switch (program.opts().type) {
    case 'politicians':
      loadPoliticians()
        .then(storePoliticians)
        .then(loadUrls)
        .then(storeUrls)
    break;
    case 'candidacy-mandate':
      loadCandidacyMandate()
        .then(storeCandidacyMandate)
    break;
    

}


