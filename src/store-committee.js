const fs = require('fs').promises;

module.exports =  async function storeCommittee(res) {
    await fs.writeFile('./data/committee.json', JSON.stringify(res));
    return res;
}
