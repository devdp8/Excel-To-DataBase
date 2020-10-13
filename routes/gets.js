const express = require("express");
const router = express.Router();
const pino  = require("pino")();
const path = require("path");

var options = {
    root: path.join('/home/dev/Development/Algo8/ExcelDataToDB/htmlTemplates/')
};

router.get('/', (req, res) => {
    pino.info('User Reached At Main Page');
    pino.info('Index Page Displayed');
    res.sendFile('index.html',options);
});

module.exports = router;