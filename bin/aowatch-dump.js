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


const storePoliticians = require('../src/store-politicians');
const storeUrls = require('../src/store-urls');
const storeCandidacyMandate = require('../src/store-candidacy-mandate');
const storeCountry = require('../src/store-country');
const storeCity = require('../src/store-city');
const storeConstituency = require('../src/store-constituency');
const storeCommittee = require('../src/store-committee');
const storeCommitteeMembership = require('../src/store-committee-membership');
const storeElectionProgram = require('../src/store-election-program');
const storeElectoralList = require('../src/store-electoral-list');
const storeParliament = require('../src/store-parliament');
const storeFraction = require('../src/store-fraction');
const storeParty = require('../src/store-party');
const storePoll = require('../src/store-party');
const storeVote = require('../src/store-vote');
const storeTopic = require('../src/store-topic');
const storeSidejob = require('../src/store-sidejob');
const storeSidejobOrganization = require('../src/store-sidejob-organization');

const { Command } = require('commander');
const path = require('path')


var defaultPath = path.resolve(".");


const program = new Command();
program
  .option('-t, --type <type>', 'which datatype to export (politician, election, location, committee, parliament, vote)', 'politician')
  .option('-p, --path <path>', 'path to export data to', defaultPath)
  .option('-c, --concurrency <concurrency>', 'how many parallel requests to use', 2);
  

program.parse(process.argv);
console.log(`type: ${program.opts().type}`);


switch (program.opts().type) {
    case 'politician':
    loadSidejob()
      .then(storeSidejob)
      .then(loadSidejobOrganization)
      .then(storeSidejobOrganization)
      .then(loadPoliticians)
      .then(storePoliticians)
      .then(loadUrls)
      .then(storeUrls)
    break;
    case 'election':
      loadCandidacyMandate()
        .then(storeCandidacyMandate)
        .then(loadElectionProgram)
        .then(storeElectionProgram)
        .then(loadElectoralList)
        .then(storeElectoralList)
    break;
    case 'location':
      loadCountry()
        .then(storeCountry)
        .then(loadCity)
        .then(storeCity)
        .then(loadConstituency)
        .then(storeConstituency)
    break;
    case 'committee':
      loadCommittee() 
        .then(storeCommittee)
        .then(loadCommitteeMembership)
        .then(storeCommitteeMembership)
    break;
    case 'parliament':
      loadParliament()
        .then(storeParliament)
        .then(loadParliamentPeriod)
        .then(loadFraction)
        .then(storeFraction)
        .then(loadParty)
        .then(storeParty)       
    break;
    case 'vote':
      loadPoll()
        .then(storePoll)
        .then(loadTopic)
        .then(storeTopic)
        .then(loadVote)
        .then(storeVote)
    break;
    
}