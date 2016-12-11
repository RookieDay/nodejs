'use strict';

function responseJson(res) {
    return function(jsonObj) {
        let jsonStr = JSON.stringify(jsonObj);
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        })
        res.end(data);
    }
}

module.exports = responseJson;