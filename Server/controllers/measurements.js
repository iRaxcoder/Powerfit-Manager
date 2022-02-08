const SUCCESS = 1;
const TIP = 0;
const ERROR = -1;
var data = {};
var query = "";
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

    app.post("/medidas/insert", (req, res) => {
        data = req.body.data;
        connection.beginTransaction(async (err) => {
            if (err) {
                throw err;
            }
            query = 'CALL sp_insert_medidas_datos' + getSpParamSize[data["sizeDatos"]];
            connection.query(query, Object.values(data["datos"]), (err, rows, fields) => {
                if (err) {
                    connection.rollback(() => {
                        res.send("No se ha podido realizar el registro de medidas.");
                        console.log(err);
                    });
                }
                query = 'CALL sp_insert_medidas_circunferencia' + getSpParamSize[data["sizeCircun"]];
                connection.query(query, Object.values(data["circunferencia"]), (err, rows, fields) => {
                    if (err) {
                        connection.rollback(() => {
                            res.send("No se ha podido realizar el registro de medidas");
                            console.log(err);
                        })
                    }

                    connection.query('CALL sp_insert_medidas_cliente' + getSpParamSize["1"], data["header"], (err, rows, fields) => {
                        if (err) {
                            connection.rollback(() => {
                                res.send("No se ha podido realizar el registro de medidas");
                                console.log(err);
                            })
                        }
                        connection.commit((err) => {
                            if (!err) {
                                if (rows[0][0].msg === SUCCESS) {
                                    res.send("Agregado con éxito");
                                } else if (rows[0][0].msg === ERROR) {
                                    res.send("Ha ocurrido un error al agregar");
                                }
                            } else {
                                connection.rollback(() => {
                                    res.send("No se ha podido realizar el registro de medidas");
                                    console.log(err);
                                })
                            }
                        })

                    })

                })

            })

        })
    })
    app.post("/medidas/info", (req, res) => {
        data = req.body.data;
        connection.query('CALL sp_select_medida_cliente_completo' + getSpParamSize["1"], data["find"], (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    })

    app.put("/medidas/put", (req, res) => {
        data = req.body.data;
        connection.beginTransaction(async (err) => {
            if (err) {
                throw err;
            }
            query = 'CALL sp_update_medidas_datos' + getSpParamSize[data["sizeDatos"]];
            connection.query(query, Object.values(data["datos"]), (err, rows, fields) => {
                if (err) {
                    connection.rollback(() => {
                        res.send("No se ha podido realizar el registro de medidas");
                        console.log(err);
                    })
                }
                query = 'CALL sp_update_medidas_circunferencia' + getSpParamSize[data["sizeCircun"]];
                connection.query(query, Object.values(data["circunferencia"]), (err, rows, fields) => {
                    if (err) {
                        connection.rollback(() => {
                            res.send("No se ha podido realizar el registro de medidas");
                            console.log(err);
                        })
                    }
                    connection.commit((err) => {
                        if (!err) {
                            res.send("Modificado con éxito.");
                        } else {
                            connection.rollback(() => {
                                res.send("No se ha podido realizar el registro de medidas");
                                console.log(err);
                            })
                        }
                    })
                })
            })
        })
    })

    app.put("/medidas/delete", (req, res) => {
        data = req.body.data;
        query = 'CALL sp_delete_medidas'+ getSpParamSize[data["size"]];
        connection.query(query, Object.values(data["object"]), (err, rows, fields) => {
            if (!err) {
                if (rows[0][0].msg === SUCCESS) {
                    res.send("Eliminado con éxito");
                } else if (rows[0][0].msg === ERROR) {
                    res.send("Ha ocurrido un error al eliminar");
                }
            }
            else {
                console.log("error de bd:" + err);
            }
        })
    })
}