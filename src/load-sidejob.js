const sidejobList = require('@malereg/aowatch-client/entities/entity.sidejob').sidejobList;
const listAll = require('@malereg/aowatch-client/list-all').listAll;
const getEmitter = require('@malereg/aowatch-client/list-all').getEmitter;
const cliProgress = require('cli-progress');

module.exports =  async function loadSidejob() {
    // create a new progress bar instance and use shades_classic theme
    const bar1 = new cliProgress.SingleBar({
        format: 'Sidejob |' + '{bar}' + '| {percentage}% || {value}/{total} Chunks',
    }, cliProgress.Presets.shades_classic);
    const politicianEmitter = getEmitter();
    politicianEmitter.on('count', (count)=>{
        bar1.start(Math.ceil(count), 0);
    });

    politicianEmitter.on('page', (meta)=>{
        // bar1.update(meta.result.page);
        bar1.increment()
    });
    const res = listAll(sidejobList, 4, politicianEmitter);
    return res.then((res)=>{
        bar1.stop();
        return res;
    });
}   