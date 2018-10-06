module.exports = (api) => {
    const request = require('request-promise').defaults({ qs: { access_token: api.accessToken }, json: true });
    return function (id = "me", callback) {
        return request({
            url: 'https://graph.facebook.com/me',
            qs: {
                access_token,
                fields: 'gender,name,short_name,id'
            }
        }).then(body => callback(undefined, body)).catch(e => callback(e, {}))
    }
}