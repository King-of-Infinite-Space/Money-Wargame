const colyseus = require('colyseus');
const http = require('http');

const express = require('express');
const app = express();
const port = process.env.PORT || 3553;

const server = http.createServer(app);
const gameServer = new colyseus.Server({server: server});
const gameRoom = require('./rooms.js');
const path = require('path')
const favicon = require('serve-favicon');

gameServer.register('gameRoom', gameRoom);
server.listen(port);

app.use('/lib/', express.static(path.join(__dirname, 'lib')));
app.use('/', express.static(__dirname));
app.use(favicon(path.join(__dirname, 'favicon.png')));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
});
console.log(`Listening on ws://localhost:${ port }`);
