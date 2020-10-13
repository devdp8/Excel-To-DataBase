const mysql = require("mysql");
const pinomysql = require("pino")();
require('dotenv').config();
const pino = require("pino")();

const mysqlLCon = mysql.createConnection({
    user: process.env.mysqlUser,
    password: process.env.mysqlPass,
    host: process.env.mysqlHost,
    database: process.env.mysqlDB
});

mysqlLCon.connect(function (err) {
    if (err) {
        pinomysql.error('Not Connected To MySQL '+ err);
    }
    else {
        pinomysql.info("Connected To MySQL Local");
    }
});

const Query = (query) => {
    return new Promise((res, rej) => {
        mysqlLCon.query(query, function (err, result, fields) {
            if (err) {
                pino.info('Error Occurs While Fetching Query');
                rej(err);
            }
            else {
                pino.info('Fetched Query Successfully');
                res(result);
            }
        });
    });
}

async function sendData(query) {
    pino.info('Query Request From posts File '+query);
    try {
        res = await Query(query);
        pino.info(res)
    } catch (error) {
        pino.info('Error Occurs In SendData Method');
        pino.info(error);
    }
}

module.exports = sendData;