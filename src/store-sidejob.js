const fs = require('fs').promises;

module.exports =  async function storeSidejob(res) {
    await fs.writeFile('./data/sidejob.json', JSON.stringify(res));
    return res;
}
