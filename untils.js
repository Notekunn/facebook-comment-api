let request = require('request-promise').defaults({ jar: true, json: true });
const URL = require('url')
function getHeaders(url) {
    var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: "https://www.facebook.com/",
        Host: url.replace("https://", "").split("/")[0],
        Origin: "https://www.facebook.com",
        "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18',
        Connection: "keep-alive"
    };

    return headers;
}

async function getCookies(access_token) {
    let appState = await request({ url: 'https://graph.facebook.com/app', qs: { access_token } })
        .then(function (e) {
            return request({
                url: 'https://api.facebook.com/method/auth.getSessionforApp', qs: { access_token, format: 'json', new_app_id: e.id, generate_session_cookies: '1', }
            })
        }
        ).then(cookie => cookie.session_cookies);

    return appState;
}
async function getToken(api, jar) {
    if (!api || !api.dtsg || !api.uid) return Promise.resolve();
    return request({
        jar,
        url: 'https://www.facebook.com/v1.0/dialog/oauth/confirm',
        qs: {
            fb_dtsg: api.dtsg,
            __user: api.uid,
            app_id: 165907476854626,
            redirect_uri: 'fbconnect://success',
            display: 'page',
            access_token: '',
            from_post: 1,
            return_format: 'access_token',
            domain: '',
            sso_device: 'ios',
            __CONFIRM__: 1
        },
        headers: getHeaders('https://www.facebook.com/v1.0/dialog/oauth/confirm')

    }).then(body => {
        require('fs').writeFileSync('./1.html', body);
        return body
    }
    )
        .then(body => body.match(/access_token=(.*)(?=&expires_in)/))
        .then(result => result && result[1])

}

function formatNoti(noti) {
    const link = URL.parse(noti.link, true)
    switch (noti.application.name) {
        case 'Feed Comments':
            let { reply_comment_id, comment_id } = link.query;
            let idComment = parseInt(comment_id), idReply = parseInt(reply_comment_id)
            let idPost = parseInt(link.pathname.split('/posts/')[1]);
            let idFull = [idPost, idComment, idReply].filter(e => !!e).join('_');
            let idReplyTo = [idPost, idComment].filter(e => !!e).join('_');
            return {
                type: 'comment',
                // authorID: noti.from.id,
                // targetID: noti.to.id,
                // idPost,
                // idComment,
                // idReply,
                idFull,
                idReplyTo,
                idNoti: noti.id,
                // timeCreate: noti.updated_time
            }
            break;
        case 'Wall':
            return {
                type: 'post',
                authorID: noti.from.id,
                targetID: noti.to.id,
                idPost: link.pathname.split('/posts/')[1],
                idNoti: noti.id,
                timeCreate: noti.updated_time
            }
            break;
    }
}
function formatComment(comment) {
    const infoComment = {
        senderID: comment.from.id,
        senderName: comment.from.name,
        body: comment.message,
        id: comment.id
    }
    
    if (comment.message_tags) {
        let body = infoComment.body
        comment.message_tags.reverse().forEach(element => {
            body = body.replace(element.name , '');
        });               
        infoComment.body = body.trim()
    }
    if(comment.attachment){
        infoComment.attachment = {
            type: comment.attachment.type,
            id: comment.attachment.target.id
        }
    }

    return infoComment;



}
function getInfo(access_token) {
    return request({
        url: 'https://graph.facebook.com/me',
        qs: {
            access_token,
            fields: 'gender,name,short_name,id'
        }
    }).catch(e => ({}))
}

module.exports = {
    getHeaders,
    getToken,
    getCookies,    
    getInfo,
    formatNoti,
    formatComment
}