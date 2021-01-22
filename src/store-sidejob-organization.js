const fs = require('fs').promises;

module.exports =  async function storeSidejobOrganization(res) {
    await fs.writeFile('./data/sidejob-organization.json', JSON.stringify(res));
    return res;
}
