const express = require("express");
const dataRead = require("../extractAndLoad/EAL");
const router = express.Router();
const pino = require("pino")();
const dataReadCSV = require("../extractAndLoad/EAL");

router.post('/file', (req, res) => {
    pino.info(req);
    if(req.files){
        let file = req.files.myFile;
        let fileName = file.name;
        file.mv('/home/dev/Development/Algo8/ExcelDataToDB/uploads/'+fileName, function(err) {
            if(err){
                pino.error(err);
            }
            else{
                dataReadCSV(fileName);
                pino.info("File Uploaded");
                res.send("File uploaded");
            }
        });
    }
});

module.exports = router;