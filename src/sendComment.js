module.exports = (api) => {
    const request = require('request-promise').defaults({ qs: { access_token: api.accessToken }, json: true });
    return function (options, targetID, callback) {
        if (!options.body) options = { body: options }
        return request({
            url: `https://graph.facebook.com/${targetID}/comments`,
            qs: {
                message: options.body,
                attachment_url: options.image,
                method: 'POST'

            }
        }).then(function (body) {

            if (typeof callback == "function") return callback(undefined, body)

        }).catch(e => typeof callback == "function" && callback(e.error.error))
    }
}