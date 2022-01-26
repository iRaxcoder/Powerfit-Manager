const SUCCESS = 1;
const TIP = 0;
const ERROR = -1;
var data = {};
var query = "";
var saleId="";

const getSpParamSize = {
    1: '(?)',
    2: '(?,?)',
    3: '(?,?,?)',
    4: '(?,?,?,?)',
    5: '(?,?,?,?,?)',
    6: '(?,?,?,?,?,?)',
    7: '(?,?,?,?,?,?,?)',
    8: '(?,?,?,?,?,?,?,?)',
    9: '(?,?,?,?,?,?,?,?,?)',
    10: '(?,?,?,?,?,?,?,?,?,?)',
    11: '(?,?,?,?,?,?,?,?,?,?,?)',
}

module.exports.set = function (app, connection) {
    app.post("/sales/insert", (req, res) => {
        data = req.body.data;
        console.log(data);
        // query = 'CALL sp_insert_' + data["header"] + getSpParamSize["2"];
        // connection.query(query, Object.values(data["object"]), (err, rows, fields) => {
        //     if (!err) {
        //         saleId=rows[0][0];
        //     }
        //     else {
        //         console.log(err);
        //     }
        // })
    })
}