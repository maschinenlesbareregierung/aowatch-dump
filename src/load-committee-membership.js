const cliProgress = require('cli-progress');
const listAll = require('@malereg/aowatch-client/list-all').listAll;
const getEmitter = require('@malereg/aowatch-client/list-all').getEmitter;
const committeeMembershipList = require('@malereg/aowatch-client/entities/entity.committee-membership').committeeMembershipList;

module.exports =  async function loadCountry() {
    const bar1 = new cliProgress.SingleBar({
        format: 'Committee Membership|' + '{bar}' + '| {percentage}% || {value}/{total} Chunks',
    }, cliProgress.Presets.shades_classic);
    const emitter = getEmitter();
    emitter.on('count', (count)=>{
        bar1.start(Math.ceil(count), 0);
    });
    emitter.on('page', (meta)=>{
        // bar1.update(meta.result.page);
        bar1.increment()
    });
    const res = listAll(committeeMembershipList, 4, emitter);
    return res.then((res)=>{
        bar1.stop();
        return res;
    });
}