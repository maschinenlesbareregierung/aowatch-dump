const fs = require('fs').promises;

module.exports =  async function storeVote(res) {
    await fs.writeFile('./data/vote.json', JSON.stringify(res));
    return res;
}
