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
    app.post(process.env.BASE_URL+"/sales/insert", (req, res) => {
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
    app.post(process.env.BASE_URL+"/sales/get-sale-info", (req, res) => {
        data = req.body.data;
        connection.query('CALL sp_select_venta_info' +getSpParamSize["1"], data["find"], (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    });

    app.post(process.env.BASE_URL+'/sales/get-stats', (req, res) =>{
        var data=req.body.data;
        var salesStats={};
        connection.query('CALL sp_select_search_estadisticas_ventas' +getSpParamSize["1"], data["year"], (err, rows, fields) => {
            if (!err) {
               salesStats.highlights=rows;
               connection.query('CALL sp_select_search_estads_productos' +getSpParamSize["1"], data["year"], (err, rows, fields) => {
                   if(!err){
                    salesStats.productStats=rows;
                    connection.query('CALL sp_select_search_ventas_mes' +getSpParamSize["1"], data["year"], (err, rows, fields) => {
                        if(!err){
                            salesStats.monthStats=rows;
                            connection.query('CALL sp_select_search_top_clientes' +getSpParamSize["1"], data["year"], (err, rows, fields) => {
                                if(!err){
                                    salesStats.topClients=rows;
                                    res.send(salesStats);
                                }else{
                                    console.log(err);
                                }
                            });
                        }else{
                            console.log(err);
                        }
                    });
                   }else{
                       console.log(err);
                   }
               })
            }
            else {
                console.log(err);
            }
        })
    });
}