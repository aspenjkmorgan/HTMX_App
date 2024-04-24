const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const pug = require('pug');

exports.test = onRequest((request, response) => {
    let template = pug.compileFile('views/test.pug');
    let markup = template({
        name: request.query.name,
        major: request.query.major,
        quote: request.query.quote
    })
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end(markup)
});
