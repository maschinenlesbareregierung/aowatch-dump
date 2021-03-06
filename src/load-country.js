const cliProgress = require('cli-progress');
const listAll = require('@malereg/aowatch-client/list-all').listAll;
const getEmitter = require('@malereg/aowatch-client/list-all').getEmitter;
const countryList = require('@malereg/aowatch-client/entities/entity.country').countryList;

module.exports =  async function loadCountry() {
    const bar1 = new cliProgress.SingleBar({
        format: 'Country |' + '{bar}' + '| {percentage}% || {value}/{total} Chunks',
    }, cliProgress.Presets.shades_classic);
    const emitter = getEmitter();
    emitter.on('count', (count)=>{
        bar1.start(Math.ceil(count), 0);
    });
    emitter.on('page', (meta)=>{
        // bar1.update(meta.result.page);
        bar1.increment()
    });
    const res = listAll(countryList, 4, emitter);
    return res.then((res)=>{
        bar1.stop();
        return res;
    });
}