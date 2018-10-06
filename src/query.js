module.exports = (api) => {
    const request = require('request-promise').defaults({ qs: { access_token: api.accessToken }, json: true });
    return function (options, callback) {
        return request(options).then(function (body) {

            if (typeof callback =="function") return callback(undefined, body)

        }).catch(e => typeof callback =="function" && callback(e))
    }
}