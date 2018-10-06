var _ = require('lodash');
const apiFuncNames = [
    'listen',
    'getInfoComment',
    'sendComment',
    'getInfo',
    // 'addFriend',
    // 'blockFriend',
    // 'query'
];
module.exports = (api, jar) => {
    apiBuild = _.cloneDeep(api)
    apiFuncNames.forEach(element => {
        api[element] = require('./' + element + '.js')(apiBuild);
       
    });
    return api
}