const fs = require('fs').promises;

module.exports =  async function storeElectoralList(res) {
    await fs.writeFile('./data/electoral-list.json', JSON.stringify(res));
    return res;
}
