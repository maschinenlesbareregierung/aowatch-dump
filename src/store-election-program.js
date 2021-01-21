const fs = require('fs').promises;

module.exports =  async function storeElectionProgram(res) {
    await fs.writeFile('./data/election-program.json', JSON.stringify(res));
    return res;
}
