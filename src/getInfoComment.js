const { formatComment } = require('../untils')
module.exports = (api) => {
    const request = require('request-promise').defaults({ qs: { access_token: api.accessToken }, json: true });
    return function (idComment, callback) {
        request({
            uri: 'https://graph.facebook.com/' + idComment,
            qs: {
                fields: 'message,from,message_tags,attachment'
            }

        }).then(function (body) {
            callback(undefined, formatComment(body))

        }).catch(callback)
    }
}