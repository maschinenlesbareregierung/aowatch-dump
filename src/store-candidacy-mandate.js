const fs = require('fs').promises;

module.exports =  async function storeCandidacyMandate(res) {
    await fs.writeFile('./data/candidacy-mandate.json', JSON.stringify(res));
    return res;
}
