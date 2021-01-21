const fs = require('fs').promises;

module.exports =  async function storeCountry(res) {
    await fs.writeFile('./data/country.json', JSON.stringify(res));
    return res;
}
