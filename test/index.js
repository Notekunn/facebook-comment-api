const login = require('../index')

login({ access_token: '' }, function (error, api) {
    if(error) return;
    api.listen(function (error, event) {
        if (error) return console.log(error)
        console.log(event)
    })
})