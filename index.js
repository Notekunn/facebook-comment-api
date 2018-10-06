let request = require('request-promise').defaults({ jar: true, json: true });
let jar = request.jar();
request = request.defaults({ jar });
const log = require('npmlog')
const cheerio = require('cheerio');
let { getHeaders, getToken, getCookies, getInfo } = require('./untils')
module.exports = async function (options, callback) {

    if(!options.access_token && !options.appState) return log.error('login','Please include options prameter')
    if (options.access_token) {
        try {
            let appState = await getCookies(options.access_token)
            options.appState = appState;

        } catch (error) {
            let {error:{error:{message, type, code}}} = error;
            log.error('login', 'Can\'t login!')
            log.error('login', `${type}: ${message}(${code})`)
            return callback(error.error, undefined);
        }

    }
    if (options.appState) {
        options.appState.forEach(function (c) {
            var str = c.key + "=" + c.value + "; expires=" + c.expires + "; domain=" + c.domain + "; path=" + c.path + ";";
            jar.setCookie(str, "http://" + c.domain);

        })

    }
    log.info('login', 'Success Login');
    let api = new Object();
    log.info('login', 'Get fb_dtsg');
    try {
        var [fb_dtsg, uid] = await request({
            url: 'https://mbasic.facebook.com/profile',
            headers: getHeaders('https://mbasic.facebook.com/profile')
        }).then(function (body) {
            let $ = cheerio.load(body);
            return [$('input[name="fb_dtsg"]').val(), $('input[name="target"]').val()]
        })
    } catch (error) {
        log.error('login', 'Get fb_dtsg failed');
        return callback(error)
    }

    api.getAppstate = function () { return options.appState }    
    api.dtsg = fb_dtsg;
    api.uid = uid;
    log.info('login', 'Get access token');
    api.accessToken = options.access_token || await getToken(api.appState);
    log.info('login', 'Get infomation bot');
    api.info = await getInfo(api.accessToken);

    require('./src/index')(api, jar)
    callback(undefined, api)

}
