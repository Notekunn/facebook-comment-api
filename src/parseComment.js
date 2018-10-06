const { formatNoti, formatComment } = require('../untils');
module.exports = (api) => {

    const queueNoti = new Array();
    const request = require('request-promise').defaults({ qs: { access_token: api.accessToken }, json: true });
    function readNoti(idnoti) {
        request({
            uri: `https://graph.facebook.com/v3.1/${idnoti}/`,
            qs: {
                method: 'POST',
                unread: 0
            }
        })
        queueNoti.push(idnoti)
        return true;
    }
    return function (data) {
        if (data.error || !data.data) callback(data.error)
        const dataNoti = data.data
            .map(element => formatNoti(element))
            .filter(element => element && !queueNoti.includes(element.idNoti))
            .filter(element => readNoti(element.idNoti))
        return Promise.all(dataNoti.map(noti => {
            return Promise.all([request({ uri: 'https://graph.facebook.com/' + noti.idFull + '/', qs: { fields: 'message,from,message_tags,attachment' } }), Promise.resolve(noti)])
        })).then(e => e.map(e => ({ ...e[1], ...formatComment(e[0])})))
        

    }
}