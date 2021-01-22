const fs = require('fs').promises;

module.exports =  async function storeFraction(res) {
    await fs.writeFile('./data/fraction.json', JSON.stringify(res));
    return res;
}
