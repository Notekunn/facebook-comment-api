

module.exports = (api) => {
    const parseComment = require('./parseComment')(api);
    const request = require('request-promise').defaults({ qs: { access_token: api.accessToken }, json: true });
    function clearAllNoti() {
        request({
            uri: 'https://graph.facebook.com/me/notifications',
            qs: {

                limit: 10,
                fields: 'application,created_time,from,id,link,message,title,unread,to,updated_time',
                include_read: false

            }
        })
            .then(function (body) {
                return body.data.map(e => readNoti(e.id))
            })
    }
    return async function (callback) {
        await clearAllNoti();

        const listen = ()=>{
            request({
                uri: 'https://graph.facebook.com/me/notifications',
                qs: {

                    limit: 5,
                    fields: 'application,created_time,from,id,link,message,title,unread,to,updated_time',
                    include_read: false

                }
            }).then(parseComment)
            .then(data => data.length && data.forEach(e => callback(undefined, e)))
            .catch(e => callback(e.error.error.message))
            cron();
        }
        
        function cron() {
            
            setTimeout(listen, Math.floor(Math.random()*500) + 1)
        }
        cron();        
    }
}

