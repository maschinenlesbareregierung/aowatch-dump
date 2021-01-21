const fs = require('fs').promises;

module.exports =  async function storeConstituency(res) {
    await fs.writeFile('./data/constituency.json', JSON.stringify(res));
    return res;
}
