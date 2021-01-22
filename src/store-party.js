const fs = require('fs').promises;

module.exports =  async function storeParty(res) {
    await fs.writeFile('./data/party.json', JSON.stringify(res));
    return res;
}
