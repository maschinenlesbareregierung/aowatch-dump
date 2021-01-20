const politicianList = require('@malereg/aowatch-client/entities/entity.politician').politicianList;
const partyList = require('@malereg/aowatch-client/entities/entity.party').partyList;
const listAll = require('@malereg/aowatch-client/list-all').listAll;
const getEmitter = require('@malereg/aowatch-client/list-all').getEmitter;

const cliProgress = require('cli-progress');

const extractLinks = require('@malereg/aowatch-client/extract-links').extractLinks;


const async = require('async');
 
// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({
    format: 'Politicians |' + '{bar}' + '| {percentage}% || {value}/{total} Chunks',
}, cliProgress.Presets.shades_classic);
 
const politicianEmitter = getEmitter();
politicianEmitter.on('count', (count)=>{
    bar1.start(Math.ceil(count), 0);
});

politicianEmitter.on('page', (meta)=>{
    // bar1.update(meta.result.page);
    bar1.increment()
});

const res = listAll(politicianList, politicianEmitter);
res.then((res)=>{
    bar1.stop();
    const bar2 = new cliProgress.SingleBar({
        format: 'Urls |' + '{bar}' + '| {percentage}% || {value}/{total} Requests',
    }, cliProgress.Presets.shades_classic);
    bar2.start(res.data.length, 0);

    var q = async.queue(function(data, callback) {
        const url = data.abgeordnetenwatch_url;
        extractLinks(url).then(links => {
            callback();
        });
    }, 2);

    q.drain(function() {
        bar2.stop();
    });

    for (let i = 0; i<res.data.length; i++) {
        // add some items to the queue
        q.push(res.data[i], function(err) {
            bar2.increment();
        });
    }


})
