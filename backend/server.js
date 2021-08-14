const colyseus = require('colyseus');
const http = require('http');

const express = require('express');
const app = express();
const port = process.env.PORT || 3553;

const server = http.createServer(app);
const gameServer = new colyseus.Server({server: server});
const gameRoom = require('./rooms.js');
const path = require('path')

gameServer.register('gameRoom', gameRoom);
server.listen(port);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../frontend')});
});
console.log(`Listening on ws://localhost:${ port }`);