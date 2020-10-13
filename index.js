const express = require("express");
require('dotenv').config();
const pino = require("pino")();
const app = express();
const server = require("http").createServer(app);
const getsRoute = require('./routes/gets');
const postsRoute = require('./routes/posts');
const upload = require("express-fileupload");

app.use(upload());

app.use('/get',getsRoute);
app.use('/post',postsRoute);

server.listen(3000, host = '0.0.0.0', () => {
    pino.info('Server Running');
});

