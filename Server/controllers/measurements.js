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

module.exports.set = function(app,connection){

    app.post("/module/insert", (req, res) => {
        data = req.body.data;
        query = 'CALL sp_insert_medidas_datos' + data["header"] + getSpParamSize[data["size"]];
        connection.query(query, Object.values(data["cliente"]), (err, rows, fields) => {
            if (!err) {
                if (rows[0][0].msg === SUCCESS) {
                    res.send("Agregado con éxito");
                } else if (rows[0][0].msg === ERROR) {
                    res.send("Ha ocurrido un error al agregar");
                }
            }
            else {
                console.log(err);
            }

            query = 'CALL sp_insert_medidas_circunferencia' + data["header"] + getSpParamSize[data["size"]];
            connection.query(query, Object.values(data["datos"]), (err, rows, fields) => {
                if (!err) {
                    if (rows[0][0].msg === SUCCESS) {
                        res.send("Agregado con éxito");
                    } else if (rows[0][0].msg === ERROR) {
                        res.send("Ha ocurrido un error al agregar");
                    }
                }
                else {
                    console.log(err);
                }
    
                
            }) 

            query = 'CALL sp_insert_medidas_cliente' + data["header"] + getSpParamSize[data["size"]];
            connection.query(query, Object.values(data["circunferencia"]), (err, rows, fields) => {
                if (!err) {
                    if (rows[0][0].msg === SUCCESS) {
                        res.send("Agregado con éxito");
                    } else if (rows[0][0].msg === ERROR) {
                        res.send("Ha ocurrido un error al agregar");
                    }
                }
                else {
                    console.log(err);
                }
    
                
            })
        })
        
    })
   
}