const politicianList = require('@malereg/aowatch-client/entities/entity.politician').politicianList;
const partyList = require('@malereg/aowatch-client/entities/entity.party').partyList;
const listAll = require('@malereg/aowatch-client/list-all').listAll;
const getEmitter = require('@malereg/aowatch-client/list-all').getEmitter;

const politicianEmitter = getEmitter();
politicianEmitter.on('count', (count)=>{
    console.log(`fetching ${count} pages`);
});

politicianEmitter.on('page', (meta)=>{
    console.log(`Fetching politician page ${meta.result.page} of ${Math.ceil(meta.result.total/meta.result.count)}`);
});

const res = listAll(politicianList, politicianEmitter);
res.then(console.log)   