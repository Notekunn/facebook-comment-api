module.exports = (api) => {
    const request = require('request-promise').defaults({ qs: { access_token: api.accessToken }, json: true });
    return function (userID, callback) {
        request({
            uri: 'https://graph.facebook.com/me/friends',
            qs: {
                uid: userID,
                method: 'post'
            }

        }).then(function (body) {
            if (typeof callback == "function") return callback(undefined, body)
        }).catch((e) => {
            if (typeof callback == "function") return callback(e)
        })
    }
}