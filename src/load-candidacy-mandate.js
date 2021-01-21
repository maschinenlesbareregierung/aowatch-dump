const cliProgress = require('cli-progress');
const listAll = require('@malereg/aowatch-client/list-all').listAll;
const getEmitter = require('@malereg/aowatch-client/list-all').getEmitter;
const candidacyMandateList = require('@malereg/aowatch-client/entities/entity.candidacy-mandate').candidacyMandateList;

module.exports =  async function loadCandidacyMandate() {
    const bar1 = new cliProgress.SingleBar({
        format: 'CandidacyMandate |' + '{bar}' + '| {percentage}% || {value}/{total} Chunks',
    }, cliProgress.Presets.shades_classic);
    const emitter = getEmitter();
    emitter.on('count', (count)=>{
        bar1.start(Math.ceil(count), 0);
    });
    emitter.on('page', (meta)=>{
        // bar1.update(meta.result.page);
        bar1.increment()
    });
    const res = listAll(candidacyMandateList, 4, emitter);
    return res.then((res)=>{
        bar1.stop();
        return res;
    });
}