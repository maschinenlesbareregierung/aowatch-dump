const fs = require('fs').promises;

module.exports =  async function storeParliament(res) {
    await fs.writeFile('./data/parliament.json', JSON.stringify(res));
    return res;
}
