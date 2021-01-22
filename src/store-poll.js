const fs = require('fs').promises;

module.exports =  async function storePoll(res) {
    await fs.writeFile('./data/poll.json', JSON.stringify(res));
    return res;
}
