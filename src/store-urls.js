const fs = require('fs').promises;

module.exports = async function storeUrls(res) {
    await fs.writeFile('./data/politicians-urls.json', JSON.stringify(res));
    return res;
}