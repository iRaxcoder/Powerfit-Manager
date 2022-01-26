const {
    response
} = require("express");

const SUCCESS = 1;
const TIP = 0;
const ERROR = -1;
var data = {};
var query = "";
var saleId = 0;

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
        connection.beginTransaction(async (err) => {
            if (err) {
                throw err;
            }
            query = 'CALL sp_insert_venta' + getSpParamSize["2"];
            connection.query(query, Object.values(data["orderHeader"]), (err, rows, fields) => {
                if (!err) {
                    saleId = id = rows[0][0].ID_VENTA;
                } else {
                    connection.rollback(() => {
                        res.send("No se ha podido realizar la venta.");
                        console.log(err);
                    });
                }
                query = 'INSERT INTO tb_venta_producto (id_venta,id_producto,cantidad,subtotal) VALUES ?';
                var orderedProductList = data["orderProducts"];
                var orderBody = [orderedProductList.length];
                for (var i = 0; i < orderedProductList.length; i++) {
                    orderBody[i] = [saleId, orderedProductList[i].ID_PRODUCTO, orderedProductList[i].ordered, orderedProductList[i].subtotal];
                }
                connection.query(query, [orderBody], (err, rows, fields) => {
                    if (err) {
                        connection.rollback(() => {
                            res.send("No se ha podido realizar la venta.");
                            console.log(err);
                        })
                    }
                    connection.commit((err) => {
                        if (!err) {
                            res.send("Venta registrada con éxito.");
                        } else {
                            connection.rollback(() => {
                                res.send("No se ha podido realizar la venta.");
                                console.log(err);
                            })
                        }
                    })
                });
            });
        })
    })
}