const async = require('async');
const extractLinks = require('@malereg/aowatch-client/extract-links').extractLinks;
const cliProgress = require('cli-progress');

module.exports = async function loadUrls(res){
    const bar2 = new cliProgress.SingleBar({
        format: 'Urls |' + '{bar}' + '| {percentage}% || {value}/{total} Requests',
    }, cliProgress.Presets.shades_classic);
    bar2.start(res.data.length, 0);
    const urls = [];
    var q = async.queue(async function(data) {
        const url = data.abgeordnetenwatch_url;
        const links = await extractLinks(url)
        urls.push({
            id: data.id,
            links
        })
    }, 10);

    for (let i = 0; i<res.data.length; i++) {
        // add some items to the queue
        q.push(res.data[i], function(err) {
            bar2.increment();
        });
    }

    return new Promise((resolve, reject) => {
        q.drain = function () {
            bar2.stop();
            resolve(urls);
        };
    })
}