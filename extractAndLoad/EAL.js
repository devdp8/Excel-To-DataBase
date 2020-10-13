const pino = require("pino")();
const SQL = require("../DBScripts/mysql");
const csvtojson = require("csvtojson");
const readXlsxFile = require('read-excel-file/node');
const { text } = require("express");
const getTime = require('dateformat');

async function tocsv(fileName) {
    pino.info("I am in CSV");
    csvtojson().fromFile(fileName).then(source => {

        for (var i = 0; i < source.length; i++) {
            var id = source[i]["workerId"],
                name = source[i]["workerName"],
                start = source[i]["shiftStart"],
                end = source[i]["shiftEnd"]
            QUERY = `INSERT INTO data VALUES(${id},'${name}','${start}','${end}');`
            SQL(QUERY);
        }
        console.log(
            "All items stored into database successfully");
    });
}

function toexcel(fileName) {
    pino.info("I am in XLSX");

    const schema = {
        'workerId': {
            prop: 'workerId',
            type: readXlsxFile.Integer
        },
        'workerName': {
            prop: 'workerName',
            type: String
        },
        'shiftStart': {
            prop: 'shiftStart',
            type: String
        },
        'shiftEnd': {
            prop: 'shiftEnd',
            type: String
        }
    }

    readXlsxFile(fileName, { schema }).then(({ rows, errors }) => {
        for (i = 0; i < rows.length; i++) {
            let shiftStart = rows[i]['shiftStart'];
            let shiftEnd = rows[i]['shiftEnd'];
            QUERY = `INSERT INTO data VALUES(${rows[i]['workerId']},'${rows[i]['workerName']}','${getTime(shiftStart, "isoTime", true)}','${getTime(shiftEnd,"isoTime", true)}');`
            console.log(QUERY);
            SQL(QUERY);
        }
    });
}

function dataRead(fileName) {
    if (fileName.endsWith('.csv')) {
        pino.info("/home/dev/Development/Algo8/ExcelDataToDB/uploads/" + fileName);
        tocsv("/home/dev/Development/Algo8/ExcelDataToDB/uploads/" + fileName);
    }
    if (fileName.endsWith('.xlsx')) {
        toexcel("/home/dev/Development/Algo8/ExcelDataToDB/uploads/" + fileName);
    }
}

module.exports = dataRead;