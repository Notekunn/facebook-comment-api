# Unofficial Facebook Comment API
<a href="https://www.npmjs.com/package/facebook-comment-api"><img alt="npm version" src="https://img.shields.io/npm/v/facebook-comment-api.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/facebook-comment-api"><img src="https://img.shields.io/npm/dm/facebook-comment-api.svg?style=flat-square" alt="npm downloads"></a>
The simple library to reply comment real-time

## Install
If you just want to use facebook-comment-api, you should use this command:
```bash
npm install facebook-comment-api
```
It will download facebook-comment-api from NPM repositories

or
```bash
npm install Notekunn/facebook-comment-api
```

## Example Usage
```javascript
const login = require("facebook-comment-api");


login({ access_token: "EAA" }, (err, api) => {
    if (err) return console.error(err);

    api.listen((err, event) => {

        api.sendComment({ body: event.body }, event.idReplyTo)
        
    });
});
```
------------------------------------------------
# Documentation
* [`login`](#login)
* [`api.addFriend`](#api.addFriend)
* [`api.getInfo`](#api.getInfo)
* [`api.getInfoComment`](#api.getInfoComment)
* [`api.listen`](#api.listen)
* [`api.query`](#api.query)
* [`api.sendComment`](#api.sendComment)

------------------------------------------------
<a name="login"></a>

### ***login(credentials[, options], callback)*** 
This function is returned by `require(...)` and is the main entry point to the API.

It allows the user to log into facebook given the right credentials.

If it succeeds, `callback` will be called with a `null` object (for potential errors) and with an object containing all the available functions.

If it fails, `callback` will be called with an error object.

__Arguments__
* `credentials`: An object containing the field `access_token` used to login, __*or*__ an object containing the field `appState`.
* `options`: An object representing options to use when logging in.
* `callback(err, api)`: A callback called when login is done (successful or not). `err` is an object containing a field `error`.

-------------------------------------------------
<a name="api.addFriend"></a>

### ***api.addFriends(userID[, callback])*** 
It send a friend request to a user

__Arguments__
* `userID`: userID 
* `callback(error, data)`: A callback when add friends done

-------------------------------------------------
<a name="api.getInfo"></a>

### ***api.getInfo(userID, callback)***
It get all info of and user

__Arguments__
* `userID`: userID 
* `callback(error, data)`: A callback when add getinfo done

-------------------------------------------------
<a name="api.getInfoComment"></a>

### ***api.getInfoComment(commentID, callback)*** 

__Arguments__
* `commentID`: commentID 
* `callback(error, data)`: A callback when add getinfo done

-------------------------------------------------
<a name="api.listen"></a>

### ***api.listen(callback)*** 

It will call the `callback` every have new notification

__Arguments__
* `callback(error, data)`: callback

-------------------------------------------------
<a name="api.query"></a>

### ***api.query(options[, callback])*** 

-------------------------------------------------
<a name="api.sendComment"></a>

### ***api.sendComment(options, target, callback)*** 

-------------------------------------------------
