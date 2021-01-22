#!/usr/bin/env node
const loadPoliticians = require('../src/load-politicians');
const loadCandidacyMandate = require('../src/load-candidacy-mandate');
const loadCountry = require('../src/load-country');
const loadCity = require('../src/load-city');
const loadUrls = require('../src/load-urls');
const loadCommittee = require('../src/load-committee');
const loadCommitteeMembership = require('../src/load-committee-membership');
const loadConstituency = require('../src/load-constituency');
const loadElectionProgram = require('../src/load-election-program');
const loadElectoralList = require('../src/load-electoral-list');
const loadParliament = require('../src/load-parliament');
const loadParliamentPeriod = require('../src/load-parliament-period');
const loadFraction = require('../src/load-fraction');
const loadParty = require('../src/load-party');
const loadPoll = require('../src/load-poll');
const loadVote = require('../src/load-vote');
const loadTopic = require('../src/load-topic');
const loadSidejob = require('../src/load-sidejob');
const loadSidejobOrganization = require('../src/load-sidejob-organization');

const fs = require('fs').promises;
const { Command } = require('commander');
const path = require('path')


var defaultPath = path.resolve(".");


const program = new Command();
program
  .description('Dumps data from Abgeordnetenwatch.de')
  .option('-t, --type <type>', 'which datatype to export (politician, election, location, committee, parliament, vote)', 'location')
  .option('-p, --path <path>', 'path to export data to', defaultPath)
  .option('-c, --concurrency <concurrency>', 'how many parallel requests to use', 2);
  

program.parse(process.argv);
console.log(`type: ${program.opts().type}`);

const store = (name, storePath) => {
  return async (data) => {
    var resolvedPath = path.resolve(storePath);
    await fs.writeFile(resolvedPath + '/' + name + '.json', JSON.stringify(data));
    return data;
  }
}


switch (program.opts().type) {
    case 'politician':
    loadSidejob()
      .then(store('sidejob', program.opts().path))
      .then(loadSidejobOrganization)
      .then(store('sidejob-organization', program.opts().path))
      .then(loadPoliticians)
      .then(store('politician', program.opts().path))
      .then(loadUrls)
      .then(store('politician-urls', program.opts().path))
    break;
    case 'election':
      loadCandidacyMandate()
        .then(store('candidacy-mandate', program.opts().path))
        .then(loadElectionProgram)
        .then(store('election-program', program.opts().path))
        .then(loadElectoralList)
        .then(store('electoral-list', program.opts().path))
    break;
    case 'location':
      loadCountry()
        .then(store('country', program.opts().path))
        .then(loadCity)
        .then(store('city', program.opts().path))
        .then(loadConstituency)
        .then(store('constituency', program.opts().path))
    break;
    case 'committee':
      loadCommittee() 
        .then(store('committee', program.opts().path))
        .then(loadCommitteeMembership)
        .then(store('committee-membership', program.opts().path))
    break;
    case 'parliament':
      loadParliament()
        .then(store('parliament', program.opts().path))
        .then(loadParliamentPeriod)
        .then(store('parliament-period', program.opts().path))
        .then(loadFraction)
        .then(store('fraction', program.opts().path))
        .then(loadParty)
        .then(store('party', program.opts().path))       
    break;
    case 'vote':
      loadPoll()
        .then(store('poll', program.opts().path))
        .then(loadTopic)
        .then(store('topic', program.opts().path))
        .then(loadVote)
        .then(store('vote', program.opts().path))
    break;   
}