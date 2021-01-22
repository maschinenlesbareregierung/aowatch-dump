const fs = require('fs').promises;

module.exports =  async function storeTopic(res) {
    await fs.writeFile('./data/topic.json', JSON.stringify(res));
    return res;
}
