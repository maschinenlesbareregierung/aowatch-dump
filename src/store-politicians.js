const fs = require('fs').promises;

module.exports =  async function storePoliticians(res) {
    await fs.writeFile('./data/politicians.json', JSON.stringify(res));
    return res;
}
