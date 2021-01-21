const fs = require('fs').promises;

module.exports =  async function storeCity(res) {
    await fs.writeFile('./data/city.json', JSON.stringify(res));
    return res;
}
