const fs = require('fs').promises;

module.exports =  async function storeCommitteeMembership(res) {
    await fs.writeFile('./data/committee-membership.json', JSON.stringify(res));
    return res;
}
