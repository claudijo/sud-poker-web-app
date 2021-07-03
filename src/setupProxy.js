// As described here http://saule1508.github.io/create-react-app-proxy-websocket/
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:4000' }));
    app.use(proxy('/ws', { target: 'ws://localhost:4000', ws: true }));
};